import { Component, OnInit, OnDestroy } from '@angular/core';
// import { ExtendedAppraisalSmesStore } from "../../stores/extended-appraisal-smes/extended-appraisal-smes-store";
// import { ExtendedAppraisalFormsStore } from "../../stores/extended-appraisal-forms/extended-appraisal-forms-store";
import { Subscription } from "rxjs";
import { AccreditationCommentsMatrixStore } from 'src/app/stores/accreditation-comments-matrix/accreditation-comments-matrix-store';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-extended-appraisal-smes',
  templateUrl: './extended-appraisal-smes.component.html',
  styleUrls: ['./extended-appraisal-smes.component.css']
})
export class ExtendedAppraisalSmesComponent implements OnInit, OnDestroy {

  Subscription: Subscription = new Subscription();
  allComments: any = [];
  selectedProjectId: any = null;

  constructor(
    // private _extendedAppraisalSmesStore: ExtendedAppraisalSmesStore,
    // private _extendedAppraisalFormsStore: ExtendedAppraisalFormsStore,
    private _accreditationCommentsMatrixStore: AccreditationCommentsMatrixStore,
    private _activatedRoute: ActivatedRoute,
    private _projectService: ProjectService,
    private _location: Location,
  ) { }

  ngOnInit(): void {

    this._activatedRoute.paramMap.subscribe(params => {
      this.selectedProjectId = params.get("projectId");
      this.getProjectComments();
    });

    this.Subscription.add(
      this._accreditationCommentsMatrixStore.state$.subscribe(data => {
        console.log("COMMENTS MATRIX FROM STORE IN COMPOENNT:--", data.comments);
        this.allComments = data.comments;
      })
    );
  }

  getProjectComments() {
    this._projectService.getSingleProject(this.selectedProjectId).subscribe(
      (result: any) => {
        // this.selectedProject = result;
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

  goBack(){
    this._location.back();
  }

  ngOnDestroy() { }
}
