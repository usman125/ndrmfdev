import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { AuthStore } from "../../stores/auth/auth-store";
import { SurveysStore } from "../../stores/surveys/surveys-store";
import { AccreditationRequestStore } from "../../stores/accreditation-requests/accreditation-requests-store";
import * as _ from 'lodash';
import { Subscription } from "rxjs";
import { UsersStore } from 'src/app/stores/users/users-store';
import { AccreditationRequestService } from "../../services/accreditation-request.service";
import { SurveysService } from "../../services/surveys.service";
import { UserService } from "../../services/user.service";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
// import {  } from "@angular/material/sort";

@Component({
  selector: 'app-eligibility-requests',
  templateUrl: './eligibility-requests.component.html',
  styleUrls: ['./eligibility-requests.component.css'],
  providers: [SurveysService, AccreditationRequestService]
})
export class EligibilityRequestsComponent implements OnInit, OnDestroy {

  public allRequests: any = [];
  public allSurveys: any = [];
  public Subscription: Subscription = new Subscription();
  public displayedColumns = ['user', 'status', 'actions'];
  public dataSource: any = [];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  // @ViewChild(MatSort, { static: true }) sort: MatSort;
  public toggle: boolean = false;
  public selectedRequest: any = null;

  public selectedRequestItems: any = [];

  toggleBtn: boolean = false;
  addMobileClasses: boolean = false;
  loadingApi: boolean = false;

  options: Object = {
    submitMessage: "",
    disableAlerts: true,
    noAlerts: true
  }

  // values: any = { "CO1984CA2017": true, "SRA1860": false, "VSWOO1961": true, "TA1882": false, "EADGOP": false, "BTUN": false, "submit": true, "CO1984CA2017-status": "active", "VSWOO1961-status": "inactive" };

  constructor(
    private _authStore: AuthStore,
    private _surveysStore: SurveysStore,
    private _usersStore: UsersStore,
    private _accreditationRequestStore: AccreditationRequestStore,
    private _accreditationRequestService: AccreditationRequestService,
    private _surveysService: SurveysService,
    private _userService: UserService,
  ) { }

  ngOnInit() {
    setTimeout(() => {
      this._authStore.setRouteName('ACCREDITATION-ELIGIBILITY-REQUESTS');
    });
    this.getEligibilityRequest();
    this.Subscription.add(
      this._authStore.state$.subscribe((data) => {
        this.addMobileClasses = data.auth.applyMobileClasses;
        // console.log("ALL USERS:--", data.users);
      })
    );

    // this._surveysService.getAllSurveys().subscribe(
    //   result => {
    //     let surveysArray = []
    //     // console.log("ALL SURVEYS FROM API:--", result['formInfoList']);
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
    //         // console.log("RESULT FROM ALL API REQUESTS:--", result['accreditationInfos']);
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
    //         this._userService.getAllUsers().subscribe(
    //           result => {
    //             this._authStore.removeLoading();
    //             let usersArray = [];
    //             if (result['userInfoList']) {
    //               for (let i = 0; i < result['userInfoList'].length; i++) {
    //                 var object = {
    //                   name: result['userInfoList'][i].firstName,
    //                   email: result['userInfoList'][i].email,
    //                   role: result['userInfoList'][i].typeName,
    //                   smeRef: result['userInfoList'][i].roleName,
    //                   department: null,
    //                   username: result['userInfoList'][i].username,
    //                   password: null,
    //                   active: result['userInfoList'][i].active,
    //                   eligibileFlag: result['userInfoList'][i].eligible,
    //                   qualificationFlag: result['userInfoList'][i].qualified,
    //                 }
    //                 if (result['userInfoList'][i].typeName === 'ndrmf') {
    //                   if (result['userInfoList'][i].roleNames) {
    //                     object.role = result['userInfoList'][i].roleNames[0];
    //                   }
    //                 }
    //                 usersArray.push(object);
    //               }
    //               this._usersStore.setAllUsers(usersArray);
    //             }
    //             this.Subscription.add(
    //               this._usersStore.state$.subscribe((data) => {
    //                 // this.allSurveys = data.users;
    //                 console.log("ALL USERS:--", data.users);
    //               })
    //             )
    //           },
    //           error => {
    //             this._authStore.removeLoading();
    //             console.log("ERROR FROM ALL USERS:--", error);
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
    //   this._accreditationRequestStore.state$.subscribe((data) => {
    //     this.allRequests = _.chain(data.requests)
    //       .filter({ requestKey: 'eligibilty' })
    //       .groupBy('userRef')
    //       .map((val, user) => {
    //         return { val, user }
    //       })
    //       .value();
    //     this.dataSource = this.allRequests;
    //   })
    // );
    // this.Subscription.add(
    //   this._surveysStore.state$.subscribe((data) => {
    //     this.allSurveys = data.surveys;
    //   })
    // );



    // this.Subscription.add(
    //   this._usersStore.state$.subscribe((data) => {
    //     // this.allSurveys = data.users;
    //     console.log("ALL USERS:--", data.users);
    //   })
    // )

  }

