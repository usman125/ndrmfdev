import { Component, OnInit, OnDestroy, Inject, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from "rxjs";
import { distinctUntilChanged } from "rxjs/operators";
import { AuthStore } from "../../stores/auth/auth-store";
import * as _ from 'lodash';
import FormioUtils from 'formiojs/utils';
import { SingleAccreditationRequestStore } from 'src/app/stores/single-accreditation-requests/single-accreditation-requests-store';
import { SectionSelectorStore } from "../../stores/section-selector/section-selector-store";
import { setValue } from "../../stores/fip-intimations/intimate-fip";
// import { MatPaginator } from '@angular/material/paginator';
// import { MatSort } from '@angular/material/sort';
// import { MatTableDataSource } from '@angular/material/table';
import { AccreditationRequestService } from "../../services/accreditation-request.service";
import { AccreditationReviewsService } from "../../services/accreditation-reviews.service";
import { ConfirmModelService } from "../../services/confirm-model.service";
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Location } from "@angular/common";
declare var $: any;

export interface DialogData {
  comments: string;
  startDate: string;
  endDate: string;
  minDate: string;
}

@Component({
  selector: 'app-accreditation-request',
  templateUrl: './accreditation-request.component.html',
  styleUrls: ['./accreditation-request.component.css'],
  providers: [ConfirmModelService]
})

export class AccreditationRequestComponent implements OnInit, OnDestroy, AfterViewInit {

  public allRequests: any = [];
  public Subscription: Subscription = new Subscription();

  // public displayedColumns = ['user', 'status', 'actions'];
  // public displayedColumns2 = ['section', 'startDate', 'endDate', 'expiry', 'status', 'comments', 'actions'];
  // public dataSource: any = [];
  // public dataSource2: any = [];

  public toggle: boolean = false;
  public form: any = null;
  public formSubmission: any = null;
  public currentUser: any = null;

  public formKeys: any = [];
  public formReviewObjects: any = [];

  rating: any = 0;

  tiles = [
    { text: 'One', cols: 3, rows: 1, color: 'lightblue' },
    { text: 'Two', cols: 1, rows: 2, color: 'lightgreen' },
    { text: 'Three', cols: 1, rows: 1, color: 'lightpink' },
    { text: 'Four', cols: 2, rows: 1, color: '#DDBDF1' },
  ];

  userRequests: any = [];
  userReviewRequests: any = [];
  allSurveys: any = [];
  allSmes: any = [];
  selectedRequest: any = null;
  selectedRequestId: any = null;
  selectedSectionId: any = null;
  selectedSectionData: any = null;

  totalFormScore: any = 0;
  totalPassScore: any = 0;

  max = 6;

  startDate: string;
  endDate: string;
  comments: string;

  selectedTask: any = null;
  checked: any = false;
  darkClass: any = 'unicorn-dark-theme';

  allRequestReviews: any = [];

  generalComments: any = null;

  commentsFlag: any = false;
  commentsData: any = [];

  currentReviewItem: any = null;

  reviewAdded: boolean = false;
  allTasksAssingedFlag: boolean = false;

  routeName: any = null;
  commentsForFip: any = null;

  allSectionSelections: any = [];

  generatePipe: any = [];
  userSystemStatus: any = null;
  userAllScore: any = null;
  userSectionScore: any = 0;

  addMobileClasses: boolean;
  apiLoading: boolean = false;
  submitLoading: boolean = false;
  allReviewsFlag: boolean = false;
  hideForms: boolean = false;
  commentsHistoryFlag: boolean = false;
  mitigationsFlag: boolean = false;
  viewReport: boolean = false;
  commentsHistory: any = [];
  reAssignedTasks: any = [];
  selectedHistoryItem: any = null;

  sectionStats: any = null;
  selectedSection: any = null;


  // @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ViewChild('sort') sort: MatSort;
  // @ViewChild('sort2') sort2: MatSort;


