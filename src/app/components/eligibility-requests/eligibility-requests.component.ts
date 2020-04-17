import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthStore } from "../../stores/auth/auth-store";
import { SurveysStore } from "../../stores/surveys/surveys-store";
import { AccreditationRequestStore } from "../../stores/accreditation-requests/accreditation-requests-store";
import * as _ from 'lodash';
import { Subscription } from "rxjs";
import { UsersStore } from 'src/app/stores/users/users-store';
import { AccreditationRequestService } from "../../services/accreditation-request.service";
import { SurveysService } from "../../services/surveys.service";
import { UserService } from "../../services/user.service";

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
  public displayedColumns = ['user', 'actions'];
  public dataSource = [];
  public toggle: boolean = false;
  public selectedRequest: any = null;

  public selectedRequestItems: any = [];

  toggleBtn: boolean = false;
  addMobileClasses: boolean = false;

  options: Object = {
    submitMessage: "",
    disableAlerts: true,
    noAlerts: true
  }

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
    this.Subscription.add(
      this._authStore.state$.subscribe((data) => {
        this.addMobileClasses = data.auth.applyMobileClasses;
        // console.log("ALL USERS:--", data.users);
      })
    );

    this._surveysService.getAllSurveys().subscribe(
      result => {
        let surveysArray = []
        // console.log("ALL SURVEYS FROM API:--", result['formInfoList']);
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
        this._accreditationRequestService.getAllAccreditationRequests().subscribe(
          result => {
            // console.log("RESULT FROM ALL API REQUESTS:--", result['accreditationInfos']);
            let tempRequestsArray = [];
            if (result['accreditationInfos']) {
              result['accreditationInfos'].forEach(element => {
                var object = {
                  userRef: element.userName,
                  formSubmitData: JSON.parse(element.formSubmitData),
                  formData: element.formData,
                  status: element.status,
                  formIdentity: element.sectionKey,
                  startDate: element.startDate,
                  endDate: element.endDate,
                  previousReview: element.prevReview,
                  currentReview: element.currentReview,
                  requestKey: element.requestKey,
                  userUpdateFlag: element.userUpdateFlag,
                  rating: element.ratings,
                }
                tempRequestsArray.push(object);
              })
            }
            this._accreditationRequestStore.addAllRequests(tempRequestsArray);
            this.Subscription.add(
              this._accreditationRequestStore.state$.subscribe((data) => {
                this.allRequests = _.chain(data.requests)
                  .filter({ requestKey: 'eligibilty' })
                  .groupBy('userRef')
                  .map((val, user) => {
                    return { val, user }
                  })
                  .value();
                this.dataSource = this.allRequests;
              })
            )
            this.Subscription.add(
              this._surveysStore.state$.subscribe((data) => {
                this.allSurveys = data.surveys;
              })
            )
          },
          error => {
            console.log("ERROR FROM ALL REQUESTS:--", error);
          }
        );
      },
      error => {
        console.log("ERROR SURVEYS API:--", error);
      }
    );



    // this.Subscription.add(
    //   this._usersStore.state$.subscribe((data) => {
    //     // this.allSurveys = data.users;
    //     console.log("ALL USERS:--", data.users);
    //   })
    // )

  }

  getRequest(element) {
    this.selectedRequest = element;
    this.toggle = !this.toggle;
    this.toggleBtn = this._usersStore.findEligibleUser(this.selectedRequest.user);
    console.log("THIS>TOGGLEBUTTON:--", this.toggleBtn);
    var array = this.selectedRequest.val.map((c) => {
      var result = _.find(this.allSurveys, { smeRef: c.formIdentity })
      if (result) {
        return { ...c, formData: result }
      } else {
        return { ...c, formData: {} }
      }
    })
    this.selectedRequestItems = array;
  }

  hideRequest() {
    this.toggle = !this.toggle;
  }

  markEligibleFlag() {
    console.log("MARK ELIGIBLE CALLED:--", this.selectedRequest.user);
    this._userService.updateEligibleStatus(this.selectedRequest.user).subscribe(
      result => {
        console.log("RESULR FROM MARKING ELIGIBLE:--", result);
        this._usersStore.updateUserEligibleFlag(true, this.selectedRequest.user);
        this._authStore.setEligibleFlag(true);
        this.toggleBtn = this._usersStore.findEligibleUser(this.selectedRequest.user);
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
