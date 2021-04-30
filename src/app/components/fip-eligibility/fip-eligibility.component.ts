import { Component, OnInit, OnDestroy, ViewChild, EventEmitter } from '@angular/core';
import { Subscription } from "rxjs";
import { AuthStore } from "../../stores/auth/auth-store";
import * as _ from "lodash";
declare var $: any;
import { AccreditationRequestService } from "../../services/accreditation-request.service";
import { SettingsService } from "../../services/settings.service";
import { Router } from '@angular/router';
import { ConfirmModelService } from '../../services/confirm-model.service';
import { UserService } from 'src/app/services/user.service';

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
  public selectedRequest: any = null;

  @ViewChild('group') group;

  loadingApi: boolean = false;
  userThematicAreas: any = [];

  constructor(
    private _accreditationRequestService: AccreditationRequestService,
    private _authStore: AuthStore,
    private _settingsService: SettingsService,
    private _userService: UserService,
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
      (allResult: any) => {
        // console.log("RESULT AFTER GEETING ELIGIBILITY REQUESTS:---", allResult);
        if (allResult[0]) {
          this._accreditationRequestService.getSingleEligibilityRequest(allResult[allResult.length - 1].id).subscribe(
            (singleResult: any) => {
              // console.log("RESULT SINGLE ELIGIBILITY REQUEST:---", singleResult);
              this._userService.getUserThemticAreas().subscribe(
                (result: any) => {
                  // console.log("User all thematoc areas", result);
                  this.userThematicAreas = result;
                  if (result.length) {
                    this.selectedRequest = singleResult;
                    this._authStore.setEligibleFlag(singleResult.status);
                    if (singleResult) {
                      this.form.exists = true;
                      this.secondForm = JSON.parse(singleResult.data);
                    }
                    console.log(this.form, this.secondForm);
                    this.apiLoading = false;
                  } else {
                    this.openThematicModel();
                  }
                },
                error => {
                  console.log("User all thematoc areas", error);
                }
              );
            },
            error => {
              this.apiLoading = false;
              console.log("ERROR SINGLE ELIGIBILITY REQUEST:---", error);
            }
          );
        } else {
          this._userService.getUserThemticAreas().subscribe(
            (result: any) => {
              // console.log("User all thematoc areas", result);
              if (result.length) {
                this.userThematicAreas = result;
                this.apiLoading = false;
              } else {
                this.openThematicModel();
              }
            },
            error => {
              console.log("User all thematoc areas", error);
            }
          );
          // this.apiLoading = false;
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
      taSelectionType: 'eligibility',
    };
    this._settingsService.getAllThematicAreas().subscribe(
      (result: any) => {
        options.areas = result;
        this._confirmModelService.open(options);
        this._confirmModelService.confirmed().subscribe(confirmed => {
          // console.log("CONFIRMED FROM MODEL", confirmed);
          if (confirmed === false) {
            this._router.navigate(['fip-home']);
          } else {
            let object = {
              areas: [],
              availableAsJv: null,
              jvUserId: confirmed.jvUserId
            }
            let areasId = [];
            for (let i = 0; i < confirmed.areas.length; i++) {
              let object2 = {
                areaId: confirmed.areas[i].id,
                experience: confirmed.areas[i].experience,
                counterpart: confirmed.areas[i].counterpart,
              }
              areasId.push(object2);
            }
            object.areas = areasId;
            if (confirmed.applyAsJv === null) {
              object.availableAsJv = false;
            } else {
              object.availableAsJv = confirmed.applyAsJv;
            }
            // console.log("SAVE THEMATIC AREA:--", object);
            this._userService.saveThemticAreas(object, "eligibility").subscribe(
              result => {
                // console.log("RESULT SAVING THEMATIC AREAS:--", result);
                const options = {
                  title: 'Preffered thematic areas saved succefully!',
                  cancelText: 'CANCEL',
                  confirmText: 'OK',
                  add: true,
                  confirm: false,
                };
                this._confirmModelService.open(options);
                this._confirmModelService.confirmed().subscribe(
                  confirmed => {
                    // console.log("CONFIRMED AFTER SAVING:--", confirmed);
                    this.loadingApi = true;
                    this.getEligibilityRequest();
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
                    // console.log("CONFIRMED AFTER FAILING SAVE:--", confirmed);
                    this.openThematicModel();
                  }
                );
              }
            );
          }
        });
      },
      error => {
        options.areas = [];
        this._confirmModelService.open(options);
        this._confirmModelService.confirmed().subscribe(confirmed => {
          // console.log("CONFIRMED FROM MODEL", confirmed);
          if (confirmed === false) {
            this._router.navigate(['fip-home']);
          }
        });
        console.log("ERROR THEMATIC AREAS:--", error);
      }
    );
  }

  getThematicAreaExp() {
    let count = 0;
    for (let i = 0; i < this.userThematicAreas.length; i++) {
      let key = this.userThematicAreas[i];
      count = count + key.experience;
    }
    return count;
  }

  ngOnDestroy() {
    this.Subscription.unsubscribe();
  }

}
