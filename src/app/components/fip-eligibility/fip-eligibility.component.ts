import { Component, OnInit, OnDestroy, ViewChild, EventEmitter } from '@angular/core';
import { AccreditationRequestStore } from "../../stores/accreditation-requests/accreditation-requests-store";
import { Subscription } from "rxjs";
import { SurveysStore } from "../../stores/surveys/surveys-store";
import { AuthStore } from "../../stores/auth/auth-store";
import * as _ from "lodash";

declare var $: any;

@Component({
  selector: 'app-fip-eligibility',
  templateUrl: './fip-eligibility.component.html',
  styleUrls: ['./fip-eligibility.component.css']
})
export class FipEligibilityComponent implements OnInit, OnDestroy {

  public Subscription: Subscription = new Subscription();
  public allProfiles: any = [];
  public allRequests: any = [];
  public refreshForm: EventEmitter<any> = new EventEmitter();
  public groupType: any = 'eligibility-registartion';


  public form: any = null;
  public secondForm: any = null;
  public loggedUser: any = null;
  public readOnly: boolean = false;

  @ViewChild('group') group;

  constructor(
    private _surveysStore: SurveysStore,
    private _authStore: AuthStore,
    private _accreditationRequestStore: AccreditationRequestStore,
  ) { }

  ngOnInit() {
    setTimeout(() => {
      this._authStore.setRouteName('FIP-ELIGIBILITY');
    })
    this.Subscription.add(
      this._surveysStore.state$.subscribe(data => {
        this.allProfiles = data.surveys;
      })
    );
    this.Subscription.add(
      this._accreditationRequestStore.state$.subscribe(data => {
        this.allRequests = data.requests;
      })
    );
    this.setDefaults();
  }

  setDefaults() {
    var resultForm = _.find(this.allProfiles, { 'formIdentity': this.groupType })
    this.loggedUser = JSON.parse(localStorage.getItem('user'));
    this.form = resultForm;
    this.secondForm = null;
    var request = _.find(this.allRequests, { 'formIdentity': this.form.formIdentity, 'userRef': this.loggedUser.email })
    if (request) {
      this.secondForm = request.formSubmitData;
      this.form.exists = true;
    } else {
      this.form.exists = false;
    }
  }

  onValChange() {
    this.setDefaults()
  }

  onSubmit($event) {
    this.secondForm = $event.data;
    var flag: any = _.find(this.allRequests, { userRef: this.loggedUser.email, formIdentity: this.form.formIdentity })
    if (!flag) {
      console.log('NEW SUBMITTED:--', $event.data);
      this.form.exists = true;
      this._accreditationRequestStore.addRequest(
        this.loggedUser.email,
        $event.data,
        {},
        'pending',
        this.form.formIdentity,
        null,
        null,
        null,
        null,
        'eligibility',
        false,
        0
      );
    } else {
      console.log('ALREADY SUBMITTED:--');
    }
  }

  ngOnDestroy() {
    this.Subscription.unsubscribe();
  }

}
