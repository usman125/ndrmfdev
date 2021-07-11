import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Subscription } from "rxjs";
import { AccreditationCommentsMatrixStore } from '../../stores/accreditation-comments-matrix/accreditation-comments-matrix-store';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ConfirmModelService } from '../../services/confirm-model.service';
import { SubProjectDocSectionsStore } from '../../stores/sub-proj-doc-sections/sub-proj-doc-sections-store';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-sub-project-document-comments-matrix',
  templateUrl: './sub-project-document-comments-matrix.component.html',
  styleUrls: ['./sub-project-document-comments-matrix.component.css'],
  providers: [ConfirmModelService]
})
export class SubProjectDocumentCommentsMatrixComponent implements OnInit, OnDestroy {

  Subscription: Subscription = new Subscription();
  allComments: any = [];
  selectedRequestId: any = null;
  selectedRequest: any = null;
  allSections: any = [];

  @Output() exit: EventEmitter<any> = new EventEmitter();


  constructor(
    private _accreditationCommentsMatrixStore: AccreditationCommentsMatrixStore,
    private _activatedRoute: ActivatedRoute,
    private _confirmModelService: ConfirmModelService,
    private _location: Location,
    private _subProjectDocSectionsStore: SubProjectDocSectionsStore,
    private _projectService: ProjectService,
  ) { }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe(params => {
      this.selectedRequestId = params.get("requestId");
      // console.log("SELECTED PROJECT ID IS:--", this.selectedProjectId);
      this.getRequestComments();
    });

    this.Subscription.add(
      this._accreditationCommentsMatrixStore.state$.subscribe(data => {
        this.allComments = data.comments;
        console.log("COMMENTS MATRIX FROM STORE IN COMPOENNT:--", this.allComments);
      })
    );

    this.Subscription.add(
      this._subProjectDocSectionsStore.state$.subscribe(data => {
        this.allSections = data.request.sections;
        console.log("COMMENTS MATRIX FROM STORE IN COMPOENNT:--", this.allSections);
      })
    );
  }

  getRequestComments() {

  }

  fipIntimation() {
    let proposalSections = [];
    let options = {
      title: 'Fip Intimation to update sections',
      message: 'Please select section for FIP to update',
      cancelText: 'CANCEL',
      confirmText: 'YES',
      confirm: false,
      add: false,
      proposal_sections: this.allSections,
      proposal_initmation: true,
      comments: null,
    };
    // for (let i = 0; i < this.allComments.length; i++) {
    //   // console.log("SINGLE NETRY:--", this.allComments[i]);
    //   if (this.allComments[i].sectionsWithIds !== null) {
    //     for (let j = 0; j < this.allComments[i].sectionsWithIds.length; j++) {
    //       proposalSections.push(this.allComments[i].sectionsWithIds[j]);
    //     }
    //   }
    // }
    this._confirmModelService.open(options);
    this._confirmModelService.confirmed().subscribe(confirmed => {
      if (confirmed) {
        let sectionIds = [];
        confirmed.sections.forEach(c => {
          sectionIds.push(c.id);
        });
        let object = {
          sectionIds: sectionIds,
          comments: confirmed.comments,
        }
        console.log("CONFIRMED DATA IS:---", sectionIds, confirmed, object);
        this._projectService.reassignSubProjectDocToFIP(this.selectedRequestId, object).subscribe(
          (result: any) => {
            console.log("RESULT AFTER RE-ASSIGN:--", result);
          },
          (error: any) => {
            console.log("RESULT AFTER RE-ASSIGN:--", error);
          }
        );
      }
    });
    //   },
    //   error => {
    //     console.log("RESULT ALL PROCESS META:---", error);
    //   }
    // );

  }

  goBack() {
    this.exit.emit({ 'exit': true })
    // this._location.back();
  }

  ngOnDestroy() {
    this.Subscription.unsubscribe();
  }

}