  constructor(
    // private _accreditationRequestStore: AccreditationRequestStore,
    private _singleAccreditationRequestStore: SingleAccreditationRequestStore,
    // private _accreditationReviewStore: AccreditationReviewStore,
    private _accreditationReviewsService: AccreditationReviewsService,
    private _sectionSelectorStore: SectionSelectorStore,
    // private _fipIntimationsStore: fipIntimationsStore,
    private _authStore: AuthStore,
    // private _smeStore: SmeStore,
    // private _surveysStore: SurveysStore,
    // private _surveysService: SurveysService,
    private _accreditationRequestService: AccreditationRequestService,
    // private _smeService: SmeService,
    public dialog: MatDialog,
    public _confirmModelService: ConfirmModelService,
    public _domSanitizer: DomSanitizer,
    public _activatedRoute: ActivatedRoute,
    public _location: Location,
  ) {


  }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('user'));
    setTimeout(() => {
      this._authStore.setRouteName('ACCREDITATION-REQUESTS');
    });
    this.Subscription.add(
      this._authStore.state$.subscribe(data => {
        this.submitLoading = data.auth.apiCall;
      })
    );
    this.Subscription.add(
      this._authStore.state$.pipe(distinctUntilChanged()).subscribe((data) => {
        // this.allSmes = data.smes;
        this.addMobileClasses = data.auth.applyMobileClasses;
      })
    );
    this._activatedRoute.paramMap.subscribe(params => {
      this.selectedRequestId = params.get("requestId");
      this.selectedSectionId = params.get("sectionId");
      // this.getRequest(this.selectedRequestId);
      if (this.currentUser.role !== 'sme') {
        this.getRequest(this.selectedRequestId);
      } else if (this.currentUser.role === 'sme') {
        this.getSmeRequest(this.selectedRequestId, this.selectedSectionId);
      }
    });
    this.Subscription.add(
      this._singleAccreditationRequestStore.state$.pipe(distinctUntilChanged()).subscribe((data) => {
        this.userReviewRequests = data.requests;
        // console.log("OVER ALL REQUEST IN SUBSCRIPTION:--", this.userReviewRequests);
        if (this.userReviewRequests) {
          this.checkScores(this.userReviewRequests);
          this.checkAllReviews(this.userReviewRequests);
          this.checkForAllTasks();
          this.checkForReAssign();
        }
      })
    );
    this.Subscription.add(
      this._sectionSelectorStore.state$.pipe(distinctUntilChanged()).subscribe((data) => {
        this.allSectionSelections = data.selections;
      })
    );

  }


  // adminDefaults() {
  //   this.apiLoading = true;
  //   this._accreditationRequestService.getQulificationRequests().subscribe(
  //     (result: any) => {
  //       this.apiLoading = false;
  //       console.log("RESULT AFETR GETTING ALL QUALIFICATION:--", result);
  //       this.dataSource2 = new MatTableDataSource(result);
  //       this.dataSource2.sortingDataAccessor = (item, property) => {
  //         if (property === 'user') {
  //           return item.initiatorFullName;
  //         } else {
  //           return item[property];
  //         }
  //       };
  //       this.dataSource2.sort = this.sort2;
  //     },
  //     error => {
  //       this.apiLoading = false;
  //       console.log("ERROR FROM GETTING ALL QUALIFICATIONS:---", error);
  //     }
  //   );
  // }

  // smeDefaults() {
  //   this.apiLoading = true;
  //   this._accreditationRequestService.getSmeTasks().subscribe(
  //     (result: any) => {
  //       console.log("RESULT SME TASKS:--", result);
  //       const array: any = result.qualification.map(c => {
  //         const date1: any = new Date();
  //         const date2: any = new Date(c.endDate);
  //         const diffTime = Math.abs(date2 - date1);
  //         const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  //         console.log(diffTime + " milliseconds");
  //         console.log(diffDays + " days");
  //         return {
  //           ...c,
  //           expiry: diffDays
  //         }
  //       });
  //       this.dataSource = new MatTableDataSource(array);
  //       this.dataSource.sortingDataAccessor = (item, property) => {
  //         if (property === 'section') {
  //           return item.sectionName;
  //         } else {
  //           return item[property];
  //         }
  //       };
  //       this.dataSource.sort = this.sort;
  //       this.apiLoading = false;
  //     },
  //     error => {
  //       this.apiLoading = false;
  //       console.log("ERROR SME TASKS:--", error);
  //     }
  //   );

  // }

  checkForAllTasks() {
    let array = this.userReviewRequests;
    for (let i = 0; i < array.length; i++) {
      if (array[i].reviewStatus === 'Pending') {
        this.allTasksAssingedFlag = true;
      } else {
        this.allTasksAssingedFlag = false;
        break;
      }
    }
  }

  checkForReAssign() {
    let array = this.userReviewRequests;
    this.reAssignedTasks = [];
    for (let i = 0; i < array.length; i++) {
      if (array[i].reassignmentStatus === 'Pending') {
        this.reAssignedTasks.push(array[i]);
      }
    }
  }

  openDialog(task): void {
    if (typeof (task) === 'object') {
      this.selectedTask = task;
    } else {
      this.selectedTask = null;
    }
    const dialogRef = this.dialog.open(AssignTask, {
      width: '320px',
      data: { startDate: this.startDate, endDate: this.endDate, comments: this.comments, minDate: new Date() }
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log("TASK ASSIGNMENT VALUES:---", result);
      if (result && this.selectedTask) {
        if (typeof (this.selectedTask) === 'object') {
          this.selectedTask.startDate = result.startDate;
          this.selectedTask.endDate = result.endDate;
          this.selectedTask.comments = result.comments;
          this.addSingleTaskReview(result.comments, result.endDate, result.startDate);
        }
      } else {
        if (result) {
          this.addAllTaskReview(result.comments, result.startDate, result.endDate);
        }
      }
    });
  }

  addSingleTaskReview(comments, endDate, startDate) {
    var object = {
      "comments": comments || null,
      "endDate": endDate,
      "startDate": startDate
    }
    // console.log("REQEST FOR SME:---", object, this.selectedTask);
    this._accreditationRequestService.assignTaskToSme(object, this.selectedTask.id).subscribe(
      result => {
        // console.log("RESULT AFTER UPDATING REQUEST:--", result);
        this._singleAccreditationRequestStore.setTaskReview(
          'Pending',
          this.selectedTask.id,
        );
        this.checkForAllTasks();
      },
      error => {
        console.log("ERROR AFTER UPDATING REQUEST:--", error);
      }
    );
  }

  addAllTaskReview(comments, startDate, endDate) {
    // console.log("ADD ALL TASK REVIEW CALLED:--", this.userReviewRequests);
    this.userReviewRequests.forEach(element => {
      if (element.reviewStatus === null || element.reviewStatus === 'Completed') {
        var object = {
          "comments": comments || null,
          "endDate": endDate,
          "startDate": startDate
        }
        // console.log("ITEMS TO ASSIGN TASK:---", element, object);
        this._accreditationRequestService.assignTaskToSme(object, element.id).subscribe(
          result => {
            // console.log("RESULT AFTER UPDATING REQUEST:--", result, element);
            this._singleAccreditationRequestStore.setTaskReview(
              'Pending',
              element.id,
            );
          },
          error => {
            console.log("ERROR AFTER UPDATING REQUEST:--", error);
          }
        );
      }
    });
    this.calcSectionStats(this.userReviewRequests);
    this.checkForAllTasks();
  }

  getRequest(requestId) {
    this.toggle = !this.toggle;
    this.generalComments = null;
    // this.selectedRequest = request;
    this.apiLoading = true;
    if (this.currentUser.role !== 'sme') {
      // this._accreditationRequestService.getSingleQualificationRequest(this.selectedRequest.id).subscribe(
      this._accreditationRequestService.getSingleQualificationRequest(requestId).subscribe(
        (result: any) => {
          // this.selectedRequest = result;
          this.selectedRequest = result.qualItem;
          this.selectedRequest.eligibility = result.eligItem[0];
          console.log("REQUEST TO CHECK:--", this.selectedRequest);
          let count = 0;
          // let passCount = 0;
          let tasksFlag = false;
          // this.reAssignedTasks = [];
          // this.userReviewRequests = result.sections.map((c) => {
          this.userReviewRequests = this.selectedRequest.sections.map((c) => {
            count = count + parseInt(c.totalScore);
            // passCount = passCount + parseInt(c.passingScore);
            // if (c.reassignmentStatus === 'Pending') {
            //   this.reAssignedTasks.push(c);
            // }
            return {
              ...c,
              template: JSON.parse(c.template),
              data: c.data === null ? c.data : JSON.parse(c.data),
              review: c.review ? {
                comments: c.review.comments,
                status: c.review.status,
                rating: c.review.rating,
                controlWiseComments: JSON.parse(c.review.controlWiseComments),
              } : {
                  comments: null,
                  status: null,
                  rating: null,
                  controlWiseComments: null,
                }
            }
          });
          console.log("SELECTED REQUEST FORMS:---", this.userReviewRequests, tasksFlag);
          this.totalFormScore = count;
          this._singleAccreditationRequestStore.addAllRequest(this.userReviewRequests);

          this.apiLoading = false;
          // this.totalPassScore = passCount;
        },
        error => {
          this.apiLoading = false;
          console.log("ERROR REQUEST FORMS:---", error);
        }
      );
    } else {
    }
  }

  getSmeRequest(id, sectionId) {
    this.selectedSection = sectionId;
    this.toggle = !this.toggle;
    this.apiLoading = true;

    this._accreditationRequestService.getSingleQualificationRequest(id).subscribe(
      (result: any) => {
        // this.selectedRequest = result;
        this.selectedRequest = result.qualItem;
        this.selectedRequest.eligibility = result.eligItem[0];
        console.log("RESULT QUALIFICATION SME:--", this.selectedRequest);
        let count = 0;
        let smeComponent: any = null;
        // this.userReviewRequests = result.sections.map((c) => {
        this.userReviewRequests = this.selectedRequest.sections.map((c) => {
          if (c.id === sectionId) {
            this.selectedSectionData = c;
          }
          if (c.assigned === true) {
            var contentElements = [];
            var formElements = [];
            this.formReviewObjects = [];
            var form = JSON.parse(c.template);
            this.formSubmission = JSON.parse(c.data);
            FormioUtils.eachComponent(form.components, (component) => {
              if (component.key != 'submit') {
                if (component.type != 'content') {
                  formElements.push(component);
                } else {
                  contentElements.push(component);
                }
              }
            });

            // console.log(formElements, contentElements);

            for (let i = 0; i < formElements.length; i++) {
              var jsonObject = {
                title: '',
                value: '',
                submitValue: '',
                key: '',
                rating: 0,
                status: 'un-satisfy',
                comments: '',
                type: '',
              }
              if (formElements[i].label === '&nbsp;') {
                var titleObject = _.find(contentElements, { 'key': formElements[i].key })
                if (titleObject) {
                  jsonObject.title = titleObject.html;
                  jsonObject.key = formElements[i].key;
                  jsonObject.type = formElements[i].type;
                  jsonObject.value = this.formSubmission ? this.formSubmission[formElements[i].key] : null;
                } else {
                  jsonObject.title = 'Question-' + i;
                  jsonObject.key = formElements[i].key;
                  jsonObject.type = formElements[i].type;
                  jsonObject.value = this.formSubmission ? this.formSubmission[formElements[i].key] : null;
                }
              } else {
                jsonObject.title = formElements[i].label;
                jsonObject.key = formElements[i].key;
                jsonObject.type = formElements[i].type;
                jsonObject.value = this.formSubmission ? this.formSubmission[formElements[i].key] : null;
              }
              if (jsonObject.type === 'file') {
                if (jsonObject.value && jsonObject.value.length) {
                  const blob = new Blob([jsonObject.value[0]['url']], { type: 'application/octet-stream' });
                  jsonObject['downloadLink'] = this._domSanitizer.bypassSecurityTrustResourceUrl(
                    window.URL.createObjectURL(blob)
                  );
                }
              }
              this.formReviewObjects.push(jsonObject);
            }
            // console.log("FORM REVIEW OBJECT:---", form, this.formSubmission, this.formReviewObjects, contentElements, formElements);
            if (c.review) {

              for (let i = 0; i < JSON.parse(c.review.controlWiseComments).length; i++) {
                // if (c.formReviewObjects) {
                for (let j = 0; j < this.formReviewObjects.length; j++) {
                  if (this.formReviewObjects[j].key === JSON.parse(c.review.controlWiseComments)[i].key) {
                    this.formReviewObjects[j].rating = JSON.parse(c.review.controlWiseComments)[i].rating;
                    this.formReviewObjects[j].status = JSON.parse(c.review.controlWiseComments)[i].status;
                    this.formReviewObjects[j].comments = JSON.parse(c.review.controlWiseComments)[i].comments;
                  }
                }
                // }
              }
              // console.log("JSON OBJECT TO PUSH:--", this.formReviewObjects);
              // this.generalComments = c.review.comments;
            }
          }
          count = count + parseInt(c.totalScore);
          // passCount = passCount + parseInt(c.passingScore);
          return {
            ...c,
            template: JSON.parse(c.template),
            data: c.data === null ? c.data : JSON.parse(c.data),
            review: c.review !== null ? {
              comments: c.review.comments,
              status: c.review.status,
              rating: c.review.rating,
              controlWiseComments: c.review.controlWiseComments !== null ? JSON.parse(c.review.controlWiseComments) : c.review.controlWiseComments,
            } : {
                comments: null,
                status: null,
                rating: null,
                controlWiseComments: null
              },
            formReviewObjects: this.formReviewObjects,
            comments: c.review ? c.review.comments : null,
            toggleForm: false,
          }
        })
        this.totalFormScore = count;
        // console.log("RESULT QUALIFICATION SME:--", this.userReviewRequests);
        this.apiLoading = false;
        this._singleAccreditationRequestStore.addAllRequest(this.userReviewRequests);
      },
      error => {
        this.apiLoading = false;
        console.log("ERROR QUALIFICATION SME:---", error);
      }
    );
  }

  completeTask() {
    console.log("REQUEST TO POST:--", this.selectedRequest);
  }

  addRequestReview(item) {
    this._authStore.setLoading();
    var rating = {
      0: 0,
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
    };
    for (let j = 0; j <= 6; j++) {
      var count = 0;
      for (let i = 0; i < item.formReviewObjects.length; i++) {
        if (item.formReviewObjects[i].rating === j) {
          count = count + 1;
        }
      }
      // console.log('COUNT FOR:--', j, count, '\n');
      rating[j] = count;
    }
    var count1 = 0;
    var count2 = 0;
    var requestStatus = null;
    Object.keys(rating).forEach((key) => {
      count1 = count1 + parseInt(key) * rating[key];
      count2 = count2 + rating[key];
    })
    if ((count1 / count2) >= 0.00 && (count1 / count2) <= 0.75) {
      requestStatus = "High Risk";
    } else if ((count1 / count2) > 0.75 && (count1 / count2) <= 2.00) {
      requestStatus = "Substantial Risk";
    } else if ((count1 / count2) > 2.00 && (count1 / count2) <= 2.25) {
      requestStatus = "Moderate Risk";
    } else {
      requestStatus = "Low Risk";
    }
    var apiValues = {
      "comments": item.review.comments,
      "controlWiseComments": JSON.stringify(item.formReviewObjects),
      "rating": (count1 / count2),
      "status": requestStatus
    }
    console.log(
      "REVIEW TO ADD FOR ITEM:--\n", item,
      "\nACTUAL REVIEW:--\n", item.formReviewObjects,
      "\nTOAL RATING :--\n", rating,
      "\nCOUNT 1 :--\n", count1,
      "\nCOUNT 2 :--\n", count2,
      "\nRATING RAW:--\n", count1 / count2,
      "\nRATING :--\n", Math.ceil(count1 / count2),
      "\nGENERAL COMMENTS :--\n", item.review.comments,
      "\nEQUEST STATUS :--\n", requestStatus,
      "\nAPI VALUES :--\n", apiValues,
    );
    this._accreditationReviewsService.addReview(item.id, apiValues).subscribe(
      result => {
        // console.log("RESULT FROM ADDING REVIEW:--", result);
        this._singleAccreditationRequestStore.addSectionReview(
          item.id,
          {
            "comments": item.review.comments,
            "controlWiseComments": item.formReviewObjects,
            "rating": (count1 / count2),
            "status": requestStatus
          }
        );
        this.reviewAdded = true;
        this._authStore.removeLoading();
      },
      error => {
        this._authStore.removeLoading();
        console.log("ERROR ADDING REVIEW:--", error);
      }
    );
  }

  checkAllReviews(item) {
    let count1 = 0;
    let count2 = 0;
    for (let i = 0; i < item.length; i++) {
      // console.log("REVIEWS:--", item[i].review);
      if (item[i].review.comment !== null && item[i].reviewStatus === "Completed") {
        count1 = count1 + 1;
      }
      if (item[i].review.comment !== null && item[i].reviewStatus === "Pending") {
        count2 = count2 + 1;
      }
      if (item[i].review.comment === null && (item[i].reviewStatus === null || item[i].reviewStatus === 'Pending')) {
        count2 = count2 + 1;
      }
      // console.log("CHECK ALL REVIEWS:--", count1, count2);
    }
    if (count1 === item.length) {
      this.allReviewsFlag = true;
    } else {
      this.allReviewsFlag = false;
    }
  }


  checkScores(item) {
    var rating = {
      0: 0,
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
    };
    for (let j = 0; j <= 6; j++) {
      var count = 0;
      for (let i = 0; i < item.length; i++) {
        if (item[i].review.rating !== null) {
          var number = ~~item[i].review.rating;
          var float = parseFloat((item[i].review.rating % 1).toFixed(3)) * (10);
          float = ~~float;
          console.log(
            "REVMIEW RATE:---\n", item[i].review.rating,
            "\nFLOAT DIGIT:---\n", parseFloat((item[i].review.rating % 1).toFixed(3)) * (10),
            "\nACTUAL DIGIT:---\n", number, typeof (number),
            "\nFLOAT DIGIT:---\n", float, typeof (float),
          );
          // if (float > 5) {

          //   if ((number + 1) === j) {
          //     count = count + 1;
          //   }
          // } else if (float >= 0 && (float < 5)) {
          if (number === j) {
            // count = count + 1;
            count = count + parseFloat(item[i].review.rating);
          }
          // }
        }
        rating[j] = count;
        // console.log("ITEM IN CHECK SCORE:--", item[i].review.rating)
        if (j === 0) {
          this.calcSectionStats(item);
        }
        // console.log('COUNT FOR:--', count, rating[j], { pendingCount, reviewsCount });
      }
      // this.sectionStats = { pendingCount, reviewsCount, unassignCount };
      if (j === 6) {
        this.rateApplication(rating);
      }
    }
  }

  calcSectionStats(item) {
    var pendingCount = 0;
    var reviewsCount = 0;
    var unassignCount = 0;
    var mySectionsCount = 0;
    for (let i = 0; i < item.length; i++) {
      if (item[i].reviewStatus === 'Pending') {
        pendingCount = pendingCount + 1;
      }
      if (item[i].review.rating !== null) {
        reviewsCount = reviewsCount + 1;
      }
      if ((item[i].review.rating === null && item[i].reviewStatus === null) ||
        (item[i].review.rating !== null && item[i].reviewStatus === null) ||
        (item[i].review.rating !== null && item[i].reviewStatus === 'Completed')
      ) {
        unassignCount = unassignCount + 1;
      }
      if (this.currentUser.role === 'sme') {
        if (item[i].assigned) {
          mySectionsCount = mySectionsCount + 1;
        }
      }
    }
    this.sectionStats = { pendingCount, reviewsCount, unassignCount, mySectionsCount };
  }

  rateApplication(rating) {

    var count1 = 0;
    var count2 = 0;
    this.userAllScore = 0;
    var requestStatus = null;
    Object.keys(rating).forEach((key) => {
      console.log("DATA TYPE OF INDEX:--", parseFloat(rating[key]));
      count1 = count1 + parseInt(key) * parseFloat(rating[key]);
      count2 = count2 + parseFloat(rating[key]);
    })

    if (((count1 / count2) / 2) >= 0 && ((count1 / count2) / 2) <= 0.75) {
      requestStatus = "High Risk";
      this.userSystemStatus = requestStatus;
      this.userAllScore = (count1 / count2);
    } else if (((count1 / count2) / 2) > 0.75 && ((count1 / count2) / 2) <= 2.00) {
      requestStatus = "Substantial Risk";
      this.userSystemStatus = requestStatus;
      this.userAllScore = (count1 / count2);
    } else if (((count1 / count2) / 2) > 2.00 && ((count1 / count2) / 2) <= 2.25) {
      requestStatus = "Moderate Risk";
      this.userSystemStatus = requestStatus;
      this.userAllScore = (count1 / count2);
    } else if (((count1 / count2) / 2) > 2.25 && ((count1 / count2) / 2) <= 3) {
      requestStatus = "Low Risk";
      this.userSystemStatus = requestStatus;
      this.userAllScore = (count1 / count2);
    }
    console.log(
      "ALL Request SCORES:--\n", rating,
      "SYSTEM STATUS:--\n", requestStatus,
      "USER SCORES:--\n", count1 / count2, this.userAllScore, count1, count2,

    );

  }

  setRequestStatus() {
    const options = {
      title: 'Set application status!',
      message: 'You can set one of the following status',
      cancelText: 'CANCEL',
      confirmText: 'OK',
      endDate: null,
      startDate: new Date(),
      add: false,
      confirm: false,
      setStatus: true,
      markUnEligibleReason: '',
    };

    this._confirmModelService.open(options);

    this._confirmModelService.confirmed().subscribe(confirmed => {
      if (confirmed) {
        this.selectedRequest.comment = confirmed.comments;
        this.selectedRequest.expiryDate = confirmed.endDate;
        this.selectedRequest.status = confirmed.status;
        console.log("CONFIRMED FROM MODEL", confirmed, this.selectedRequest);
        this.apiLoading = true;
        this._accreditationRequestService.updateAccreditationRequest(this.selectedRequestId, this.selectedRequest).subscribe(
          result => {
            this.apiLoading = false;
            // console.log("RESULT AFTER UPDATING STATUS:---", result);
          },
          error => {
            this.apiLoading = false;
            console.log("ERROR AFTER UPDATING STATUS:---", error);
          }
        );
      }
    });
  }

  showCommentsHistoty(item) {
    // console.log('ALL SECTIONS IN HISTORY:--', this.userReviewRequests, item);
    this.selectedHistoryItem = item;
    this.commentsHistory = item.reviewHistory.map(c => {
      return {
        ...c,
        controlWiseComments: JSON.parse(c.controlWiseComments)
      }
    });
    this.commentsHistoryFlag = true;
  }

  viewCommentsMatrix(userReviewRequests) {
    // console.log("REQUEST TO VIEW COMMENTS:--", userReviewRequests);
    this.commentsData = userReviewRequests;
    this.commentsFlag = true;
  }

  intimateFip(): void {
    const dialogRef = this.dialog.open(IntimateFip, {
      width: '320px',
      data: { comments: this.commentsForFip, minDate: new Date() }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let sectionIds = [];
        for (let i = 0; i < this.allSectionSelections.length; i++) {
          if (this.allSectionSelections[i].reassignmentStatus === null || this.allSectionSelections[i].reassignmentStatus === 'Completed') {
            sectionIds.push(this.allSectionSelections[i].id);
          }
        }

        let values = {
          sectionIds,
          comments: this.commentsForFip,
          startDate: result.startDate,
          endDate: result.endDate,
        }
        console.log("RESULT:--", result, this.allSectionSelections, this.selectedRequest, values);
        this._accreditationRequestService.reassignFipSection(this.selectedRequestId, values).subscribe(
          result => {
            // console.log("RESULT FROM REASSIGN:--", result);
            this._singleAccreditationRequestStore.updateReassignFipSection(sectionIds);
            // if (c.reassignmentStatus === 'Pending') {
            //   this.reAssignedTasks = sectionIds.length;
            // }
            const options = {
              title: 'Success!',
              message: 'Intimation has been send.',
              cancelText: 'CANCEL',
              confirmText: 'OK',
              add: true,
              confirm: false,
            };

            this._confirmModelService.open(options);
            this.commentsForFip = null;
          },
          error => {
            console.log("RESULT FROM REASSIGN:--", error);
          }
        );
      }
    });
  }

  hideComments() {
    this.commentsFlag = false;
    // this.generalComments = null;
  }

  // applyFilter(event: Event) {
  //   console.log("APPLY FIKTER:--", event);
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource2.filter = filterValue.trim().toLowerCase();

  //   if (this.dataSource2.paginator) {
  //     this.dataSource2.paginator.firstPage();
  //   }
  // }

  // applyFilter2(event: Event) {
  //   console.log("APPLY FIKTER:--", event);
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();

  //   if (this.dataSource.paginator) {
  //     this.dataSource.paginator.firstPage();
  //   }
  // }

  convertNumber(number) {
    return parseInt(number);
  }

  inputChanged($event) {
    console.log("SELECT BOX VALUE:--", $event);

  }

  onValChange($event) {
    console.log("ON STTATUS CHANGE:--", $event);
  }


  goBack() {
    this.toggle = !this.toggle;
    this.generalComments = null;
    this.selectedRequest = null;
    this.selectedRequestId = null;
    this.reviewAdded = false;
    this.hideForms = false;
    this._singleAccreditationRequestStore.resetData();
    // if (this.currentUser.role === 'sme') {
    //   this.smeDefaults();
    // }
    // if (this.currentUser.role === 'process owner') {
    //   this.adminDefaults();
    // }
    // this.cameFromComments = !this.cameFromComments;
    this._location.back();
  }

  ngOnDestroy() {
    // console.log("NG ON DESTORY CALLED:--");
    this._singleAccreditationRequestStore.resetData();
    this.Subscription.unsubscribe();
    this.generalComments = null;
  }

  ngAfterViewInit() {
    // this.dataSource.sort = this.sort;
  }

  submitReview() {
    console.log("REVIEW TO SUMBIT:--", this.formReviewObjects);
  }

  checkTypeString(value) {
    if (typeof (value) === 'string') {
      return true;
    } else {
      return false;
    }
  }
  checkTypeObject(value) {
    if (typeof (value) === 'object') {
      return true;
    } else {
      return false;
    }
  }

  toggleEntryForm(item) {
    // console.log("TOGGLE ENTRY FORM:---", item);
    item.toggleForm = !item.toggleForm;
  }

  goToReviews() {
    document.querySelector('#myTopElement2').scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  showMitigationPlan(userReviewRequests) {
    this.mitigationsFlag = true;
    for (let i = 0; i < userReviewRequests.length; i++) {
      let mitigationArray = [];
      for (let j = 0; j < userReviewRequests[i].review.controlWiseComments.length; j++) {
        if (userReviewRequests[i].review.controlWiseComments[j].status === "un-satisfy") {
          mitigationArray.push(userReviewRequests[i].review.controlWiseComments[j]);
        }
      }
      userReviewRequests[i].review.mitigationArray = mitigationArray;
    }
    console.log("REQUEST TO VIEW MITIGATION FACTOR:--", userReviewRequests);
  }

  hideMitigationsFlag() {
    this.mitigationsFlag = false;
  }

  markToGm() {
    console.log("MARK REQUEST TO GM:--", this.selectedRequest);
    // this.selectedRequest.status = 'Approved';
    // this.selectedRequest.subStatus = 'Pending';
    // this.selectedRequest.markedTo = 'MARKED_TO_GM';
    this._accreditationRequestService.markToGm(this.selectedRequest, this.selectedRequestId).subscribe(
      result => {
        console.log("RESULT DEOM QUERY:--", result);
        this.selectedRequest.subStatus = 'Pending';
        this.selectedRequest.markedTo = 'Marked To GM';
      },
      error => {
        console.log("RESULT FROM QUERY:--", error);
      }
    )
  }

  viewEligibility() {
    console.log("VIEW ELIGIBILITY");
  }

  exportReport() {
    console.log("EXPORT REPORT BUTTON CLICKED");
    this.viewReport = true;
  }

  hideExportReport() {
    console.log("EXPORT REPORT BUTTON CLICKED");
    this.viewReport = false;
  }

}


