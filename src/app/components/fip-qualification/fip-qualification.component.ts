import { Component, OnInit, OnDestroy, ViewChild, EventEmitter } from '@angular/core';
import { Subscription, from } from "rxjs";
import { filter } from "rxjs/operators";
import { SurveysStore } from "../../stores/surveys/surveys-store";
import { AuthStore } from "../../stores/auth/auth-store";
import { SmeStore } from "../../stores/sme/sme-store";
import { AccreditationRequestStore } from "../../stores/accreditation-requests/accreditation-requests-store";
import * as _ from "lodash";
import { fipIntimationsStore } from "../../stores/fip-intimations/fip-intimations-store";
import { fipIntimationsState } from "../../stores/fip-intimations/fip-intimations-state";
import { setCommentValue, shareStoreReplay } from "../../stores/CurrentCommentReplay";
import {
  trigger,
  style,
  animate,
  transition,
  query,
  stagger
} from '@angular/animations';

import { Router } from "@angular/router";


@Component({
  selector: 'app-fip-qualification',
  templateUrl: './fip-qualification.component.html',
  styleUrls: ['./fip-qualification.component.css'],
  animations: [
    trigger('pageAnimations', [
      transition(':enter', [
        query('.hero, form', [
          style({ opacity: 0, transform: 'translateY(-100px)' }),
          stagger(-30, [
            animate('500ms cubic-bezier(0.35, 0, 0.25, 1)', style({ opacity: 1, transform: 'none' }))
          ])
        ])
      ])
    ]),
  ]
})

export class FipQualificationComponent implements OnInit, OnDestroy {

  public Subscription: Subscription = new Subscription();
  public allProfiles: any = [];
  public refreshForm: EventEmitter<any> = new EventEmitter();
  public groupType: any = null;


  public form: any = null;
  public secondForm: any = null;

  public allRequests: any = [];
  public allSmes: any = [];
  public allInitimations: fipIntimationsState = new fipIntimationsState();
  public loggedUser: any = null;

  panelOpenState = false;

  @ViewChild('group') group;

  currentIntimation: any = null;
  submitSectionsCount: number = 0;
  pendingSectionsCount: number = 0;
  allSectionsCount: number = 0;

  constructor(
    private _surveysStore: SurveysStore,
    private _authStore: AuthStore,
    private _smeStore: SmeStore,
    private _router: Router,
    private _fipIntimationsStore: fipIntimationsStore,
    private _accreditationRequestStore: AccreditationRequestStore,
  ) { }

  ngOnInit() {
    this.loggedUser = JSON.parse(localStorage.getItem('user'));

    setTimeout(() => {
      this._authStore.setRouteName('FIP-QUALIFICATION');
    });
    this.Subscription.add(
      this._surveysStore.state$.subscribe(data => {
        this.allProfiles = data.surveys;
      })
    );
    this.Subscription.add(
      this._fipIntimationsStore.state$.subscribe(data => {
        // this.allInitimations['intimations'] = data.intimations;
        const result = _.filter(data.intimations, { intimation_status: 'pending', userRef: this.loggedUser.email });
        this.allInitimations['intimations'] = result;
        console.log("ALL INTIMATIONS FROM USER:--", this.allInitimations.intimations);
      })
    );
    this.Subscription.add(
      this._accreditationRequestStore.state$.subscribe(data => {
        var count1 = 0;
        var count2 = 0;
        this.allRequests = data.requests;
        console.log("ALL REQUESTS:--", this.allRequests);
        from(data.requests).pipe(
          filter((request: any) =>
            request.status === 'pending' &&
            request.requestKey === 'qualification' &&
            request.userRef === this.loggedUser.email
          ),
        ).subscribe((request) => {
          this.pendingSectionsCount = this.pendingSectionsCount + 1;
          count1 = count1 + 1;
          // console.log("PENDING REQESTED:---", this.pendingSectionsCount);
        }).unsubscribe();
        from(data.requests).pipe(
          filter((request: any) =>
          request.status === 'submit' &&
          request.requestKey === 'qualification' &&
          request.userRef === this.loggedUser.email
          ),
          ).subscribe((request) => {
            this.submitSectionsCount = this.submitSectionsCount + 1;
            count2 = count2 + 1;
          }).unsubscribe();
          this.pendingSectionsCount = count1;
          this.submitSectionsCount = count2;
          console.log("SUBMITTED REQESTED:---", this.submitSectionsCount, this.pendingSectionsCount);
      })
    );
    this.Subscription.add(
      this._smeStore.state$.subscribe(data => {
        this.allSmes = data.smes;
        // console.log("ALL REQUESTS:--", this.allRequests);
        this.allSectionsCount = this.allSmes.length;
      })
    );
    shareStoreReplay.subscribe((c) => {
      this.currentIntimation = c;
    })
    this.setDefaults();
  }

