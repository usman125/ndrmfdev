import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AccreditationRequestStore } from "../../stores/accreditation-requests/accreditation-requests-store";
import { Subscription, from } from "rxjs";
import { distinctUntilChanged, filter } from "rxjs/operators";
import { AuthStore } from "../../stores/auth/auth-store";
import { SmeStore } from "../../stores/sme/sme-store";
import { SurveysStore } from "../../stores/surveys/surveys-store";
import * as _ from 'lodash';
import FormioUtils from 'formiojs/utils';
import { SingleAccreditationRequestStore } from 'src/app/stores/single-accreditation-requests/single-accreditation-requests-store';
import { AccreditationReviewStore } from 'src/app/stores/accreditation-reviews/accreditation-reviews-store';
import { SectionSelectorStore } from "../../stores/section-selector/section-selector-store";
import { fipIntimationsStore } from "../../stores/fip-intimations/fip-intimations-store";
import { setValue } from "../../stores/fip-intimations/intimate-fip";
import { SurveysService } from "../../services/surveys.service";
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';

declare var $: any;

export interface DialogData {
  comments: string;
  startDate: string;
  endDate: string;
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
  providers: [SurveysService]
})

export class AccreditationRequestComponent implements OnInit, OnDestroy {

  public allRequests: any = [];
  public Subscription: Subscription = new Subscription();

  public displayedColumns = ['user', 'actions'];
  public dataSource = [];

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