@Component({
  selector: 'assign-task',
  templateUrl: 'assign-task.html',
  styleUrls: ['./accreditation-request.component.css'],
})
export class AssignTask implements OnDestroy {

  Subscription: Subscription = new Subscription();
  checked: boolean = false;
  // minDate = new Date(2020, 5, 17);

  constructor(
    public dialogRef: MatDialogRef<AssignTask>,
    public _authStore: AuthStore,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.Subscription.add(
      this._authStore.state$.subscribe((data) => {
        // this.checked = data.auth.checked;
      })
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnDestroy() {
    this.Subscription.unsubscribe();
  }


}

@Component({
  selector: 'intimate-fip',
  templateUrl: 'intimate-fip.html',
  styleUrls: ['./accreditation-request.component.css'],
  // providers: [MatDialogRef],
})

export class IntimateFip implements OnDestroy {

  Subscription: Subscription = new Subscription();
  checked: boolean = false;
  allData: { name: string, key: string }[] = [];
  startDate: string;
  endDate: string;

  constructor(
    public dialogRef: MatDialogRef<IntimateFip>,
    public _authStore: AuthStore,
    private _sectionSelectorStore: SectionSelectorStore,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.Subscription.add(
      this._sectionSelectorStore.state$.subscribe((data) => {
        this.allData = data.selections;
        // console.log("SELECTION FROM SELCTIONS:--", this.allData);
      })
    )
  }

  dateChange1($event) {
    this.startDate = $event;
    setValue(this.startDate, this.endDate, this.allData);
  }

  dateChange2($event) {
    this.endDate = $event;
    setValue(this.startDate, this.endDate, this.allData);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnDestroy() {
    this.Subscription.unsubscribe();
  }




}