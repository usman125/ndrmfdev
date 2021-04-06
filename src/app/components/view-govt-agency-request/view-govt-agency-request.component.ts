import { Component, OnDestroy, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AccreditationRequestReplayStore } from 'src/app/stores/accreditation-requests/AccreditationRequestReplayStore';
import { AccreditationRequestStore } from 'src/app/stores/accreditation-requests/accreditation-requests-store';
import { AccreditationRequestService } from 'src/app/services/accreditation-request.service';
import { UserService } from 'src/app/services/user.service';
import { ConfirmModelService } from 'src/app/services/confirm-model.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-view-govt-agency-request',
  templateUrl: './view-govt-agency-request.component.html',
  styleUrls: ['./view-govt-agency-request.component.css'],
  providers: [ConfirmModelService]
})
export class ViewGovtAgencyRequestComponent implements OnInit, OnDestroy {

  selectedRequesttemplate: any = null;
  userThematicAreas: any = null;
  apiLoading: boolean = false;
  selectedRequest: any = null;

  hasThematicAreas: boolean = false;
  loadingApi: boolean = false;
  Subscritpion: Subscription = new Subscription();

  constructor(
    private _settingsService: SettingsService,
    private _accreditationRequestStore: AccreditationRequestStore,
    private _accreditationRequestService: AccreditationRequestService,
    private _activatedRoute: ActivatedRoute,
    private _userService: UserService,
    private _confirmModelService: ConfirmModelService,
    private _accreditationRequestReplayStore: AccreditationRequestReplayStore,
    private _router: Router,
  ) { }

  ngOnInit(): void {

    this.Subscritpion.add(
      this._accreditationRequestReplayStore.state$.subscribe(result => {
        // console.log("DATA IN VIREW ACCREDIT REPLAY:---", result);
        this.userThematicAreas = null;
        this.selectedRequest = result.data;
        if (this.selectedRequest.forUser !== null) {
          this.selectedRequest.template = this.selectedRequesttemplate;
          this._userService.getThemticAreasByUserId(this.selectedRequest.forUser.id).subscribe(
            (result: any) => {
              // console.log("User all thematic areas", result);
              if (result.length) {
                this.userThematicAreas = result;
                this.hasThematicAreas = true;
                this.apiLoading = false;
              } else {
                this.hasThematicAreas = false;
                this.openThematicModel();
              }
            },
            error => {
              console.log("User all thematoc areas", error);
            }
          );
        }
      })
    )


    // this._activatedRoute.paramMap.subscribe(params => {
    //   this.selectedRequestId = params.get("requestId");
    //   console.log("SELECTED REQUEST ID:---", this.selectedRequestId);
    this.getProcessTemplate();
    // });
  }

  getProcessTemplate() {
    this._settingsService.getProcessTemplate('ACCREDITATION_QUESTIONNAIRE').subscribe(
      (result: any) => {
        // console.log("RESULT AFTER GETTING TEMPLATE:---", result);
        this.selectedRequesttemplate = JSON.parse(result.sections[0].template);
      },
      error => {
        console.log("ERROR GETTING TEMPLATE:---", error);
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
            // this._router.navigate(['fip-home']);
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
            this._userService.saveThemticAreasByPo(
              object,
              "eligibility",
              this.selectedRequest.forUser.id
            ).subscribe(result => {
              // console.log("RESULT SAVING THEMATIC AREAS:--", result);
              this.userThematicAreas = confirmed.areas;
              this.hasThematicAreas = true;
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
                  // this.apiLoading = true;
                  // this.getEligibilityRequest();
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
            // this._router.navigate(['fip-home']);
          }
        });
        console.log("ERROR THEMATIC AREAS:--", error);
      }
    );
  }

  onSubmit($event) {
    var object = {
      data: JSON.stringify($event.data),
      template: JSON.stringify(this.selectedRequesttemplate),
    }
    // console.log("FORM SUBMITTED:--", object);
    this._accreditationRequestService.submitPendingAccreditation(
      this.selectedRequest.id,
      object
    ).subscribe(
      (result: any) => {
        // console.log("RESULT AFTER SUBMITTING REQUEST:--", result);
        this._accreditationRequestStore.changePendingStatus(false, this.selectedRequest.id, $event.data);
        // var clearObject = {
        //   id: null,
        //   assignee: null,
        //   forUser: null,
        //   assigned: null,
        //   pending: null,
        //   status: null,
        //   data: null,
        //   isJv: null,
        //   jvUser: null,
        // }
        this._accreditationRequestReplayStore.changePendingStatus($event.data);
      },
      error => {
        console.log("RESULT AFTER SUBMITTING REQUEST:--", error);
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

  saveQualificationPrefrences() {
    this.loadingApi = true;
    let object = {
      areas: [],
      availableAsJv: this.selectedRequest.isJv,
      jvUser: this.selectedRequest.jvUser
    }
    this._userService.saveThemticAreasByPo(object,
      'qualification',
      this.selectedRequest.forUser.id).subscribe(
        result => {
          console.log("RESULT SAVING THEMATIC AREAS:--", result);
          const options = {
            title: 'Qualification is saved with provided prefrences!',
            cancelText: 'CANCEL',
            confirmText: 'OK',
            add: true,
            confirm: false,
          };
          this._accreditationRequestReplayStore.saveQualificationPrefrences(
            this.selectedRequest.isJv,
            this.selectedRequest.jvUser
          );
          this._accreditationRequestStore.saveJvPreferences(
            this.selectedRequest.id,
            this.selectedRequest.isJv,
            this.selectedRequest.jvUser
          );
          this._confirmModelService.open(options);
          this._confirmModelService.confirmed().subscribe(
            confirmed => {
              console.log("CONFIRMED AFTER SAVING:--", confirmed);
              this.loadingApi = false;
              // this.startQualificationProcess();
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
              // this.openThematicModel();
            }
          );
        }
      );
  }

  ngOnDestroy() {
    var clearObject = {
      id: null,
      assignee: null,
      forUser: null,
      assigned: null,
      pending: null,
      status: null,
      data: null,
      isJv: null,
      jvUser: null,
    }
    this._accreditationRequestReplayStore.addRequests(clearObject);
    // this.selectedRequest = null;
    // this.userThematicAreas = null;
    // this.userThematicAreas = false;
    this.Subscritpion.unsubscribe();
  }

}
