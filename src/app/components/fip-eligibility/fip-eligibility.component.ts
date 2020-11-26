import { Component, OnInit, OnDestroy, ViewChild, EventEmitter } from '@angular/core';
import { Subscription } from "rxjs";
import { AuthStore } from "../../stores/auth/auth-store";
import * as _ from "lodash";
declare var $: any;
import { AccreditationRequestService } from "../../services/accreditation-request.service";
import { SettingsService } from "../../services/settings.service";
import { Router } from '@angular/router';
import { ConfirmModelService } from '../../services/confirm-model.service';

@Component({
  selector: 'app-fip-eligibility',
  templateUrl: './fip-eligibility.component.html',
  styleUrls: ['./fip-eligibility.component.css'],
  providers: [ConfirmModelService]
})
export class FipEligibilityComponent implements OnInit, OnDestroy {

  public Subscription: Subscription = new Subscription();
  public allProfiles: any = [];
  public allRequests: any = [];
  public allSections: any = [];
  public refreshForm: EventEmitter<any> = new EventEmitter();
  public groupType: any = null;


  public form: any = null;
  public secondForm: any = null;
  public loggedUser: any = null;
  public readOnly: boolean = false;
  public apiLoading: boolean = false;
  public canInitiate: boolean = false;
  public eligibileFlag: any = null;
  public orgName: any = null;

  @ViewChild('group') group;

  constructor(
    private _accreditationRequestService: AccreditationRequestService,
    private _authStore: AuthStore,
    private _settingsService: SettingsService,
    private _confirmModelService: ConfirmModelService,
    private _router: Router,
  ) { }

  ngOnInit() {
    setTimeout(() => {
      this._authStore.setRouteName('FIP-ELIGIBILITY');
    });
    this.Subscription.add(
      this._authStore.state$.subscribe(data => {
        this.canInitiate = data.auth.canInitiate;
        this.eligibileFlag = data.auth.eligibaleFlag;
        this.orgName = data.auth.orgName;
      })
    );
    if (this.canInitiate === false && this.orgName !== 'fip') {
      this._router.navigate(['fip-home']);
    } else {
      this.getProcessTemplate();
    }
  }

  getProcessTemplate() {
    this.apiLoading = true;
    this._settingsService.getProcessTemplate('ELIGIBILITY').subscribe(
      (result: any) => {
        // console.log("RESULT FROM ELIGIBILITY TEMPLATES:--", result);
        this.allSections = result.sections.map((c) => {
          return {
            ...c,
            template: JSON.parse(c.template)
          }
        })
        this.groupType = this.allSections[0];
        this.form = this.allSections[0].template;
        this.form.exists = false;
        this.getEligibilityRequest();
      },
      error => {
        console.log("ERROR FROM ELIGIBILITY TEMPLATES:--", error);
      }
    );

  }


  getEligibilityRequest() {
    this._accreditationRequestService.getEligibilityRequest().subscribe(
      (result: any) => {
        // console.log("RESULT AFTER GEETING ELIGIBILITY REQUESTS:---", result);
        if (result[0]) {
          this._accreditationRequestService.getSingleEligibilityRequest(result[0].id).subscribe(
            (result: any) => {
              // console.log("RESULT SINGLE ELIGIBILITY REQUEST:---", result);
              if (result) {
                this.form.exists = true;
                this.secondForm = JSON.parse(result.data);
              }
              console.log(this.form, this.secondForm);
              this.apiLoading = false;
            },
            error => {
              this.apiLoading = false;
              console.log("ERROR SINGLE ELIGIBILITY REQUEST:---", error);
            }
          );
        } else {
          this.apiLoading = false;
        }
      },
      error => {
        this.apiLoading = false;
        console.log("ERROR GEETING ELIGIBILITY REQUESTS:---", error);
      }
    );

  }

  onValChange() {
    this.form = this.groupType.template;
  }

  onSubmit($event) {
    const options = {
      title: 'Success!',
      message: 'Eligibility request received, we will review your application.',
      cancelText: 'CANCEL',
      confirmText: 'OK',
      add: true,
      confirm: false,
    };

    this.secondForm = $event.data;
    this.form.exists = true;
    // console.log('NEW SUBMITTED:--', $event.data);
    this._accreditationRequestService.addEligibilityRequest(
      JSON.stringify($event.data),
      JSON.stringify(this.form)
    ).subscribe(
      result => {
        this._confirmModelService.open(options);
        let user = JSON.parse(localStorage.getItem('user'));
        user.eligibileFlag = 'Under Review';
        localStorage.setItem('user', JSON.stringify(user));
        // console.log("RESULT AFTER ADDING ELIGIBLITY:--", result, JSON.parse(localStorage.getItem('user')));
        this._authStore.setEligibleFlag('Under Review');
        this.getEligibilityRequest();
      },
      error => {
        console.log("ERROR AFTER ADDING ELIGIBLITY:--", error);
      }
    );
  }

  ngOnDestroy() {
    this.Subscription.unsubscribe();
  }

}
