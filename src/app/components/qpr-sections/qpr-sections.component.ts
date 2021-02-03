import { Component, OnInit, Input } from '@angular/core';
import { QprSectionsStore } from 'src/app/stores/qpr-sections/qpr-sections-store';
import { Subscription } from 'rxjs';
import { QprStore } from 'src/app/stores/qpr/qpr-store';
import { QprService } from 'src/app/services/qpr.service';
import { ConfirmModelService } from 'src/app/services/confirm-model.service';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-qpr-sections',
  templateUrl: './qpr-sections.component.html',
  styleUrls: ['./qpr-sections.component.css'],
  providers: [ConfirmModelService]
})
export class QprSectionsComponent implements OnInit {

  loggedUser: any = null;
  Subscription: Subscription = new Subscription();
  qprSections: any = null;
  qprSectionStats: any = null;

  ndrmfDisbursment: any = null;
  ndrmfActual: any = null;
  fipContribution: any = null;
  fipActual: any = null;
  allLoading: boolean = false;
  singleLoading: boolean = false;

  // loggedUser: any = JSON.parse(localStorage.getItem('user'));

  @Input() ndrmfShare = 0;
  @Input() fipShare = 0;
  @Input() quarter: any = 0;
  @Input() qprId;

  comments: any = null;

  constructor(
    public _qprSectionsStore: QprSectionsStore,
    public _qprStore: QprStore,
    public _qprService: QprService,
    public _confirmModelService: ConfirmModelService,
  ) { }

  ngOnInit(): void {
    this.loggedUser = JSON.parse(localStorage.getItem('user'));
    this.Subscription.add(
      this._qprSectionsStore.state$.subscribe(data => {
        // this.qprSections = [];
        let pendingCount = 0;
        let completedCount = 0;
        this.qprSections = data.sections.map((c) => {
          if (c.reviewStatus === null || c.reviewStatus === 'Pending')
            pendingCount = pendingCount + 1;
          if (c.reviewStatus === 'Completed')
            completedCount = completedCount + 1;
          return {
            ...c,
            template: typeof (c.template) === 'string' ? JSON.parse(c.template) : c.template,
            data: (typeof (c.data) === 'string' && c.data !== null) ? JSON.parse(c.data) : c.data,
          }
        })
        this.qprSectionStats = {
          pendingCount,
          completedCount
        }
        console.log("QPR SECTIONS:---", this.qprSectionStats, this.qprSections, this.quarter, this.ndrmfShare, this.fipShare, this.qprId);
      })
    );
    this.Subscription.add(
      this._qprStore.state$.subscribe(data => {
        // this.qprSections = [];
        console.log("QPR SECTIONS STATS:---", data.stats);
        this.qprSectionStats = data.stats;
      })
    );
  }

  onSubmit($event, sectionId) {
    let body = {
      id: sectionId,
      data: JSON.stringify($event.data)
    }
    console.log("FORM SUBMIT DATA:---", $event, this.qprId, body);

    this._qprService.saveSection(
      this.qprId,
      body
    ).subscribe(
      (result: any) => {
        console.log("RESULT SUBMITTING SECTION:--", result);
        this._qprSectionsStore.submitSection(
          sectionId,
          $event.data
        );
      },
      error => {
        console.log("RESULT SUBMITTING SECTION:--", error);
      }
    );
  }

  assignTasks(id, type) {
    const options = {
      title: 'Please fill the information!',
      message: '',
      cancelText: 'CANCEL',
      confirmText: 'OK',
      add: false,
      confirm: true,
    };
    // this.apiLoading = false;
    if (type === 'all') {

      this._confirmModelService.open(options);
      // console.log("ASSIGN ALL TASKS:---", type);
      this._confirmModelService.confirmed().subscribe(
        result => {
          if (result) {
            // let body = {
            //   startDate: result.startDate,
            //   endDate: result.endDate,
            //   comments: result.comments,
            // }
            console.log("CONFIRMED DATA IS:---", result);
            for (let i = 0; i < this.qprSections.length; i++) {
              let key = this.qprSections[i];
              if (key.reviewStatus === 'Completed' || key.reviewStatus === null) {
                this.allLoading = true;
                this._qprService.addTaskForSection(key.id, result).subscribe(
                  (queryResult: any) => {
                    console.log("RESULT ADDING TASK:---", queryResult);
                    this._qprSectionsStore.assignTasksToSmes(key.id);
                    this.allLoading = false;
                  },
                  error => {
                    console.log("RESULT ADDING TASK:---", error);
                  }
                );
              }
            }
          }
        }
      )
    } else {
      // console.log("ASSIGN ALL TASKS:---", type);
      this._confirmModelService.open(options);
      this._confirmModelService.confirmed().subscribe(
        result => {
          if (result) {
            this.singleLoading = true;
            console.log("CONFIRMED DATA IS:---", result);
            this._qprService.addTaskForSection(id, result).subscribe(
              (queryResult: any) => {
                console.log("RESULT ADDING TASK:---", queryResult);
                this._qprSectionsStore.assignTasksToSmes(id);
                this.singleLoading = false;
              },
              error => {
                console.log("RESULT ADDING TASK:---", error);
              }
            );
          }
        }
      )
    }
  }

  addQprSectionReview(item) {
    this.allLoading = true;
    console.log("REVIEW TO ADD FOR SECTION:--", item);
    let body: any = null;
    if (item.review === null && (item.reviewStatus === null || item.reviewStatus === 'Pending'))
      body = { comments: this.comments };
    if (item.review !== null && (item.reviewStatus === 'Pending'))
      body = { comments: item.review.comments };
    this._qprService.addReview(item.id, body).subscribe(
      (result: any) => {
        console.log("API RESULT ADDING REVIEW:--", result);
        const options = {
          title: result.message,
          message: '',
          cancelText: 'CANCEL',
          confirmText: 'OK',
          add: true,
          confirm: false,
        };
        this._qprSectionsStore.submitSectionReview(item.id, body);
        this.allLoading = false;
        this._confirmModelService.open(options);
      }
    );
  }

}
