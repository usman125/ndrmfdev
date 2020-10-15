import { Component, OnInit, OnDestroy, Inject, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { AccreditationRequestStore } from "../../stores/accreditation-requests/accreditation-requests-store";
import { Subscription, from } from "rxjs";
import { distinctUntilChanged, filter, count } from "rxjs/operators";
import { AuthStore } from "../../stores/auth/auth-store";
// import { SmeStore } from "../../stores/sme/sme-store";
// import { SurveysStore } from "../../stores/surveys/surveys-store";
import * as _ from 'lodash';
import FormioUtils from 'formiojs/utils';
import { SingleAccreditationRequestStore } from 'src/app/stores/single-accreditation-requests/single-accreditation-requests-store';
// import { AccreditationReviewStore } from 'src/app/stores/accreditation-reviews/accreditation-reviews-store';
import { SectionSelectorStore } from "../../stores/section-selector/section-selector-store";
// import { fipIntimationsStore } from "../../stores/fip-intimations/fip-intimations-store";
import { setValue } from "../../stores/fip-intimations/intimate-fip";
// import { SurveysService } from "../../services/surveys.service";
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AccreditationRequestService } from "../../services/accreditation-request.service";
// import { SmeService } from "../../services/sme.service";
import { AccreditationReviewsService } from "../../services/accreditation-reviews.service";
import { ConfirmModelService } from "../../services/confirm-model.service";
import { DomSanitizer } from '@angular/platform-browser';
declare var $: any;

export interface DialogData {
  comments: string;
  startDate: string;
  endDate: string;
  minDate: string;
}

interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

interface FoodNode {
  name: string;
  children?: FoodNode[];
}


@Component({
  selector: 'app-accreditation-request',
  templateUrl: './accreditation-request.component.html',
  styleUrls: ['./accreditation-request.component.css'],
  providers: [ConfirmModelService]
})

export class AccreditationRequestComponent implements OnInit, OnDestroy {

  public allRequests: any = [];
  public Subscription: Subscription = new Subscription();

  public displayedColumns = ['user', 'status', 'actions'];
  public displayedColumns2 = ['section', 'startDate', 'endDate', 'expiry', 'status', 'comments', 'actions'];
  public dataSource: any = [];

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

  totalFormScore: any = 0;
  totalPassScore: any = 0;

  max = 5;

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
  commentsHistory: any = [];
  selectedHistoryItem: any = null;

  sectionStats: any = null;
  selectedSection: any = null;


