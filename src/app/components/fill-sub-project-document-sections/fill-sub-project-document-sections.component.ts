import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';
import { SubProjectDocSectionsStore } from 'src/app/stores/sub-proj-doc-sections/sub-proj-doc-sections-store';
// import { Subscription } from 'rxjs';

@Component({
  selector: 'app-fill-sub-project-document-sections',
  templateUrl: './fill-sub-project-document-sections.component.html',
  styleUrls: ['./fill-sub-project-document-sections.component.css']
})
export class FillSubProjectDocumentSectionsComponent implements OnInit {

  loggedUser: any = null;
  apiLoading: boolean = false;
  selectedRequestId: any = null;

  // Subscription: Subscription = new Subscription();

  @Output() viewType: any = 'fill';

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _projectService: ProjectService,
    private _subProjectDocSectionsStore: SubProjectDocSectionsStore,
  ) { }

  ngOnInit(): void {
    this.loggedUser = JSON.parse(localStorage.getItem('user'));
    this.apiLoading = true;
    this._activatedRoute.paramMap.subscribe(params => {
      this.selectedRequestId = params.get("requestId");
      this.getRequestDetails();
    });
  }

  getRequestDetails() {
    this._projectService.singleSubProjectDoc(this.selectedRequestId).subscribe(
      (result: any) => {
        console.log("REUSLT SINGLE DOC REQUEST:--", result);
        this._subProjectDocSectionsStore.addAllRequests(result.sections);
      },
      error => {
        console.log("REUSLT SINGLE DOC REQUEST:--", error);
      }
    )
  }

  ngOnDestroy() {
    this._subProjectDocSectionsStore.addAllRequests([]);
    // this.Subscription.unsubscribe();
  }

}