  ngAfterViewInit() {
    console.log("FIP QUALIFICATION STARTED:---", this.loggedUser)
    if (!this.loggedUser.eligibileFlag) {
      this._router.navigate(['fip-home']);
    }
  }

  setDefaults() {
    // console.log("SET DEFAULTS CALLED");
    if (this.groupType == null) {
      this.secondForm = null;
      this.groupType = this.allSmes[0].key;
      var resultForm = _.find(this.allProfiles, { 'smeRef': this.allSmes[0].key });
      var request = _.find(this.allRequests, { 'formIdentity': this.allSmes[0].key, 'userRef': this.loggedUser.email });
      this.form = resultForm;
      if (request) {
        // const example = from(this.allInitimations.intimations)
        //   .pipe(
        //     filter(
        //       person => person.userRef === this.loggedUser.email && person.formIdentity === this.groupType
        //     )
        //   );
        const flag = _.find(this.allInitimations.intimations, { userRef: this.loggedUser.email, formIdentity: this.groupType })
        if (flag) {
          console.log("FILTER RESULT FROM PIEPL__:--", flag);
          setCommentValue(flag.endDate, flag.formIdentity, flag.comments);
        } else {
          setCommentValue('', '', []);
        }
        this.secondForm = request.formSubmitData;
        if (!request.userUpdateFlag) {
          this.form.exists = true;
        } else {
          this.form.exists = false;
        }
      } else {
        this.form.exists = false;
      }
    } else {
      this.secondForm = null;
      var resultForm = _.find(this.allProfiles, { 'smeRef': this.groupType });
      var request = _.find(this.allRequests, { 'formIdentity': this.groupType, 'userRef': this.loggedUser.email });
      this.form = resultForm;
      if (request) {
        const flag = _.find(this.allInitimations.intimations, { userRef: this.loggedUser.email, formIdentity: this.groupType })
        if (flag) {
          console.log("FILTER RESULT FROM PIEPL__:--", flag);
          setCommentValue(flag.endDate, flag.formIdentity, flag.comments);
        } else {
          setCommentValue('', '', []);
        }
        this.secondForm = request.formSubmitData;
        if (!request.userUpdateFlag) {
          this.form.exists = true;
        } else {
          this.form.exists = false;
        }
        // this.form.exists = true;
      } else {
        this.form.exists = false;
      }
    }
  }

  onSubmit($event) {
    // console.log("FORM AFTER SUBMIT:---", $event.data, $event, this.form.formIdentity);
    this.secondForm = $event.data;
    var flag: any = _.find(this.allRequests, { userRef: this.loggedUser.email, formIdentity: this.groupType })
    if (!flag) {
      this.form.exists = true;
      this._accreditationRequestStore.addRequest(
        this.loggedUser.email,
        $event.data,
        this.form,
        'pending',
        this.groupType,
        null,
        null,
        null,
        null,
        'qualification',
        false,
        0
      );
    } else {
      var object = {
        userRef: this.loggedUser.email,
        submitData: $event.data,
        formIdentity: this.groupType,
        userUpdateFlag: false,
        endDate: new Date(),
      }
      console.log('ALREADY SUBMITTED:--', object, this.currentIntimation);
      this._accreditationRequestStore.unSetUserUpdateFlag(this.loggedUser.email, this.currentIntimation.formIdentity, $event.data);
      this._fipIntimationsStore.updateIntimationStatus(this.loggedUser.email, this.currentIntimation.formIdentity);
      setCommentValue(null, null, []);
      this.form.exists = true;
    }

  }

  setInitmationSection(item) {
    console.log(item);
    this.groupType = item.formIdentity;
    this.setDefaults();
    setCommentValue(item.endDate, item.formIdentity, item.comments);
  }

  ngOnDestroy() {
    this.Subscription.unsubscribe();
  }

  goBack() {
    this._router.navigate(['fip-home']);
  }

  submitAllSections(){
    this._accreditationRequestStore.submitAllRequests();
  }

  // @HostListener('window:resize', ['$event'])
  // onResize(event) {
  //   // .main-block {
  //   //   width: 50%;
  //   // }

  //   // .intimation-block {
  //   //   width: 20%;
  //   // }
  //   if (event.target.innerWidth < 765) {
  //     // this.navMode = 'over';
  //     // this.sidenav.close();
  //     console.log("LESS THEN 886", event.target.innerWidth)
  //     document.getElementById('get-main-block').style.width = '60%';
  //     document.getElementById('get-intimation-block').style.width = '40%';
  //   }
  //   if (event.target.innerWidth > 886) {
  //     console.log("GREATER 886", event.target.innerWidth)
  //     document.getElementById('get-main-block').style.width = '68%';
  //     document.getElementById('get-intimation-block').style.width = '32%';
  //     //  this.navMode = 'side';
  //     //  this.sidenav.open();
  //   }
  // }

}