  private _transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  }



  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
    this._transformer, node => node.level, node => node.expandable, node => node.children);

  dataSourceTree = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  // dataSourceTree;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;


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


    // this._surveysService.getAllSurveys().subscribe(
    //   result => {
    //     let surveysArray = []
    //     console.log("ALL SURVEYS FROM API:--", result['formInfoList']);
    //     if (result['formInfoList']) {
    //       result['formInfoList'].forEach(element => {
    //         var object = {
    //           name: element.sectionName,
    //           smeRef: element.sectionKey,
    //           formIdentity: element.formIdentity,
    //           passScore: element.passingScore,
    //           totalScore: element.totalScore,
    //           display: element.displayType,
    //           page: element.page,
    //           numPages: element.numOfPages,
    //           components: JSON.parse(element.component),
    //         }
    //         surveysArray.push(object)
    //       });
    //       this._surveysStore.addAllForms(surveysArray);
    //     }
    //     this._accreditationRequestService.getAllAccreditationRequests().subscribe(
    //       result => {
    //         console.log("RESULT FROM ALL API REQUESTS:--", result['accreditationInfos']);
    //         let tempRequestsArray = [];
    //         if (result['accreditationInfos']) {
    //           result['accreditationInfos'].forEach(element => {
    //             var object = {
    //               userRef: element.userName,
    //               formSubmitData: JSON.parse(element.formSubmitData),
    //               formData: element.formData,
    //               status: element.status,
    //               formIdentity: element.sectionKey,
    //               startDate: element.startDate,
    //               endDate: element.endDate,
    //               previousReview: element.prevReview,
    //               currentReview: element.currentReview,
    //               requestKey: element.requestKey,
    //               userUpdateFlag: element.userUpdateFlag,
    //               rating: element.ratings,
    //             }
    //             tempRequestsArray.push(object);
    //           })
    //         }
    //         this._accreditationRequestStore.addAllRequests(tempRequestsArray);
    //         this._smeService.getAllSmes().subscribe(
    //           result => {
    //             console.log("ALL SMES FROM APi:--", result);
    //             let smesArray = [];
    //             if (result['sectionInfos']) {
    //               result['sectionInfos'].forEach(element => {
    //                 var object = {
    //                   name: element.sectionName,
    //                   userRef: element.username,
    //                   formGenerated: element.formGenerated,
    //                   key: element.sectionKey,
    //                   formIdentity: element.formIdentity,
    //                 }
    //                 if (element.formIdentity === 'qualification') smesArray.push(object);
    //               });
    //               this._smeStore.addAllSmes(smesArray);
    //             }
    //             this._accreditationReviewsService.getAllReviews().subscribe(
    //               result => {
    //                 console.log("ALL REVIEWS FROM APi:--", result);
    //                 let reviewsArray = [];
    //                 if (result['sectionReviewInfos']) {
    //                   result['sectionReviewInfos'].forEach(element => {
    //                     var object = {
    //                       data: element.componentReviewInfos,
    //                       rating: element.rating,
    //                       status: element.status,
    //                       userRef: element.username,
    //                       formIdentity: element.sectionKey,
    //                       generalComments: element.comments,
    //                     }
    //                     reviewsArray.push(object);
    //                   });
    //                   this._accreditationReviewStore.addAllReviews(reviewsArray);
    //                 }
    //               },
    //               error => {
    //                 console.log("ERROR SMES FROM APi:--", result);
    //               }
    //             );
    //           },
    //           error => {
    //             console.log("ERROR SMES FROM APi:--", result);
    //           }
    //         );
    //       },
    //       error => {
    //         console.log("ERROR FROM ALL REQUESTS:--", error);
    //       }
    //     );
    //   },
    //   error => {
    //     console.log("ERROR SURVEYS API:--", error);
    //   }
    // );

    // this.Subscription.add(
    //   this._surveysStore.state$.pipe(distinctUntilChanged()).subscribe((data) => {
    //     this.allSurveys = data.surveys;
    //   })
    // );
    this.Subscription.add(
      this._authStore.state$.pipe(distinctUntilChanged()).subscribe((data) => {
        // this.allSmes = data.smes;
        this.addMobileClasses = data.auth.applyMobileClasses;
      })
    );
    // this.Subscription.add(
    //   this._smeStore.state$.pipe(distinctUntilChanged()).subscribe((data) => {
    //     this.allSmes = data.smes;
    //     // this.allSmes = _.filter(data.smes, { formGenerated: true });
    //   })
    // );
    // this.Subscription.add(
    //   this._accreditationReviewStore.state$.pipe(distinctUntilChanged()).subscribe((data) => {
    //     this.allRequestReviews = data.reviews;
    //     console.log("---:ALL REQEST REVIEWS:---\n", this.allRequestReviews);
    //   })
    // );
    this.Subscription.add(
      this._singleAccreditationRequestStore.state$.pipe(distinctUntilChanged()).subscribe((data) => {
        this.userReviewRequests = data.requests;
        console.log("OVER ALL REQUEST IN SUBSCRIPTION:--", this.userReviewRequests);
        if (this.userReviewRequests) {
          this.checkScores(this.userReviewRequests);
          this.checkAllReviews(this.userReviewRequests);
          this.checkForAllTasks();
        }
      })
    );
    this.Subscription.add(
      this._sectionSelectorStore.state$.pipe(distinctUntilChanged()).subscribe((data) => {
        this.allSectionSelections = data.selections;
      })
    );
    // this.Subscription.add(
    //   this._fipIntimationsStore.state$.pipe(distinctUntilChanged()).subscribe((data) => {
    //     // console.log("ALL ADDED INTIMATIONS:--", data.intimations);
    //   })
    // );
    // this.Subscription.add(
    //   this._accreditationRequestStore.state$.pipe(distinctUntilChanged()).subscribe((data) => {
    //     // console.log(data);
    //     // this.generatePipe = generate(data)
    //     this.userRequests = [];
    //     this.dataSource = [];
    //     this.userRequests = data.requests;
    //     console.log("ALL ADDED INTIMATIONS:--", data.requests);
    //     if (this.currentUser.role !== 'sme') {
    //       // this.checkForAllTasks();
    //       this.adminDefaults();
    //     } else if (this.currentUser.role === 'sme') {
    //       this.smeDefaults();
    //     }
    //   })
    // );
    // this.adminDefaults();
    if (this.currentUser.role !== 'sme') {
      this.adminDefaults();
    } else if (this.currentUser.role === 'sme') {
      this.smeDefaults();
    }




  }

  // hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  adminDefaults() {
    //   this.allRequests = _.chain(this.userRequests)
    //     .filter({ requestKey: 'qualification', status: 'submit' })
    //     .groupBy('userRef')
    //     .map((val, user) => {
    //       return { val, user }
    //     })
    //     .value();
    //   this.dataSource = this.allRequests;
    //   this.dataSourceTree.data = this.allRequests;
    //   console.log("ALL REQUESTS:--", this.allRequests);
    this.apiLoading = true;

    this._accreditationRequestService.getQulificationRequests().subscribe(
      (result: any) => {
        this.apiLoading = false;
        console.log("RESULT AFETR GETTING ALL QUALIFICATION:--", result);
        this.dataSource = new MatTableDataSource(result);
      },
      error => {
        this.apiLoading = false;
        console.log("ERROR FROM GETTING ALL QUALIFICATIONS:---", error);
      }
    );
  }

  smeDefaults() {
    //   this.allRequests = _.chain(this.userRequests)
    //     .filter({ currentReview: "in_review", formIdentity: this.currentUser.smeRef })
    //     .groupBy('userRef')
    //     .map((val, user) => {
    //       return { val, user }
    //     })
    //     .value();
    //   this.dataSource = this.allRequests;
    //   console.log("ALL REQUESTS:--", this.allRequests);
    // this.apiLoading = true;
    // const id = "842aa74e-b48d-4988-86d5-172a55fa495e";
    // const id = "eecf9f85-5dab-4580-8e48-0b2b346b0b14";
    // const id = "91a7a3d7-0bb0-4608-98f7-6a5b96db5d12";
    this.apiLoading = true;
    const id = "88ff4768-2a23-44d0-9af3-4d398e78d5a4";
    this._accreditationRequestService.getSmeTasks().subscribe(
      (result: any) => {
        console.log("RESULT SME TASKS:--", result);
        // result.
        const array: any = result.qualification.map(c => {
          const date1: any = new Date();
          const date2: any = new Date(c.endDate);
          const diffTime = Math.abs(date2 - date1);
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          console.log(diffTime + " milliseconds");
          console.log(diffDays + " days");
          return {
            ...c,
            expiry: diffDays
          }
        });
        this.dataSource = new MatTableDataSource(array);
        this.apiLoading = false;
      },
      error => {
        this.apiLoading = false;
        console.log("ERROR SME TASKS:--", error);
      }
    );

  }

  checkForAllTasks() {
    let array = this.userReviewRequests;
    for (let i = 0; i < array.length; i++) {
      // console.log("CHECK FOR ALL TASKS:--", request.val[i]);
      if (array[i].reviewStatus === 'Pending') {
        this.allTasksAssingedFlag = true;
      } else {
        this.allTasksAssingedFlag = false;
        break;
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
      console.log("TASK ASSIGNMENT VALUES:---", result);
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
    // var values = {
    //   currentReview: 'in_review',
    //   endDate: this.selectedTask.endDate,
    //   formData: "string",
    //   formSubmitData: JSON.stringify(this.selectedTask.submitData),
    //   prevReview: this.selectedTask.previousReview,
    //   ratings: this.selectedTask.rating,
    //   sectionKey: this.selectedTask.formIdentity,
    //   startDate: this.selectedTask.startDate,
    //   status: this.selectedTask.status,
    //   userName: this.selectedRequest.user,
    //   userUpdateFlag: this.selectedTask.userUpdateFlag,
    // }
    var object = {
      "comments": comments || null,
      "endDate": endDate,
      "startDate": startDate
    }
    console.log("REQEST FOR SME:---", object, this.selectedTask);
    this._accreditationRequestService.assignTaskToSme(object, this.selectedTask.id).subscribe(
      result => {
        console.log("RESULT AFTER UPDATING REQUEST:--", result);
        this._singleAccreditationRequestStore.setTaskReview(
          'Pending',
          this.selectedTask.id,
        );
        this.checkForAllTasks();
        // this._accreditationRequestStore.updateRequestReview(
        //   this.selectedTask.formIdentity,
        //   this.selectedRequest.user,
        //   this.selectedTask.startDate,
        //   this.selectedTask.endDate,
        //   null,
        //   'in_review'
        // );
      },
      error => {
        console.log("ERROR AFTER UPDATING REQUEST:--", error);
      }
    );
  }

  addAllTaskReview(comments, startDate, endDate) {
    console.log("ADD ALL TASK REVIEW CALLED:--", this.userReviewRequests)
    this.userReviewRequests.forEach(element => {
      // if (element.currentReview !== 'in_review') {
      //   var values = {
      //     currentReview: 'in_review',
      //     endDate: endDate,
      //     formData: "string",
      //     formSubmitData: JSON.stringify(element.formSubmitData),
      //     prevReview: element.previousReview,
      //     ratings: element.rating,
      //     sectionKey: element.formIdentity,
      //     startDate: startDate,
      //     status: element.status,
      //     userName: this.selectedRequest.user,
      //     userUpdateFlag: element.userUpdateFlag,
      //   }
      //   this._accreditationRequestService.updateAccreditationRequest(values).subscribe(
      //     result => {
      //       console.log("RESULT AFTER UPDATING REQUEST:--", result);
      //       this._accreditationRequestStore.updateRequestReview(
      //         values.sectionKey,
      //         this.selectedRequest.user,
      //         startDate,
      //         endDate,
      //         null,
      //         'in_review'
      //       );
      //     },
      //     error => {
      //       console.log("ERROR AFTER UPDATING REQUEST:--", error);
      //     }
      //   );
      // }
      if (element.reviewStatus === null || element.reviewStatus === 'Completed') {
        var object = {
          "comments": comments || null,
          "endDate": endDate,
          "startDate": startDate
        }
        // console.log("ITEMS TO ASSIGN TASK:---", element, object);
        this._accreditationRequestService.assignTaskToSme(object, element.id).subscribe(
          result => {
            console.log("RESULT AFTER UPDATING REQUEST:--", result, element);
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
    // this._singleAccreditationRequestStore.setAllTaskReview(
    //   startDate,
    //   endDate
    // );
  }

  getRequest(request) {
    this.toggle = !this.toggle;
    this.generalComments = null;
    // var keys = Object.keys(request.formSubmitData);
    // this.formKeys = keys;
    this.selectedRequest = request;
    // this.checkForAllTasks(this.selectedRequest);
    console.log("REQUEST TO CHECK:--", this.selectedRequest);
    this.apiLoading = true;
    if (this.currentUser.role !== 'sme') {
      this._accreditationRequestService.getSingleQualificationRequest(this.selectedRequest.id).subscribe(
        (result: any) => {
          let count = 0;
          // let passCount = 0;
          let tasksFlag = false;
          this.userReviewRequests = result.sections.map((c) => {
            count = count + parseInt(c.totalScore);
            // passCount = passCount + parseInt(c.passingScore);
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
          console.log("SELECTED REQUEST FORMS:---", result, this.userReviewRequests, tasksFlag);
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
      // const id = "842aa74e-b48d-4988-86d5-172a55fa495e";
      // this._accreditationRequestService.getSingleQualificationRequest(id).subscribe(
      //   (result: any) => {
      //     this.apiLoading = false;
      //     console.log("RESULT QUALIFICATION SME:--", result);
      //     let count = 0;
      //     // let passCount = 0;
      //     this.userReviewRequests = result.sections.map((c) => {
      //       count = count + parseInt(c.totalScore);
      //       // passCount = passCount + parseInt(c.passingScore);
      //       return {
      //         ...c,
      //         template: JSON.parse(c.template),
      //         data: c.data === null ? c.data : JSON.parse(c.data)
      //       }
      //     })
      //     this.totalFormScore = count;
      //     this.apiLoading = false;
      //     // this.totalPassScore = passCount;
      //   },
      //   error => {
      //     this.apiLoading = false;
      //     console.log("ERROR QUALIFICATION SME:---", error);
      //   }
      // );
    }
    // var count = 0;
    // var passCount = 0;
    // var resultedArray = [];
    // this.userReviewRequests = [];
    // for (let i = 0; i < this.allSmes.length; i++) {
    //   var object = {
    //     name: '',
    //     userRef: '',
    //     submitData: null,
    //     form: null,
    //     status: null,
    //     formIdentity: null,
    //     startDate: null,
    //     endDate: null,
    //     previousReview: null,
    //     currentReview: null,
    //     review: null,
    //     allReviews: null,
    //     userUpdateFlag: null,
    //     // rating: 0,
    //   }
    // var resultProfile = _.find(this.allSurveys, { 'smeRef': this.allSmes[i].key });
    // var resultRequest = _.find(this.userRequests, { 'formIdentity': this.allSmes[i].key, 'userRef': request.user });
    // object.name = this.allSmes[i].name;
    // object.formIdentity = this.allSmes[i].key;
    // if (resultProfile) {
    //   object.form = resultProfile;
    // }
    // if (resultRequest) {
    //   object.userRef = resultRequest.userRef;
    //   object.submitData = resultRequest.formSubmitData;
    //   object.status = resultRequest.status;
    //   object.currentReview = resultRequest.currentReview;
    //   object.previousReview = resultRequest.previousReview;
    //   object.startDate = resultRequest.startDate;
    //   object.endDate = resultRequest.endDate;
    //   object.userUpdateFlag = resultRequest.userUpdateFlag;
    // }

    // count = count + parseInt(object.form.totalScore);
    // passCount = passCount + parseInt(object.form.passScore);
    // this.totalFormScore = count;
    // this.totalPassScore = passCount;
    // object.totalScore = this.totalFormScore;
    // object.totalPassScore = this.totalPassScore;
    // var reviewe = null;
    // var reviewe = _.filter(this.allRequestReviews, { 'userRef': object.userRef, 'formIdentity': this.allSmes[i].key });
    // var reviewe = null;
    // this._accreditationReviewsService.getLastestAccreditationReviews(
    //   object.userRef,
    //   this.allSmes[i].key
    // ).subscribe(
    //   result => {
    //     console.log("RESULT FROM ACCREDITATION REVIEWS:---", result, object);
    //     if (result['sectionReviewInfos']) object.review = result['sectionReviewInfos'][0];           
    //   },
    //   error => {
    //     console.log("RESULT FROM ACCREDITATION REVIEWS:---", error);
    //   }
    // );
    // console.log("REVIEW OBJECT:--", reviewe);
    // if (reviewe) {
    //   object.review = reviewe[reviewe.length - 1] || null;
    //   object.allReviews = reviewe;
    // }
    // console.log("FINAL OBJECT:--", object, resultRequest, resultProfile, count);
    // console.log("FINAL OBJECT:--", object);
    // resultedArray.push(object);
    // this.userReviewRequests = resultedArray;
    // this._singleAccreditationRequestStore.addAllRequest(resultedArray);


    // if (this.currentUser.smeRef === this.allSmes[i].key) {
    //   // console.log("USER DEPARTMENT MATCH:--", this.currentUser.smeRef, this.allSmes[i].key);
    //   this.form = object.form;
    //   this.formSubmission = object.submitData;

    //   var contentElements = [];
    //   var formElements = [];
    //   this.formReviewObjects = [];


    //   // if (reviewe) {
    //   //   this.formReviewObjects = reviewe.data;
    //   // } else {
    //   FormioUtils.eachComponent(this.form.components, (component) => {
    //     if (component.key != 'submit') {
    //       if (component.type != 'content') {
    //         formElements.push(component);
    //       } else {
    //         contentElements.push(component);
    //       }
    //     }
    //   });

    //   // console.log(formElements, contentElements);

    //   for (let i = 0; i < formElements.length; i++) {
    //     var jsonObject = {
    //       title: '',
    //       value: '',
    //       submitValue: '',
    //       key: '',
    //       rating: 0,
    //       status: 'un-satisfy',
    //       comments: '',
    //     }
    //     if (formElements[i].label === '&nbsp;') {
    //       var titleObject = _.find(contentElements, { 'key': formElements[i].key })
    //       if (titleObject) {
    //         jsonObject.title = titleObject.html;
    //         jsonObject.key = formElements[i].key;
    //         jsonObject.value = this.formSubmission ? this.formSubmission[formElements[i].key] : null;
    //       } else {
    //         jsonObject.title = 'Question-' + i;
    //         jsonObject.key = formElements[i].key;
    //         jsonObject.value = this.formSubmission ? this.formSubmission[formElements[i].key] : null;
    //       }
    //     } else {
    //       jsonObject.title = formElements[i].label;
    //       jsonObject.key = formElements[i].key;
    //       jsonObject.value = this.formSubmission ? this.formSubmission[formElements[i].key] : null;
    //     }
    //     this.formReviewObjects.push(jsonObject);
    //   }
    //   // var x = $('.formio-component-submit').css({ "display": "none" });
    //   // console.log("JAVA SCRIPT OBJECTS:--", x);
    //   if (reviewe) {
    //     // if (reviewe[reviewe.length - 1]) {

    //     for (let i = 0; i < reviewe[reviewe.length - 1].data.length; i++) {
    //       for (let j = 0; j < this.formReviewObjects.length; j++) {
    //         if (this.formReviewObjects[j].key === reviewe[reviewe.length - 1].data[i].key) {
    //           this.formReviewObjects[j].rating = reviewe[reviewe.length - 1].data[i].rating;
    //           this.formReviewObjects[j].status = reviewe[reviewe.length - 1].data[i].status;
    //           this.formReviewObjects[j].comments = reviewe[reviewe.length - 1].data[i].comments;
    //         }
    //       }
    //     }
    //     console.log("JSON OBJECT TO PUSH:--", this.formReviewObjects);
    //     this.generalComments = reviewe[reviewe.length - 1].generalComments;
    //     // }
    //   }
    // }

    // }
    // }
  }

  getSmeRequest(id) {
    this.selectedSection = id;
    this.toggle = !this.toggle;
    this.apiLoading = true;

    this._accreditationRequestService.getSingleQualificationRequest(id.requestId).subscribe(
      (result: any) => {
        this.selectedRequest = result;
        let count = 0;
        let smeComponent: any = null;
        console.log("RESULT QUALIFICATION SME:--", result);
        this.userReviewRequests = result.sections.map((c) => {
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
            console.log("FORM REVIEW OBJECT:---", form, this.formSubmission, this.formReviewObjects, contentElements, formElements);
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
              console.log("JSON OBJECT TO PUSH:--", this.formReviewObjects);
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
        console.log("RESULT QUALIFICATION SME:--", this.userReviewRequests);
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
    // this.selectedRequest.val[0]
    // var result = _.find(this.userReviewRequests, { userRef: this.selectedRequest.user, formIdentity: this.selectedRequest.val[0].formIdentity })
    // console.log("REQUEST TO REVIEW:--", this.selectedRequest, result);
    // this.addRequestReview(result);
    console.log("REQUEST TO POST:--", this.selectedRequest);
  }

  addRequestReview(item) {
    // this.apiLoading = true;
    // this.currentReviewItem = item;
    // console.log("REVIEW ITWM:--", item);
    this._authStore.setLoading();

    var rating = {
      0: 0,
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    };
    for (let j = 0; j <= 5; j++) {
      var count = 0;
      for (let i = 0; i < item.formReviewObjects.length; i++) {
        if (item.formReviewObjects[i].rating === j) {
          count = count + 1;
        }
      }
      console.log('COUNT FOR:--', j, count, '\n');
      rating[j] = count;
    }
    var count1 = 0;
    var count2 = 0;
    var requestStatus = null;
    Object.keys(rating).forEach((key) => {
      count1 = count1 + parseInt(key) * rating[key];
      count2 = count2 + rating[key];
    })
    if (Math.ceil(count1 / count2) >= 0 && Math.ceil(count1 / count2) <= 2) {
      requestStatus = "Failed";
    } else if (Math.ceil(count1 / count2) > 2 && Math.ceil(count1 / count2) <= 3) {
      requestStatus = "Deffered";
    } else {
      requestStatus = "Accredited";
    }
    var apiValues = {
      "comments": item.review.comments,
      "controlWiseComments": JSON.stringify(item.formReviewObjects),
      "rating": Math.ceil(count1 / count2),
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
        console.log("RESULT FROM ADDING REVIEW:--", result);
        this._singleAccreditationRequestStore.addSectionReview(
          item.id,
          {
            "comments": item.review.comments,
            "controlWiseComments": item.formReviewObjects,
            "rating": Math.ceil(count1 / count2),
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
    // var flag = _.find(this.allRequestReviews, { userRef: item.userRef, formIdentity: item.formIdentity });
    // if (!flag) {
    // console.log("FLAG FROM ANOTHER FIND:-", flag);
    // this._accreditationReviewsService.addReview(
    //   this.formReviewObjects,
    //   Math.ceil(count1 / count2),
    //   item.userRef,
    //   item.formIdentity,
    //   this.generalComments,
    //   requestStatus,
    //   this.currentUser.username
    // ).subscribe(
    //   result => {
    //     console.log("RESULT AFTER ADDING REVIEW:--", result);
    //     this.apiLoading = false;
    //     this.reviewAdded = true;
    //     var object = {
    //       currentReview: 'reviewed',
    //       endDate: item.endDate,
    //       formData: "string",
    //       formSubmitData: JSON.stringify(item.submitData),
    //       prevReview: "done",
    //       ratings: Math.ceil(count1 / count2),
    //       sectionKey: item.formIdentity,
    //       startDate: item.startDate,
    //       status: item.status,
    //       userName: item.userRef,
    //       userUpdateFlag: item.userUpdateFlag,
    //     }
    //     this._accreditationReviewStore.addReview(
    //       this.formReviewObjects,
    //       Math.ceil(count1 / count2),
    //       requestStatus,
    //       item.userRef,
    //       item.formIdentity,
    //       this.generalComments,
    //     );
    //     this._accreditationRequestService.updateAccreditationRequest(object).subscribe(
    //       result => {
    //         console.log("RESULT AFTER UPDATING REQUEST:---", result);
    //         this._accreditationRequestStore.markRequestReview(
    //           item.userRef,
    //           item.formIdentity,
    //           "reviewed",
    //           "done",
    //           requestStatus,
    //           Math.ceil(count1 / count2),
    //         );
    //         this._singleAccreditationRequestStore.updateSingleReviewStatus(
    //           item.userRef,
    //           item.formIdentity,
    //           {
    //             data: this.formReviewObjects,
    //             rating: Math.ceil(count1 / count2),
    //             status: requestStatus,
    //             userRef: item.userRef,
    //             formIdentity: item.formIdentity
    //           }
    //         );
    //       },
    //       error => {
    //         console.log("RESULT AFTER UPDATING REQUEST:---", error);
    //       }
    //     );
    //   },
    //   error => {
    //     this.apiLoading = false;
    //     console.log("RESULT AFTER ADDING REVIEW:--", error);
    //   }
    // )
    // } else {
    // console.log("VALUE EXISTS:--");
    // this._accreditationReviewStore.udpateReview(
    //   this.formReviewObjects,
    //   Math.ceil(count1 / count2),
    //   requestStatus,
    //   item.userRef,
    //   item.formIdentity,
    //   this.generalComments,
    // )
    // this._accreditationReviewStore.addReview(
    //   this.formReviewObjects,
    //   Math.ceil(count1 / count2),
    //   requestStatus,
    //   item.userRef,
    //   item.formIdentity,
    //   this.generalComments,
    // );
    // this._accreditationRequestStore.markRequestReview(
    //   item.userRef,
    //   item.formIdentity,
    //   "reviewed",
    //   "done",
    //   requestStatus,
    //   Math.ceil(count1 / count2),
    // );
    // this._singleAccreditationRequestStore.updateSingleReviewStatus(
    //   item.userRef,
    //   item.formIdentity,
    //   {
    //     data: this.formReviewObjects,
    //     rating: Math.ceil(count1 / count2),
    //     status: requestStatus,
    //     userRef: item.userRef,
    //     formIdentity: item.formIdentity
    //   }
    // )
    // }
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
      console.log("CHECK ALL REVIEWS:--", count1, count2);
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
    };
    var pendingCount = 0;
    var reviewsCount = 0;
    // var unassignCount = 0;
    for (let j = 0; j <= 5; j++) {
      var count = 0;
      for (let i = 0; i < item.length; i++) {
        if (item[i].review.rating !== null) {
          if (item[i].review.rating === j.toString()) {
            count = count + 1;
          }
        }
        rating[j] = count;
        // console.log("ITEM IN CHECK SCORE:--", item[i].review.rating)
        if (j === 0) {
          // if (item[i].reviewStatus === 'Pending') {
          //   pendingCount = pendingCount + 1;
          // }
          // if (item[i].review.rating !== null) {
          //   reviewsCount = reviewsCount + 1;
          // }
          // if ((item[i].review.rating === null && item[i].reviewStatus === null) ||
          //   (item[i].review.rating !== null && item[i].reviewStatus === null)
          // ) {
          //   unassignCount = unassignCount + 1;
          // }
          this.calcSectionStats(item);
        }
        // console.log('COUNT FOR:--', count, rating[j], { pendingCount, reviewsCount });
      }
      // this.sectionStats = { pendingCount, reviewsCount, unassignCount };
      if (j === 5) {
        this.rateApplication(rating);
      }
    }
    // var count1 = 0;
    // var count2 = 0;
    // var requestStatus = null;
    // Object.keys(rating).forEach((key) => {
    //   count1 = count1 + parseInt(key) * rating[key];
    //   count2 = count2 + rating[key];
    // })
    // if (count1 && count2) {
    //   if (Math.ceil(count1 / count2)) {
    //     this.userSectionScore = this.userSectionScore + Math.ceil(count1 / count2);
    //   } else {
    //     this.userSectionScore = this.userSectionScore + 0;
    //   }
    // }
    // if (Math.ceil(count1 / count2) >= 0 && Math.ceil(count1 / count2) <= 2) {
    //   requestStatus = "Failed";
    // } else if (Math.ceil(count1 / count2) > 2 && Math.ceil(count1 / count2) <= 3) {
    //   requestStatus = "Deffered";
    // } else if (Math.ceil(count1 / count2) > 3 && Math.ceil(count1 / count2) <= 5) {
    //   requestStatus = "Accredited";
    // }

    // if ()

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
    var requestStatus = null;
    Object.keys(rating).forEach((key) => {
      count1 = count1 + parseInt(key) * rating[key];
      count2 = count2 + rating[key];
    })

    if (Math.ceil(count1 / count2) >= 0 && Math.ceil(count1 / count2) <= 2) {
      requestStatus = "Failed";
      this.userSystemStatus = requestStatus;
      this.userAllScore = Math.ceil(count1 / count2);
    } else if (Math.ceil(count1 / count2) > 2 && Math.ceil(count1 / count2) <= 3) {
      requestStatus = "Deffered";
      this.userSystemStatus = requestStatus;
      this.userAllScore = Math.ceil(count1 / count2);
    } else if (Math.ceil(count1 / count2) > 3 && Math.ceil(count1 / count2) <= 5) {
      requestStatus = "Accredited";
      this.userSystemStatus = requestStatus;
      this.userAllScore = Math.ceil(count1 / count2);
    }
    console.log(
      "ALL Request SCORES:--\n", rating,
      "SYSTEM STATUS:--\n", requestStatus,
      "USER SCORES:--\n", this.userAllScore,

    );

  }

  setRequestStatus() {
    const options = {
      title: 'Set application status!',
      message: 'You can set one of the following status',
      cancelText: 'CANCEL',
      confirmText: 'OK',
      add: false,
      confirm: false,
      setStatus: true,
    };

    this._confirmModelService.open(options);

    this._confirmModelService.confirmed().subscribe(confirmed => {
      if (confirmed) {
        console.log("CONFIRMED FROM MODEL", confirmed, this.selectedRequest);
        this.apiLoading = true;
        this._accreditationRequestService.updateAccreditationRequest(this.selectedRequest.id, confirmed.status).subscribe(
          result => {
            this.apiLoading = false;
            console.log("RESULT AFTER UPDATING STATUS:---", result);
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
    console.log('ALL SECTIONS IN HISTORY:--', this.userReviewRequests, item);
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
      //   var currentIntimation: any = this._fipIntimationsStore.filterIntimations(this.selectedRequest.user);
      //   if (result) {
      let sectionIds = this.allSectionSelections.map(element => {
        if (element.reassignmentStatus === null || element.reassignmentStatus === 'Completed') {
          return element.id;
        }
      });
      let values = {
        sectionIds,
        comments: this.commentsForFip,
        startDate: result.startDate,
        endDate: result.endDate,
      }
      console.log("RESULT:--", result, this.allSectionSelections, this.selectedRequest, values);
      this._accreditationRequestService.reassignFipSection(this.selectedRequest.id, values).subscribe(
        result => {
          console.log("RESULT FROM REASSIGN:--", result);
          this._singleAccreditationRequestStore.updateReassignFipSection(sectionIds);
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
      //     if (currentIntimation.intimations.length) {
      //       // console.log("CURRENT INTIMATION:--", currentIntimation);
      //       var newEntry = [];
      //       var previousEntries = [];
      //       var allEntries = [];
      //       for (let i = 0; i < this.allSectionSelections.length; i++) {
      //         var bool = false;
      //         for (let j = 0; j < currentIntimation.intimations.length; j++) {
      //           if (this.allSectionSelections[i].key === currentIntimation.intimations[j].formIdentity) {
      //             currentIntimation.intimations[j].comments.push({ data: this.commentsForFip, date: result.startDate });
      //             previousEntries.push(currentIntimation.intimations[j]);
      //             bool = true;
      //             this._accreditationRequestStore.setUserUpdateFlag(this.selectedRequest.user, this.allSectionSelections[i].key);
      //             break;
      //           }
      //         }
      //         if (!bool) {
      //           var object = {
      //             userRef: '',
      //             formIdentity: '',
      //             endDate: '',
      //             comments: [],
      //             intimation_status: ''
      //           }
      //           this.selectedRequest.val.forEach((d) => {
      //             if (d.formIdentity === this.allSectionSelections[i].key) {
      //               object.userRef = d.userRef;
      //               object.formIdentity = d.formIdentity;
      //               object.endDate = result.endDate;
      //               object.intimation_status = 'pending';
      //               object.comments.push({ data: this.commentsForFip, date: result.startDate });
      //             }
      //           })
      //           newEntry.push(object);
      //           this._accreditationRequestStore.setUserUpdateFlag(this.selectedRequest.user, this.allSectionSelections[i].key);
      //         }
      //       }
      //       newEntry.concat(previousEntries);
      //       console.log("ENTRIES ARRAYS:--", newEntry, previousEntries, allEntries);
      //       this._fipIntimationsStore.newIntimations(newEntry);
      //       this.commentsForFip = null;
      //     } else {
      //       var initimations = [];
      //       for (let i = 0; i < this.allSectionSelections.length; i++) {
      //         // console.log("ENTRY TO CHECK:--", this.allSectionSelections[i])
      //         var object = {
      //           userRef: '',
      //           formIdentity: '',
      //           endDate: '',
      //           comments: [],
      //           intimation_status: ''
      //         }
      //         for (let j = 0; j < this.selectedRequest.val.length; j++) {
      //           if (this.allSectionSelections[i].key === this.selectedRequest.val[j].formIdentity) {
      //             // console.log("ENTRY MATCHED:--", this.selectedRequest.val[j].formIdentity);
      //             object.userRef = this.selectedRequest.val[j].userRef;
      //             object.formIdentity = this.selectedRequest.val[j].formIdentity;
      //             object.endDate = result.endDate;
      //             object.intimation_status = 'pending';
      //             object.comments.push({ data: this.commentsForFip, date: result.startDate });
      //             break;
      //           }
      //         }
      //         initimations.push(object);
      //         this._accreditationRequestStore.setUserUpdateFlag(this.selectedRequest.user, this.allSectionSelections[i].key);
      //       }
      //       // console.log("OBJECT TO SHOW:--", initimations);
      //       this._fipIntimationsStore.addIntimations(initimations);
      //       this._sectionSelectorStore.removeAllSelections();
      //       this.commentsForFip = null;
      //     }
      //   } else {
      //     setValue(null, null, []);
      //   }
    });
  }

  hideComments() {
    this.commentsFlag = false;
    // this.generalComments = null;
  }

  applyFilter(event: Event) {
    console.log("APPLY FIKTER:--", event);
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

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
    this.reviewAdded = false;
    this.hideForms = false;
    this._singleAccreditationRequestStore.resetData();
    if (this.currentUser.role === 'sme') {
      this.smeDefaults();
    }
    if (this.currentUser.role === 'process owner') {
      this.adminDefaults();
    }
    // this.cameFromComments = !this.cameFromComments;
  }

  ngOnDestroy() {
    console.log("NG ON DESTORY CALLED:--");
    this._singleAccreditationRequestStore.resetData();
    this.Subscription.unsubscribe();
    this.generalComments = null;
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
    console.log("TOGGLE ENTRY FORM:---", item);
    item.toggleForm = !item.toggleForm;
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