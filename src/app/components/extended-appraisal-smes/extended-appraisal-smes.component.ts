import { Component, OnInit, OnDestroy } from '@angular/core';
// import { ExtendedAppraisalSmesStore } from "../../stores/extended-appraisal-smes/extended-appraisal-smes-store";
// import { ExtendedAppraisalFormsStore } from "../../stores/extended-appraisal-forms/extended-appraisal-forms-store";
import { Subscription } from "rxjs";
import { AccreditationCommentsMatrixStore } from 'src/app/stores/accreditation-comments-matrix/accreditation-comments-matrix-store';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ProjectService } from 'src/app/services/project.service';
import { ConfirmModelService } from 'src/app/services/confirm-model.service';

@Component({
  selector: 'app-extended-appraisal-smes',
  templateUrl: './extended-appraisal-smes.component.html',
  styleUrls: ['./extended-appraisal-smes.component.css'],
  providers: [ConfirmModelService]
})
export class ExtendedAppraisalSmesComponent implements OnInit, OnDestroy {

  Subscription: Subscription = new Subscription();
  allComments: any = [];
  selectedProjectId: any = null;
  selectedProject: any = null;

  constructor(
    // private _extendedAppraisalSmesStore: ExtendedAppraisalSmesStore,
    // private _extendedAppraisalFormsStore: ExtendedAppraisalFormsStore,
    private _accreditationCommentsMatrixStore: AccreditationCommentsMatrixStore,
    private _activatedRoute: ActivatedRoute,
    private _projectService: ProjectService,
    private _confirmModelService: ConfirmModelService,
    private _location: Location,
  ) { }

  ngOnInit(): void {

    this._activatedRoute.paramMap.subscribe(params => {
      this.selectedProjectId = params.get("projectId");
      console.log("SELECTED PROJECT ID IS:--", this.selectedProjectId);
      this.getProjectComments();
    });

    this.Subscription.add(
      this._accreditationCommentsMatrixStore.state$.subscribe(data => {
        this.allComments = data.comments;
        console.log("COMMENTS MATRIX FROM STORE IN COMPOENNT:--", this.allComments);
      })
    );
  }

  getProjectComments() {
    this._projectService.getSingleProject(this.selectedProjectId).subscribe(
      (result: any) => {
        this.selectedProject = result;
        // this.selectedProject.id = this.selectedProjectId;
        result.id = this.selectedProjectId;
        console.log("PROJECT DETAILS FROM DATABASE:--", result);
        this._accreditationCommentsMatrixStore.addCommentsArray(result.commentsMatrix);
      },
      error => {
        console.log("ERROR DETAILS FROM DATABASE:--", error);
      },
    );
  }

  fipIntimation() {
    let proposalSections = [];
    for (let i = 0; i < this.allComments.length; i++) {
      // console.log("SINGLE NETRY:--", this.allComments[i]);
      if (this.allComments[i].sectionsWithIds !== null) {
        for (let j = 0; j < this.allComments[i].sectionsWithIds.length; j++) {
          proposalSections.push(this.allComments[i].sectionsWithIds[j]);
        }
      }
    }
    // console.log("PROPOSAL SECTIONS FOR FIP:--", proposalSections);

    let options = {
      title: 'Fip Intimation to update sections',
      message: 'Please select section for FIP to update',
      cancelText: 'CANCEL',
      confirmText: 'YES',
      confirm: false,
      add: false,
      proposal_sections: proposalSections,
      proposal_initmation: true,
    };
    this._confirmModelService.open(options);
    this._confirmModelService.confirmed().subscribe(confirmed => {
      if (confirmed) {
        let sectionIds = [];
        confirmed.sections.forEach(c => {
          sectionIds.push(c.id);
        });
        console.log("CONFIRMED DATA IS:---", sectionIds, confirmed);
        let object = {
          sectionIds: sectionIds
        }
        this._projectService.reassignProposalToFIP(this.selectedProjectId, object).subscribe(
          (result: any) => {
            console.log("RESULT AFTER RE-ASSIGN:--", result);
          },
          (error: any) => {
            console.log("RESULT AFTER RE-ASSIGN:--", error);
          }
        );
      }
    });
  }

  goBack() {
    this._location.back();
  }

  ngOnDestroy() { }
}
