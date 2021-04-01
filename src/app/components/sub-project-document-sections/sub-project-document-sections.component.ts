import { Component, OnInit, OnDestroy, Input, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { SubProjectDocSectionsStore } from 'src/app/stores/sub-proj-doc-sections/sub-proj-doc-sections-store';
import { ProjectService } from 'src/app/services/project.service';
import { ActivatedRoute } from '@angular/router';
import { ConfirmModelService } from 'src/app/services/confirm-model.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-sub-project-document-sections',
  templateUrl: './sub-project-document-sections.component.html',
  styleUrls: ['./sub-project-document-sections.component.css'],
  providers: [ConfirmModelService]
})
export class SubProjectDocumentSectionsComponent implements OnInit, OnDestroy {

  Subscription: Subscription = new Subscription();
  loggedUser: any = null;
  selectedRequestId: any = null;

  allSections: any = [];
  sectionComments: any = null;
  sectionStats: any = null;
  selectedSection: any = null;

  assignedSections: any = [];
  assignedReviewsSections: any = [];

  pendingReviewsSections: any = [];
  completedReviewsSections: any = [];

  unAssignedSections: any = [];

  dataSource: any = [];

  apiLoading: boolean = false;
  commentsFlag: boolean = false;
  @Input() viewType: any = null;

  filterType: any = null;



  constructor(
    private _subProjectDocSectionsStore: SubProjectDocSectionsStore,
    private _projectService: ProjectService,
    private _activatedRoute: ActivatedRoute,
    private _confirmModelService: ConfirmModelService,
    private _cdr: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.loggedUser = JSON.parse(localStorage.getItem('user'));
    this._activatedRoute.paramMap.subscribe(params => {
      this.selectedRequestId = params.get("requestId");
    });
    this.Subscription.add(
      this._subProjectDocSectionsStore.state$.subscribe(data => {
        this.apiLoading = false;
        this.allSections = [];
        this.assignedSections = [];
        this.unAssignedSections = [];
        this.assignedReviewsSections = [];
        this.pendingReviewsSections = [];
        this.completedReviewsSections = [];
        var pendingCount = 0;
        var reviewsCount = 0;
        this.allSections = data.sections.map((c) => {
          c.template = typeof (c.template) === 'string' ? JSON.parse(c.template) : c.template;
          c.data = typeof (c.data) === 'string' ? JSON.parse(c.data) : c.data;
          if (c.assigned) {
            this.assignedSections.push(c);
            if (c.reviewStatus === 'Pending') {
              this.assignedReviewsSections.push(c);
            }
          } else {
            this.unAssignedSections.push(c);
          }
          if (c.reviewStatus === 'Pending') {
            this.pendingReviewsSections.push(c);
            pendingCount = pendingCount + 1;
          }
          if (c.reviewStatus === null) {
            this.pendingReviewsSections.push(c);
          }
          if (c.reviewStatus === 'Review Completed') {
            this.completedReviewsSections.push(c);
            reviewsCount = reviewsCount + 1;
          }
          this.sectionStats = {
            pendingCount,
            reviewsCount
          }
          return {
            ...c,
          }
        });
        if (this.filterType === null) {
          this.dataSource = this.allSections;
        }
        if (this.filterType === 'pending') {
          this.dataSource = this.pendingReviewsSections;
        }
        if (this.filterType === 'completed') {
          this.dataSource = this.completedReviewsSections;
        }
        if (this.filterType === 'reset') {
          this.dataSource = this.allSections;
        }
        this.apiLoading = false;
        console.log("\nALL SECTIONS:--\n", this.allSections,
          '\nASSIGNED SECTIONS:--\n', this.assignedSections,
          '\nASSIGNED REVIEWS SECTIONS:--\n', this.assignedReviewsSections,
          '\nUN-ASSIGNED SECTIONS:--\n', this.unAssignedSections,
          '\nPENDING REVIEWS SECTIONS:--\n', this.pendingReviewsSections,
          '\nCOMPLETED REVIEWS SECTIONS:--\n', this.completedReviewsSections,
        );
      })
    );
  }

  addSectionReviews() {
    var object = {
      comments: JSON.stringify(this.sectionComments)
    }
    console.log("REVIEW TO ADD FOR SECTION:--", object, this.selectedSection);
    this._projectService.submitSubProjectDocReview(this.selectedSection, object).subscribe(
      result => {
        console.log("RESULT ADDING REVIEW:--", result);
        this._subProjectDocSectionsStore.changeSectionReviewStatus(this.selectedSection, 'Review Completed');
        this.sectionComments = null;
        this._cdr.detectChanges();
      },
      error => {
        console.log("RESULT ADDING REVIEW:--", error);
      }
    )
  }

  filterSections(filter) {
    this.filterType = filter;
    if (filter === 'pending') {
      this.dataSource = this.pendingReviewsSections;
    }
    if (filter === 'completed') {
      this.dataSource = this.completedReviewsSections;
    }
    if (filter === 'reset') {
      this.dataSource = this.allSections;
      this.filterType = null;
    }
  }


  onSubmit($event, section) {
    var object = {
      data: JSON.stringify($event.data),
      id: section.id
    }
    console.log(object, section, this.selectedRequestId);
    this._projectService.submitSubProjectDocSection(
      this.selectedRequestId,
      object
    ).subscribe(
      result => {
        console.log("RESULT ADDING SECTION DATA:--", result);
        this._subProjectDocSectionsStore.addSectionData(section, $event.data);
      },
      error => {
        console.log("RESULT ADDING SECTION DATA:--", error);
      }
    );
  }

  assignForReview(section) {
    const options = {
      title: 'Select Start Date & End Date for the task!',
      message: 'Click "OK" to Exit!',
      cancelText: 'CANCEL',
      confirmText: 'OK',
      add: false,
      confirm: true,
    };

    this._confirmModelService.open(options);

    this._confirmModelService.confirmed().subscribe(confirmed => {
      if (confirmed) {
        console.log("CONFIRMED FROM MARK GIA MODEL", confirmed, section);
        this._projectService.requestSubProjectDocReview(section.id).subscribe(
          (result: any) => {
            console.log("REUSLT REVIEW ADDED:--", result);
            const options = {
              title: result.message,
              message: 'OK to Exit!',
              cancelText: 'CANCEL',
              confirmText: 'OK',
              add: true,
              confirm: false,
            };
            this._subProjectDocSectionsStore.addSectionReview(section);
            this._confirmModelService.open(options);
          },
          (error: any) => {
            console.log("REUSLT REVIEW ADDED:--", error);
          },
        )
      }
    });
  }

  toggleComments() {
    this.commentsFlag = !this.commentsFlag;
  }

  ngOnDestroy() {
    this.Subscription.unsubscribe();
  }

}