  constructor(
    private _accreditationRequestStore: AccreditationRequestStore,
    private _singleAccreditationRequestStore: SingleAccreditationRequestStore,
    private _accreditationReviewStore: AccreditationReviewStore,
    private _sectionSelectorStore: SectionSelectorStore,
    private _fipIntimationsStore: fipIntimationsStore,
    private _authStore: AuthStore,
    private _smeStore: SmeStore,
    private _surveysStore: SurveysStore,
    private _surveysService: SurveysService,
    public dialog: MatDialog,
  ) {


  }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('user'));
    setTimeout(() => {
      this._authStore.setRouteName('ACCREDITATION-REQUESTS');
    });


    this._surveysService.getAllSurveys().subscribe(
      result => {
        let surveysArray = []
        console.log("ALL SURVEYS FROM API:--", result['formInfoList']);
        if (result['formInfoList']) {
          result['formInfoList'].forEach(element => {
            var object = {
              name: element.sectionName,
              smeRef: element.sectionKey,
              formIdentity: element.formIdentity,
              passScore: element.passingScore,
              totalScore: element.totalScore,
              display: element.displayType,
              page: element.page,
              numPages: element.numOfPages,
              components: JSON.parse(element.component),
            }
            surveysArray.push(object)
          });
          this._surveysStore.addAllForms(surveysArray);
        }
        this.Subscription.add(
          this._surveysStore.state$.pipe(distinctUntilChanged()).subscribe((data) => {
            this.allSurveys = data.surveys;
          })
        );
      },
      error => {
        console.log("ERROR SURVEYS API:--", error);
      }
    )



    this.Subscription.add(
      this._authStore.state$.pipe(distinctUntilChanged()).subscribe((data) => {
        // this.allSmes = data.smes;
        this.addMobileClasses = data.auth.applyMobileClasses;
      })
    );
    this.Subscription.add(
      this._smeStore.state$.pipe(distinctUntilChanged()).subscribe((data) => {
        this.allSmes = _.filter(data.smes, { formGenerated: true });
      })
    );
    this.Subscription.add(
      this._accreditationReviewStore.state$.pipe(distinctUntilChanged()).subscribe((data) => {
        this.allRequestReviews = data.reviews;
        console.log("ALL RE+QEST REVIEWS:---", this.allRequestReviews);
      })
    );

    this.Subscription.add(
      this._singleAccreditationRequestStore.state$.pipe(distinctUntilChanged()).subscribe((data) => {
        this.userReviewRequests = data.requests;
        // console.log("USER REVIEWS:--", this.userReviewRequests);
        if (this.userReviewRequests)
          this.checkScores(this.userReviewRequests);
      })
    );
    this.Subscription.add(
      this._sectionSelectorStore.state$.pipe(distinctUntilChanged()).subscribe((data) => {
        this.allSectionSelections = data.selections;
      })
    );
    this.Subscription.add(
      this._fipIntimationsStore.state$.pipe(distinctUntilChanged()).subscribe((data) => {
        // console.log("ALL ADDED INTIMATIONS:--", data.intimations);
      })
    )
    this.Subscription.add(
      this._accreditationRequestStore.state$.pipe(distinctUntilChanged()).subscribe((data) => {
        // console.log(data);
        // this.generatePipe = generate(data)
        this.userRequests = [];
        this.dataSource = [];
        this.userRequests = data.requests;
        if (this.currentUser.role !== 'sme') {
          this.checkForAllTasks();
          this.adminDefaults();
        } else if (this.currentUser.role === 'sme') {
          this.smeDefaults();
        }
      })
    );
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  adminDefaults() {
    this.allRequests = _.chain(this.userRequests)
      .filter({ requestKey: 'qualification', status: 'submit' })
      .groupBy('userRef')
      .map((val, user) => {
        return { val, user }
      })
      .value();
    this.dataSource = this.allRequests;
    this.dataSourceTree.data = this.allRequests;
    console.log("ALL REQUESTS:--", this.allRequests);
  }

  smeDefaults() {
    this.allRequests = _.chain(this.userRequests)
      .filter({ currentReview: "in_review", formIdentity: this.currentUser.smeRef })
      .groupBy('userRef')
      .map((val, user) => {
        return { val, user }
      })
      .value();
    this.dataSource = this.allRequests;
    console.log("ALL REQUESTS:--", this.allRequests);
  }

  checkForAllTasks() {
    for (let i = 0; i < this.userRequests.length; i++) {
      if (this.userRequests[i].currentReview === "in_review") {
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
      data: { startDate: this.startDate, endDate: this.endDate, comments: this.comments }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && this.selectedTask) {
        if (typeof (this.selectedTask) === 'object') {
          this.selectedTask.startDate = result.startDate;
          this.selectedTask.endDate = result.endDate;
          this.addSingleTaskReview();
        }
      } else {
        if (result) {
          this.addAllTaskReview(result.startDate, result.endDate);
        }
      }
    });
  }

  addSingleTaskReview() {
    this._singleAccreditationRequestStore.setTaskReview(
      this.selectedTask.formIdentity,
      this.selectedTask.startDate,
      this.selectedTask.endDate
    );
    this._accreditationRequestStore.updateRequestReview(
      this.selectedTask.formIdentity,
      this.selectedRequest.user,
      this.selectedTask.startDate,
      this.selectedTask.endDate,
      null,
      'in_review'
    );

  }

  addAllTaskReview(startDate, endDate) {
    this._singleAccreditationRequestStore.setAllTaskReview(
      startDate,
      endDate
    );
    this._accreditationRequestStore.updateAllRequestReview(
      this.selectedRequest.user,
      startDate,
      endDate,
      null,
      'in_review',
    );
  }

  getRequest(request) {



    this.toggle = !this.toggle;

    this.generalComments = null;
    // var keys = Object.keys(request.formSubmitData);
    // this.formKeys = keys;

    this.selectedRequest = request;
    // console.log("REQUEST TO CHECK:--", this.selectedRequest);

    var count = 0;
    var passCount = 0;
    var resultedArray = [];
    // this.userReviewRequests = [];

    for (let i = 0; i < this.allSmes.length; i++) {
      var object = {
        name: '',
        userRef: '',
        submitData: null,
        form: null,
        status: null,
        formIdentity: null,
        startDate: null,
        endDate: null,
        previousReview: null,
        currentReview: null,
        review: null,
        // totalScore: 0,
        // rating: 0,
      }
      var resultProfile = _.find(this.allSurveys, { 'smeRef': this.allSmes[i].key });
      var resultRequest = _.find(this.userRequests, { 'formIdentity': this.allSmes[i].key, 'userRef': request.user });
      object.name = this.allSmes[i].name;
      object.formIdentity = this.allSmes[i].key;
      if (resultProfile) {
        object.form = resultProfile;
      }
      if (resultRequest) {
        object.userRef = resultRequest.userRef;
        object.submitData = resultRequest.formSubmitData;
        object.status = resultRequest.status;
        object.currentReview = resultRequest.currentReview;
        object.previousReview = resultRequest.previousReview;
        object.startDate = resultRequest.startDate;
        object.endDate = resultRequest.endDate;
      }

      count = count + parseInt(object.form.totalScore);
      passCount = passCount + parseInt(object.form.passScore);
      this.totalFormScore = count;
      this.totalPassScore = passCount;
      // object.totalScore = this.totalFormScore;
      // object.totalPassScore = this.totalPassScore;

      var reviewe = _.find(this.allRequestReviews, { 'userRef': object.userRef, 'formIdentity': this.allSmes[i].key })
      // console.log("REVIEW OBJECT:--", reviewe);
      // console.log("FINAL OBJECT:--", object, resultRequest, resultProfile, count);
      if (reviewe) {
        object.review = reviewe;
      }

      resultedArray.push(object);
      // this.userReviewRequests = resultedArray;
      this._singleAccreditationRequestStore.addAllRequest(resultedArray);

      if (this.currentUser.smeRef === this.allSmes[i].key) {
        // console.log("USER DEPARTMENT MATCH:--", this.currentUser.smeRef, this.allSmes[i].key);
        this.form = object.form;
        this.formSubmission = object.submitData;

        var contentElements = [];
        var formElements = [];
        this.formReviewObjects = [];


        // if (reviewe) {
        //   this.formReviewObjects = reviewe.data;
        // } else {
        FormioUtils.eachComponent(this.form.components, (component) => {
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
          }
          if (formElements[i].label === '&nbsp;') {
            var titleObject = _.find(contentElements, { 'key': formElements[i].key })
            if (titleObject) {
              jsonObject.title = titleObject.html;
              jsonObject.key = formElements[i].key;
              jsonObject.value = this.formSubmission ? this.formSubmission[formElements[i].key] : null;
            } else {
              jsonObject.title = 'Question-' + i;
              jsonObject.key = formElements[i].key;
              jsonObject.value = this.formSubmission ? this.formSubmission[formElements[i].key] : null;
            }
          } else {
            jsonObject.title = formElements[i].label;
            jsonObject.key = formElements[i].key;
            jsonObject.value = this.formSubmission ? this.formSubmission[formElements[i].key] : null;
          }
          this.formReviewObjects.push(jsonObject);
        }
        // var x = $('.formio-component-submit').css({ "display": "none" });
        // console.log("JAVA SCRIPT OBJECTS:--", x);
      }
      if (reviewe) {
        for (let i = 0; i < reviewe.data.length; i++) {
          for (let j = 0; j < this.formReviewObjects.length; j++) {
            if (this.formReviewObjects[j].key === reviewe.data[i].key) {
              this.formReviewObjects[j].rating = reviewe.data[i].rating;
              this.formReviewObjects[j].status = reviewe.data[i].status;
              this.formReviewObjects[j].comments = reviewe.data[i].comments;
            }
          }
        }
        console.log("JSON OBJECT TO PUSH:--", this.formReviewObjects);
        this.generalComments = reviewe.generalComments;
      }
      // }
    }
  }

  completeTask() {
    this.selectedRequest.val[0]
    var result = _.find(this.userReviewRequests, { userRef: this.selectedRequest.user, formIdentity: this.selectedRequest.val[0].formIdentity })
    console.log("REQUEST TO REVIEW:--", this.selectedRequest, result);
    this.addRequestReview(result);
  }

  addRequestReview(item) {
    this.reviewAdded = true;
    // this.currentReviewItem = item;
    // console.log("REVIEW ITWM:--", item);
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
      for (let i = 0; i < this.formReviewObjects.length; i++) {
        if (this.formReviewObjects[i].rating === j) {
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
    console.log(
      "REVIEW TO ADD FOR ITEM:--\n", item,
      "\nACTUAL REVIEW:--", this.formReviewObjects,
      "\nTOAL RATING :--", rating,
      "\nCOUNT 1 :--", count1,
      "\nCOUNT 2 :--", count2,
      "\nRATING RAW:--", count1 / count2,
      "\nRATING :--", Math.ceil(count1 / count2),
      "\REQUEST STATUS :--", requestStatus,
    );
    var flag = _.find(this.allRequestReviews, { userRef: item.userRef, formIdentity: item.formIdentity });
    if (!flag) {
      console.log("FLAG FROM ANOTHER FIND:-", flag);
      this._accreditationReviewStore.addReview(
        this.formReviewObjects,
        Math.ceil(count1 / count2),
        requestStatus,
        item.userRef,
        item.formIdentity,
        this.generalComments,
      );
      this._accreditationRequestStore.markRequestReview(
        item.userRef,
        item.formIdentity,
        "reviewed",
        "done",
        requestStatus,
        Math.ceil(count1 / count2),
      );
      this._singleAccreditationRequestStore.updateSingleReviewStatus(
        item.userRef,
        item.formIdentity,
        {
          data: this.formReviewObjects,
          rating: Math.ceil(count1 / count2),
          status: requestStatus,
          userRef: item.userRef,
          formIdentity: item.formIdentity
        }
      )
    } else {
      console.log("VALUE EXISTS:--");
      // this._accreditationReviewStore.udpateReview(
      //   this.formReviewObjects,
      //   Math.ceil(count1 / count2),
      //   requestStatus,
      //   item.userRef,
      //   item.formIdentity,
      //   this.generalComments,
      // )
      this._accreditationReviewStore.addReview(
        this.formReviewObjects,
        Math.ceil(count1 / count2),
        requestStatus,
        item.userRef,
        item.formIdentity,
        this.generalComments,
      );
      this._accreditationRequestStore.markRequestReview(
        item.userRef,
        item.formIdentity,
        "reviewed",
        "done",
        requestStatus,
        Math.ceil(count1 / count2),
      );
      this._singleAccreditationRequestStore.updateSingleReviewStatus(
        item.userRef,
        item.formIdentity,
        {
          data: this.formReviewObjects,
          rating: Math.ceil(count1 / count2),
          status: requestStatus,
          userRef: item.userRef,
          formIdentity: item.formIdentity
        }
      )
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
    for (let j = 0; j <= 5; j++) {
      var count = 0;
      for (let i = 0; i < item.length; i++) {
        if (item[i].review) {
          if (item[i].review.rating === j) {
            count = count + 1;
          }
        }
        // console.log('COUNT FOR:--', j, count, '\n');
        rating[j] = count;
      }

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
    // console.log(
    //   "ALL Request SCORES:--\n", rating,
    //   "SYSTEM STATUS:--\n", requestStatus,
    //   "USER SCORES:--\n", this.userAllScore,

    // );

  }

  viewCommentsMatrix(userReviewRequests) {
    // console.log("REQUEST TO VIEW COMMENTS:--", userReviewRequests);
    this.commentsData = userReviewRequests;
    this.commentsFlag = true;
  }

  intimateFip(): void {
    const dialogRef = this.dialog.open(IntimateFip, {
      width: '320px',
      data: { comments: this.commentsForFip }
    });
    dialogRef.afterClosed().subscribe(result => {
      var currentIntimation: any = this._fipIntimationsStore.filterIntimations(this.selectedRequest.user);
      if (result) {
        // console.log("RESULT:--", result, this.allSectionSelections, this.selectedRequest);
        if (currentIntimation.intimations.length) {
          // console.log("CURRENT INTIMATION:--", currentIntimation);
          var newEntry = [];
          var previousEntries = [];
          var allEntries = [];
          for (let i = 0; i < this.allSectionSelections.length; i++) {
            var bool = false;
            for (let j = 0; j < currentIntimation.intimations.length; j++) {
              if (this.allSectionSelections[i].key === currentIntimation.intimations[j].formIdentity) {
                currentIntimation.intimations[j].comments.push({ data: this.commentsForFip, date: result.startDate });
                previousEntries.push(currentIntimation.intimations[j]);
                bool = true;
                this._accreditationRequestStore.setUserUpdateFlag(this.selectedRequest.user, this.allSectionSelections[i].key);
                break;
              }
            }
            if (!bool) {
              var object = {
                userRef: '',
                formIdentity: '',
                endDate: '',
                comments: [],
                intimation_status: ''
              }
              this.selectedRequest.val.forEach((d) => {
                if (d.formIdentity === this.allSectionSelections[i].key) {
                  object.userRef = d.userRef;
                  object.formIdentity = d.formIdentity;
                  object.endDate = result.endDate;
                  object.intimation_status = 'pending';
                  object.comments.push({ data: this.commentsForFip, date: result.startDate });
                }
              })
              newEntry.push(object);
              this._accreditationRequestStore.setUserUpdateFlag(this.selectedRequest.user, this.allSectionSelections[i].key);
            }
          }
          newEntry.concat(previousEntries);
          console.log("ENTRIES ARRAYS:--", newEntry, previousEntries, allEntries);
          this._fipIntimationsStore.newIntimations(newEntry);
          this.commentsForFip = null;
        } else {
          var initimations = [];
          for (let i = 0; i < this.allSectionSelections.length; i++) {
            // console.log("ENTRY TO CHECK:--", this.allSectionSelections[i])
            var object = {
              userRef: '',
              formIdentity: '',
              endDate: '',
              comments: [],
              intimation_status: ''
            }
            for (let j = 0; j < this.selectedRequest.val.length; j++) {
              if (this.allSectionSelections[i].key === this.selectedRequest.val[j].formIdentity) {
                // console.log("ENTRY MATCHED:--", this.selectedRequest.val[j].formIdentity);
                object.userRef = this.selectedRequest.val[j].userRef;
                object.formIdentity = this.selectedRequest.val[j].formIdentity;
                object.endDate = result.endDate;
                object.intimation_status = 'pending';
                object.comments.push({ data: this.commentsForFip, date: result.startDate });
                break;
              }
            }
            initimations.push(object);
            this._accreditationRequestStore.setUserUpdateFlag(this.selectedRequest.user, this.allSectionSelections[i].key);
          }
          // console.log("OBJECT TO SHOW:--", initimations);
          this._fipIntimationsStore.addIntimations(initimations);
          this._sectionSelectorStore.removeAllSelections();
          this.commentsForFip = null;
        }
      } else {
        setValue(null, null, []);
      }
    });
  }

  hideComments() {
    this.commentsFlag = false;
    // this.generalComments = null;
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
    this._singleAccreditationRequestStore.resetData();
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

}


@Component({
  selector: 'assign-task',
  templateUrl: 'assign-task.html',
  styleUrls: ['./accreditation-request.component.css'],
})
export class AssignTask implements OnDestroy {

  Subscription: Subscription = new Subscription();
  checked: boolean = false;

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