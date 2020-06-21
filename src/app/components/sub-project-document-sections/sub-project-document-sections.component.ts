import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { SubProjectDocSectionsStore } from 'src/app/stores/sub-proj-doc-sections/sub-proj-doc-sections-store';
import { ProjectService } from 'src/app/services/project.service';
import { ActivatedRoute } from '@angular/router';
import { ConfirmModelService } from 'src/app/services/confirm-model.service';

@Component({
  selector: 'app-sub-project-document-sections',
  templateUrl: './sub-project-document-sections.component.html',
  styleUrls: ['./sub-project-document-sections.component.css'],
  providers: [ConfirmModelService]
})
export class SubProjectDocumentSectionsComponent implements OnInit, OnDestroy {

  Subscription: Subscription = new Subscription();
  allSections: any = [];
  assignedSections: any = [];
  unAssignedSections: any = [];

  selectedRequestId: any = null;
  sectionStats: any = null;

  @Input() viewType: any = null;

  constructor(
    private _subProjectDocSectionsStore: SubProjectDocSectionsStore,
    private _projectService: ProjectService,
    private _activatedRoute: ActivatedRoute,
    private _confirmModelService: ConfirmModelService,
  ) { }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe(params => {
      this.selectedRequestId = params.get("requestId");
    });
    this.Subscription.add(
      this._subProjectDocSectionsStore.state$.subscribe(data => {
        this.allSections = [];
        this.assignedSections = [];
        this.unAssignedSections = [];
        var pendingCount = 0;
        var reviewsCount = 0;
        this.allSections = data.sections.map((c) => {
          c.template = typeof (c.template) === 'string' ? JSON.parse(c.template) : c.template;
          c.data = typeof (c.data) === 'string' ? JSON.parse(c.data) : c.data;
          if (c.assigned) {
            this.assignedSections.push(c);
          } else {
            this.unAssignedSections.push(c);
          }
          if (c.reviewStatus === 'Review Pending') {
            pendingCount = pendingCount + 1;
          }
          if (c.reviewStatus === 'Review Completed') {
            reviewsCount = reviewsCount + 1;
          }
          this.sectionStats = {
            pendingCount,
            reviewsCount
          }
          return {
            ...c,
          }
        })
        console.log("DATA IN SECTIONS:--", this.allSections,
          '\n', this.assignedSections,
          '\n', this.unAssignedSections,
        );
      })
    );
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

  ngOnDestroy() {
    this.Subscription.unsubscribe();
  }

}
