import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthStore } from "../../stores/auth/auth-store";
import { SurveysStore } from "../../stores/surveys/surveys-store";
import { AccreditationRequestStore } from "../../stores/accreditation-requests/accreditation-requests-store";
import * as _ from 'lodash';
import { Subscription } from "rxjs";
import { UsersStore } from 'src/app/stores/users/users-store';

@Component({
  selector: 'app-eligibility-requests',
  templateUrl: './eligibility-requests.component.html',
  styleUrls: ['./eligibility-requests.component.css']
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
  ) { }

  ngOnInit() {
    setTimeout(() => {
      this._authStore.setRouteName('ACCREDITATION-ELIGIBILITY-REQUESTS');
    })
    this.Subscription.add(
      this._accreditationRequestStore.state$.subscribe((data) => {
        // this.allRequests = _.map(_.groupBy(_.filter(data.requests, { requestKey: 'eligibility' }), 'userRef'), (val, user) => {
        //   return { val: val, user };
        // });
        this.allRequests = _.chain(data.requests)
          .filter({ requestKey: 'eligibility' })
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
    this.Subscription.add(
      this._usersStore.state$.subscribe((data) => {
        // this.allSurveys = data.users;
        console.log("ALL USERS:--", data.users);
      })
    )
    this.Subscription.add(
      this._authStore.state$.subscribe((data) => {
        this.addMobileClasses = data.auth.applyMobileClasses;
        // console.log("ALL USERS:--", data.users);
      })
    )
  }

  getRequest(element) {
    this.selectedRequest = element;
    this.toggle = !this.toggle;
    this.toggleBtn = this._usersStore.findEligibleUser(this.selectedRequest.user);
    var array = this.selectedRequest.val.map((c) => {
      var result = _.find(this.allSurveys, { formIdentity: c.formIdentity })
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
    this._usersStore.updateUserEligibleFlag(true, this.selectedRequest.user);
    this._authStore.setEligibleFlag(true);
    this.toggleBtn = this._usersStore.findEligibleUser(this.selectedRequest.user);
  }

  intimateFip(){}

  ngOnDestroy() {
    this.Subscription.unsubscribe();
  }

}