  getEligibilityRequest() {
    this.loadingApi = true;
    this._accreditationRequestService.getEligibilityRequest().subscribe(
      (result: any) => {
        this.loadingApi = false;
        console.log("RESULT AFTER GEETING ELIGIBILITY REQUESTS:---", result);
        this.allRequests = result;
        this.dataSource = new MatTableDataSource(this.allRequests);
        this.dataSource.paginator = this.paginator;
      },
      error => {
        this.loadingApi = false;
        console.log("ERROR GEETING ELIGIBILITY REQUESTS:---", error);
      }
    );

  }

  getRequest(element) {
    this.selectedRequest = element;
    this.toggle = !this.toggle;
    this.toggleBtn = this._usersStore.findEligibleUser(this.selectedRequest.user);
    this.loadingApi = true;
    this._accreditationRequestService.getSingleEligibilityRequest(element.id).subscribe(
      (result: any) => {
        // this.selectedRequestItems = result;
        var object = {
          data: JSON.parse(result.data),
          initiatedBy: result.initiatedBy,
          processOwner: result.processOwner,
          status: result.status,
          submittedAt: result.submittedAt,
          template: JSON.parse(result.template),
        }
        this.selectedRequestItems = object;

        console.log("RESULT SINGLE ELIGIBILITY REQUEST:---", this.selectedRequestItems);
        if (this.selectedRequestItems.status == "Approved") {
          this.toggleBtn = true;
        }
        this.loadingApi = false;
      },
      error => {
        this.loadingApi = false;
        console.log("ERROR SINGLE ELIGIBILITY REQUEST:---", error);
      }
    );
    // console.log("THIS>TOGGLEBUTTON:--", this.toggleBtn);
    // var array = this.selectedRequest.val.map((c) => {
    //   var result = _.find(this.allSurveys, { smeRef: c.formIdentity })
    //   if (result) {
    //     return { ...c, formData: result }
    //   } else {
    //     return { ...c, formData: {} }
    //   }
    // })
    // this.selectedRequestItems = array;
  }

  hideRequest() {
    this.toggle = !this.toggle;
  }

  applyFilter(event: Event) {
    console.log("APPLY FIKTER:--", event);
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  markEligibleFlag() {
    console.log("MARK ELIGIBLE CALLED:--", this.selectedRequest);
    this._userService.updateEligibleStatus(this.selectedRequest.id).subscribe(
      result => {
        console.log("RESULR FROM MARKING ELIGIBLE:--", result);
        this.selectedRequest.status = "Approved";
        // this._usersStore.updateUserEligibleFlag('Approved', this.selectedRequestItems.initiatedBy.id);
        // this._authStore.setEligibleFlag('Approved');
        // this.toggleBtn = this._usersStore.findEligibleUser(this.selectedRequest.user);
        this.toggleBtn = true;
      },
      error => {
        console.log("ERROR FROM MARKING ELIGIBLE:--", error);
      }
    );
  }

  intimateFip() { }

  ngOnDestroy() {
    this.Subscription.unsubscribe();
  }

}
