import { Component, OnInit, OnDestroy, ViewChild, EventEmitter, Output, HostListener } from '@angular/core';
import { Subscription, from } from "rxjs";
import { AuthStore } from "../../stores/auth/auth-store";
import * as _ from "lodash";
import { fipIntimationsStore } from "../../stores/fip-intimations/fip-intimations-store";
import { fipIntimationsState } from "../../stores/fip-intimations/fip-intimations-state";
import { setCommentValue } from "../../stores/CurrentCommentReplay";
import {
  trigger,
  style,
  animate,
  transition,
  query,
  stagger
} from '@angular/animations';
import { Router } from "@angular/router";
import { AccreditationRequestService } from "../../services/accreditation-request.service";
import { SettingsService } from "../../services/settings.service";
import { ConfirmModelService } from 'src/app/services/confirm-model.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-fip-qualification',
  templateUrl: './fip-qualification.component.html',
  styleUrls: ['./fip-qualification.component.css'],
  providers: [ConfirmModelService],
  animations: [
    trigger('pageAnimations', [
      transition(':enter', [
        query('.btn-row, form', [
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
  public allSections: any = [];
  public refreshForm: EventEmitter<any> = new EventEmitter();
  public groupType: any = null;


  public form: any = null;
  public secondForm: any = null;

  public allRequests: any = [];
  public allSmes: any = [];
  public allInitimations: fipIntimationsState = new fipIntimationsState();
  public loggedUser: any = null;
  public loadingApi: boolean = false;

  panelOpenState = false;

  @ViewChild('group') group;

  currentIntimation: any = null;
  submitSectionsCount: number = 0;
  pendingSectionsCount: number = 0;
  allSectionsCount: number = 0;

  qualificationFlag: any = null;
  eligibleFlag: any = null;
  userQualificationRequest: any = null;
  userQualificationRequestId: any = null;
  justSubmittedId: any = null;
  justSubmittedName: any = null;

  accredited: any = false;
  canInitiate: any = false;
  orgName: any = null;
  userThematicAreas: any = null;



  @Output() fipComments: any = [];

  constructor(
    private _authStore: AuthStore,
    private _router: Router,
    private _fipIntimationsStore: fipIntimationsStore,
    private _accreditationRequestService: AccreditationRequestService,
    private _settingsService: SettingsService,
    private _userService: UserService,
    private _confirmModelService: ConfirmModelService,
  ) {
  }

  ngOnInit() {
    this.loggedUser = JSON.parse(localStorage.getItem('user'));
    this.Subscription.add(
      this._authStore.state$.subscribe(data => {
        this.qualificationFlag = data.auth.qualifiationFlag;
        this.eligibleFlag = data.auth.eligibaleFlag;
        this.accredited = data.auth.accredited;
        this.canInitiate = data.auth.canInitiate;
        this.orgName = data.auth.orgName;
        console.log("QUALIFICATION FLAG:--", data.auth, this.qualificationFlag, this.eligibleFlag);
      })
    );
    if (this.orgName === 'govt') {
      this._router.navigate(['fip-home']);
    } else {
      setTimeout(() => {
        this._authStore.setRouteName('FIP-QUALIFICATION');
      });
      this.Subscription.add(
        this._fipIntimationsStore.state$.subscribe(data => {
          this.allInitimations['intimations'] = data.intimations;
          console.log("ALL INTIMATIONS FROM USER:--", this.allInitimations);
        })
      );
      if (this.qualificationFlag === 'Not Initiated' && this.eligibleFlag === 'Approved') {
        this.openThematicModel();
        // this.loadingApi = true;
        // this._settingsService.getAccrediattionCommence().subscribe(
        //   (result: any) => {
        //     console.log("RESULT FROM ELIGIBILITY TEMPLATES:--", result);
        //     this.getCommenceFromApi(result.id);
        //   },
        //   error => {
        //     this.loadingApi = false;
        //     console.log("ERROR FROM ELIGIBILITY TEMPLATES:--", error);
        //   }
        // );
      } else {
        this.getQualificationRequest(null);
        // this.openThematicModel();
      }
    }
  }

  ngAfterViewInit() {
    // console.log("FIP QUALIFICATION STARTED:---", this.loggedUser)
    if (this.orgName === 'fip') {
      if (this.loggedUser.eligibileFlag === 'Not Initiated' ||
        this.loggedUser.eligibileFlag === 'Under Review' ||
        this.loggedUser.eligibileFlag === 'Rejected') {
        this._router.navigate(['fip-home']);
      }
    }
  }

  getCommenceFromApi(commenceId) {
    this.userQualificationRequestId = commenceId;
    let user = JSON.parse(localStorage.getItem('user'));
    user.qualificationFlag = 'Draft';
    localStorage.setItem('user', JSON.stringify(user));
    this._authStore.setQualificationFlag(user.qualificationFlag);
    this._accreditationRequestService.getSingleQualificationRequest(commenceId).subscribe(
      (result: any) => {
        console.log("USER TO SET QUALIFICATION FLAG:--", user, result);
        // this.loadingApi = false;
        // this.allSections = result.sections;
        this.allSections = result.qualItem.sections;
        // result = result.
        let dummyResult = result.qualItem;
        dummyResult.eligibility = result.eligItem[0];
        let allInitimations = [];
        var count1 = 0;
        var count2 = 0;
        this.allSmes = dummyResult.sections.map((c) => {
          if (c.data === null) {
            count1 = count1 + 1;
          } else {
            count2 = count2 + 1;
          }
          if (c.reassignmentStatus === 'Pending' && c.data !== null) {
            allInitimations.push(c);
          }
          return {
            ...c,
            template: JSON.parse(c.template),
            data: c.data === null ? c.data : JSON.parse(c.data)
          }
        })
        this.pendingSectionsCount = count1;
        this.submitSectionsCount = count2;
        this.allSectionsCount = this.allSmes.length;
        this._fipIntimationsStore.addIntimations(allInitimations);
        this.loadingApi = false;
        console.log("RESULT FROM ALL API REQUESTS:--", result, '\n', this.pendingSectionsCount, this.allSectionsCount, this.submitSectionsCount);
      },
      error => {
        this.loadingApi = false;
        console.log("ERROR FROM ONE REQUEST:---", error);
      }
    );
  }

  getQualificationRequest(groupType) {
    // this.groupType = groupType;
    this.justSubmittedId = this.groupType ? this.groupType.id : null;
    this.justSubmittedName = this.groupType ? this.groupType.name : null;
    console.log("SELECTED SECTION TOP BTNSS:---\n", this.groupType,
      "\nJUST SUMITTED NAME:--\n", this.justSubmittedName,
      "\nJUST SUMITTED NAME:--\n", this.justSubmittedName
    );
    this.loadingApi = true;
    this._accreditationRequestService.getQulificationRequests().subscribe(
      (result: any) => {
        console.log("GET QUALIFICATION REQUESTS:--", result);
        this.userQualificationRequest = result;
        if (result && result.length) {
          this._accreditationRequestService.getSingleQualificationRequest(result[0].id).subscribe(
            (result: any) => {
              // this.allSections = result.qualItem.sections;
              // result = result.
              let dummyResult = result.qualItem;
              dummyResult.eligibility = result.eligItem[0];
              this.allSections = dummyResult;
              console.log("GET QUALIFICATION REQUESTS WITH ID:--", result, dummyResult);
              let allInitimations = [];
              var count1 = 0;
              var count2 = 0;
              // this.allSmes = result.sections.map((c) => {
              this.allSmes = dummyResult.sections.map((c) => {
                if (c.data === null) {
                  count1 = count1 + 1;
                } else {
                  count2 = count2 + 1;
                }
                if (c.reassignmentStatus === 'Pending' && c.data !== null) {
                  allInitimations.push(c);
                }
                return {
                  ...c,
                  template: JSON.parse(c.template),
                  data: c.data === null ? c.data : JSON.parse(c.data)
                }
              })
              this.pendingSectionsCount = count1;
              this.submitSectionsCount = count2;
              this.allSectionsCount = this.allSmes.length;
              this.fipComments = this.allSections.reassignmentTask;
              if (this.allSections.reassignmentTask) {
                setCommentValue(null, null, [this.allSections.reassignmentTask.comments]);
              }
              this._fipIntimationsStore.addIntimations(allInitimations);
              this.loadingApi = false;
              console.log(
                "RESULT FROM ALL API REQUESTS:--\n", result,
                '\nPENDING SECTION COUNT:--', this.pendingSectionsCount,
                '\nALL SECTIONS COUNT:--', this.allSectionsCount,
                '\nSUBMIT SECTIONS COUNT:--', this.submitSectionsCount
              );
            },
            error => {
              this.loadingApi = false;
              console.log("ERROR FROM WITHOUT COMMENCE REQUEST:---", error);
            }
          );
        }
      },
      error => {
        this.loadingApi = false;
        console.log("ERROR FROM ALL REQUESTS:--", error);
      }
    );
  }

  setDefaults() {
    console.log(this.groupType);
    this.justSubmittedId = this.groupType ? this.groupType.id : null;
    this.justSubmittedName = this.groupType ? this.groupType.name : null;
    this.form = this.groupType.template;
    if (this.groupType.data !== null) {
      this.form.exists = true;
      this.secondForm = this.groupType.data;
    } else {
      this.form.exists = false;
      this.secondForm = null;
    }

    // Formio.createForm(document.getElementById('formio'), 'https://examples.form.io/example', {
    //   readOnly: true
    // }).then(function (form) {
    //   form.submission = {
    //     data: {
    //       firstName: 'Joe',
    //       lastName: 'Smith',
    //       email: 'joe@example.com'
    //     }
    //   };
    // });
  }

  openThematicModel() {
    const options = {
      title: 'Select Thematic Areas!',
      message: 'Select one or more areas to get Accredit for!',
      cancelText: 'CANCEL',
      confirmText: 'OK',
      add: false,
      confirm: false,
      setStatus: false,
      assignToGm: false,
      disableClose: true,
      selectThematic: true,
      areas: null,
    };
    if (this.accredited === false && this.canInitiate === true) {
      this._settingsService.getAllThematicAreas().subscribe(
        (result: any) => {
          options.areas = result;
          this._confirmModelService.open(options);
          this._confirmModelService.confirmed().subscribe(confirmed => {
            console.log("CONFIRMED FROM MODEL", confirmed);
            if (confirmed === false) {
              this._router.navigate(['fip-home']);
            } else {
              let object = {
                areas: [],
                availableAsJv: null,
              }
              let areasId = [];
              // if(confirmed)
              for (let i = 0; i < confirmed.areas.length; i++) {
                areasId.push(confirmed.areas[i].id);
              }
              object.areas = areasId;
              if (confirmed.applyAsJv === null) {
                object.availableAsJv = false;
              } else {
                object.availableAsJv = confirmed.applyAsJv;
              }
              console.log("SAVE THEMATIC AREA:--", object);
              this._userService.saveThemticAreas(object).subscribe(
                result => {
                  console.log("RESULT SAVING THEMATIC AREAS:--", result);
                  const options = {
                    title: 'Thematic areas defined successfully!',
                    cancelText: 'CANCEL',
                    confirmText: 'OK',
                    add: true,
                    confirm: false,
                  };
                  this._confirmModelService.open(options);
                  this._confirmModelService.confirmed().subscribe(
                    confirmed => {
                      console.log("CONFIRMED AFTER SAVING:--", confirmed);
                      this.loadingApi = true;
                      this._settingsService.getAccrediattionCommence().subscribe(
                        (result: any) => {
                          console.log("RESULT FROM ELIGIBILITY TEMPLATES:--", result);
                          this.getCommenceFromApi(result.id);
                        },
                        error => {
                          this.loadingApi = false;
                          console.log("ERROR FROM ELIGIBILITY TEMPLATES:--", error);
                        }
                      );
                    }
                  );
                },
                error => {
                  console.log("RESULT SAVING THEMATIC AREAS:--", error);
                  const options = {
                    title: 'Thematic areas saved successfully!',
                    cancelText: 'CANCEL',
                    confirmText: 'OK',
                    add: true,
                    confirm: false,
                  };
                  options.title = error.error.message;
                  this._confirmModelService.open(options);
                  this._confirmModelService.confirmed().subscribe(
                    confirmed => {
                      console.log("CONFIRMED AFTER FAILING SAVE:--", confirmed);
                      this.openThematicModel();
                    }
                  );
                }
              )
            }
          });
        },
        error => {
          options.areas = [];
          this._confirmModelService.open(options);
          this._confirmModelService.confirmed().subscribe(confirmed => {
            console.log("CONFIRMED FROM MODEL", confirmed);
            if (confirmed === false) {
              this._router.navigate(['fip-home']);
            }
          });
          console.log("ERROR THEMATIC AREAS:--", error);
        }
      );
    }
  }

  onSubmit($event) {
    // console.log("FORM AFTER SUBMIT:---", $event.data, $event, this.form.formIdentity);
    this.secondForm = $event.data;
    this.form.exists = true;
    let object = {
      data: JSON.stringify($event.data),
      id: this.groupType.id
    }
    this.groupType.reassignmentStatus === 'Pending' ? this.groupType.reassignmentStatus = 'Completed' : this.groupType.reassignmentStatus = null
    // console.log("OBJECT TO STORE:--", object, this.userQualificationRequest[0].id);
    if (this.userQualificationRequestId) {
      this._accreditationRequestService.addQulificationRequest(object, this.userQualificationRequestId).subscribe(
        result => {
          console.log("RESULT AFTER ADDING QUALIFICATION:--", result);
          // this._fipIntimationsStore.filterIntimations(object.id);
          this.getQualificationRequest(null);
        },
        error => {
          console.log("ERROR AFTER ADDING QUALIFICATION:--", error);
        }
      );
    } else {
      this._accreditationRequestService.addQulificationRequest(object, this.userQualificationRequest[0].id).subscribe(
        result => {
          console.log("RESULT AFTER ADDING QUALIFICATION:--", result);
          // this._fipIntimationsStore.filterIntimations(object.id);
          this.getQualificationRequest(null);
        },
        error => {
          console.log("ERROR AFTER ADDING QUALIFICATION:--", error);
        }
      );
    }
  }

  setInitmationSection(item) {
    this.groupType = item;
    if (typeof (this.groupType.template) !== 'object')
      this.groupType.template = JSON.parse(this.groupType.template)
    if (typeof (this.groupType.data) !== 'object')
      this.groupType.data = JSON.parse(this.groupType.data);
    console.log("INITMATION BUTTON CLICK:---", this.groupType);
    this.setDefaults();
    // setCommentValue(item.endDate, item.formIdentity, item.comments);
  }

  ngOnDestroy() {
    this.Subscription.unsubscribe();
  }

  goBack() {
    this._fipIntimationsStore.addIntimations([]);
    this._router.navigate(['fip-home']);
  }

  submitAllSections() {

    const options = {
      title: 'Success!',
      message: 'Accreditation Received, we will review your application.',
      cancelText: 'CANCEL',
      confirmText: 'OK',
      add: true,
      confirm: false,
    };

    // this.allSmes.forEach(element => {
    let object = {
      data: JSON.stringify(this.allSmes[0].data),
      id: this.allSmes[0].id
    }

    console.log("OBJECT TO STORE:--", object, this.userQualificationRequest[0].id);
    this._accreditationRequestService.updateQulificationRequest(object, this.userQualificationRequest[0].id).subscribe(
      result => {
        console.log("RESULT AFTER ADDING QUALIFICATION:--", result);
        this._authStore.setQualificationFlag('Under Review');
        let user = JSON.parse(localStorage.getItem('user'));
        user.qualificationFlag = "Under Review";
        localStorage.setItem('user', JSON.stringify(user));
        this.getQualificationRequest(null);
        this._confirmModelService.open(options);
      },
      error => {
        console.log("ERROR AFTER ADDING QUALIFICATION:--", error);
      }
    );
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