import { Component, OnInit, OnDestroy, ViewChild, EventEmitter, Output } from '@angular/core';
import { Subscription, from } from "rxjs";
import { filter, count } from "rxjs/operators";
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
import { SurveysService } from "../../services/surveys.service";
import { Router } from "@angular/router";
import { SmeService } from "../../services/sme.service";
import { AccreditationRequestService } from "../../services/accreditation-request.service";
import { SettingsService } from "../../services/settings.service";
import { Formio } from "formiojs";

@Component({
  selector: 'app-fip-qualification',
  templateUrl: './fip-qualification.component.html',
  styleUrls: ['./fip-qualification.component.css'],
  providers: [],
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
  userQualificationRequest: any = null;
  userQualificationRequestId: any = null;
  justSubmittedId: any = null;
  justSubmittedName: any = null;

      
  @Output() fipComments: any = [];

  constructor(
    private _surveysStore: SurveysStore,
    private _authStore: AuthStore,
    private _smeStore: SmeStore,
    private _router: Router,
    private _surveysService: SurveysService,
    private _fipIntimationsStore: fipIntimationsStore,
    private _smeService: SmeService,
    private _accreditationRequestStore: AccreditationRequestStore,
    private _accreditationRequestService: AccreditationRequestService,
    private _settingsService: SettingsService,
  ) {
  }

  ngOnInit() {
    this.loggedUser = JSON.parse(localStorage.getItem('user'));
    console.log(this.loggedUser.username)
    // this._smeService.getAllSmes().subscribe(
    //   result => {
    //     // console.log("ALL SMES FROM APi:--", result);
    //     let smesArray = [];
    //     if (result['sectionInfos']) {
    //       result['sectionInfos'].forEach(element => {
    //         var object = {
    //           name: element.sectionName,
    //           userRef: element.userName,
    //           formGenerated: element.formGenerated,
    //           key: element.sectionKey,
    //           formIdentity: element.formIdentity,
    //         }
    //         if (object.formIdentity && object.formIdentity != 'eligibilty')
    //           smesArray.push(object);
    //       });
    //       this._smeStore.addAllSmes(smesArray);
    //     }
    //   },
    //   error => { }
    // );
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
    //         console.log("RESULT FROM ALL API REQUESTS:--", result['accreditationInfos']);
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
    //         // this.getRequestsFromApi();
    //         this.setDefaults();
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

    setTimeout(() => {
      this._authStore.setRouteName('FIP-QUALIFICATION');
    });

    this.Subscription.add(
      this._authStore.state$.subscribe(data => {
        this.qualificationFlag = data.auth.qualifiationFlag;
        console.log("QUALIFICATION FLAG:--", data.auth, this.qualificationFlag);
      })
    );

    // this.Subscription.add(
    //   this._smeStore.state$.subscribe(data => {
    //     this.allSmes = data.smes;
    //     console.log("ALL SECTiONS:--", this.allSmes);
    //     // this.groupType = this.allSmes[0].key;
    //     this.allSectionsCount = this.allSmes.length;
    //   })
    // );

    // this.Subscription.add(
    //   this._accreditationRequestStore.state$.subscribe(data => {
    //     var count1 = 0;
    //     var count2 = 0;
    //     this.allRequests = [];
    //     this.allRequests = data.requests;
    //     console.log("ALL REQUESTS IN SUBSCRIBE:--", this.allRequests, data);
    //     if (data.requests.length) {
    //       from(data.requests).pipe(
    //         filter((request: any) =>
    //           request.status === 'pending' &&
    //           request.requestKey === 'qualification' &&
    //           request.userRef === this.loggedUser.username
    //         ),
    //       ).subscribe((request) => {
    //         // this.pendingSectionsCount = this.pendingSectionsCount + 1;
    //         count1 = count1 + 1;
    //         console.log(request);
    //         // this.allRequests.push(request);
    //         // console.log("PENDING REQESTED:---", this.pendingSectionsCount);
    //       }).unsubscribe();
    //       from(data.requests).pipe(
    //         filter((request: any) =>
    //           request.status === 'submit' &&
    //           request.requestKey === 'qualification' &&
    //           request.userRef === this.loggedUser.username
    //         ),
    //       ).subscribe((request) => {
    //         // this.submitSectionsCount = this.submitSectionsCount + 1;
    //         count2 = count2 + 1;
    //         console.log(request);
    //       }).unsubscribe();
    //       this.pendingSectionsCount = count1;
    //       this.submitSectionsCount = count2;
    //       console.log("SUBMITTED REQESTED:---", this.submitSectionsCount, this.pendingSectionsCount);
    //     }
    //   })

    // );


    this.Subscription.add(
      this._fipIntimationsStore.state$.subscribe(data => {
        // this.allInitimations['intimations'] = data.intimations;
        // const result = _.filter(data.intimations, { intimation_status: 'pending', userRef: this.loggedUser.email });
        this.allInitimations['intimations'] = data.intimations;
        console.log("ALL INTIMATIONS FROM USER:--", this.allInitimations);
      })
    );

    // shareStoreReplay.subscribe((c) => {
    //   this.currentIntimation = c;
    // })

    this.loadingApi = true;
    if (this.qualificationFlag === 'Not Initiated') {
      this._settingsService.getAccrediattionCommence().subscribe(
        (result: any) => {
          console.log("RESULT FROM ELIGIBILITY TEMPLATES:--", result);
          // this.allSections = result.sections;
          // this.allSmes = result.sections.map((c) => {
          //   return {
          //     ...c,
          //     template: JSON.parse(c.template)
          //   }
          // })
          // this.groupType = this.allSmes[0];
          // this.form = this.allSmes[0].template;
          // this.allSectionsCount = this.allSmes.length;
          // this.loadingApi = false;
          this.getCommenceFromApi(result.id);
        },
        error => {
          this.loadingApi = false;
          console.log("ERROR FROM ELIGIBILITY TEMPLATES:--", error);
        }
      );
    } else {
      this.getQualificationRequest(null);
    }


  }

  ngAfterViewInit() {
    // console.log("FIP QUALIFICATION STARTED:---", this.loggedUser)
    if (this.loggedUser.eligibileFlag === 'Not Initiated' || this.loggedUser.eligibileFlag === 'Under Review') {
      this._router.navigate(['fip-home']);
    }

  }

  // ngAfterContentInit() {

  //   this.groupType = this.allSmes[0];
  //   this.form = this.allSmes[0].template;
  //   if (this.groupType.data !== null) {
  //     this.form.exists = true;
  //     this.secondForm = this.allSmes[0].data;
  //   } else {
  //     this.form.exists = false;
  //     this.secondForm = null;
  //   }
  //   console.log("RESULT FROM WITHOUT COMMECNCE:---", this.secondForm, this.form, this.groupType);
  // }

  // ngAfterContentChecked() {
  //   this.groupType = this.allSmes[0];
  //   this.form = this.allSmes[0].template;
  //   if (this.groupType.data !== null) {
  //     this.form.exists = true;
  //     this.secondForm = this.allSmes[0].data;
  //   } else {
  //     this.form.exists = false;
  //     this.secondForm = null;
  //   }
  //   console.log("RESULT FROM WITHOUT COMMECNCE:---", this.secondForm, this.form, this.groupType);

  // }

  getCommenceFromApi(commenceId) {
    this.userQualificationRequestId = commenceId;
    let user = JSON.parse(localStorage.getItem('user'));
    console.log("USER TO SET QUALIFICATION FLAG:--", user);
    user.qualificationFlag = 'Draft';
    localStorage.setItem('user', JSON.stringify(user));
    this._authStore.setQualificationFlag(user.qualificationFlag);
    this._accreditationRequestService.getSingleQualificationRequest(commenceId).subscribe(
      (result: any) => {
        // this.loadingApi = false;
        this.allSections = result.sections;
        let allInitimations = [];
        var count1 = 0;
        var count2 = 0;
        this.allSmes = result.sections.map((c) => {
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
        this.userQualificationRequest = result;
        if (result) {
          this._accreditationRequestService.getSingleQualificationRequest(result[0].id).subscribe(
            (result: any) => {
              this.allSections = result;
              let allInitimations = [];
              var count1 = 0;
              var count2 = 0;
              this.allSmes = result.sections.map((c) => {
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
              setCommentValue(null, null, [this.allSections.reassignmentTask.comments]);
              this._fipIntimationsStore.addIntimations(allInitimations);
              this.loadingApi = false;
              console.log("RESULT FROM ALL API REQUESTS:--", result, '\n', this.pendingSectionsCount, this.allSectionsCount, this.submitSectionsCount);
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
    // if (this.groupType == null) {
    //   this.secondForm = null;
    //   this.groupType = this.allSmes[0].key;
    //   var resultForm = _.find(this.allProfiles, { 'smeRef': this.groupType });
    //   var request = _.find(this.allRequests, { 'formIdentity': this.groupType, 'userRef': this.loggedUser.username });
    //   this.form = resultForm;
    //   if (request) {
    //     const flag = _.find(this.allInitimations.intimations, { userRef: this.loggedUser.email, formIdentity: this.groupType })
    //     if (flag) {
    //       setCommentValue(flag.endDate, flag.formIdentity, flag.comments);
    //     } else {
    //       setCommentValue('', '', []);
    //     }
    //     this.secondForm = request.formSubmitData;
    //     if (!request.userUpdateFlag) {
    //       this.form.exists = true;
    //     } else {
    //       this.form.exists = false;
    //     }
    //   } else {
    //     this.form.exists = false;
    //   }
    // } else {
    // this.secondForm = null;
    // var resultForm = _.find(this.allProfiles, { 'smeRef': this.groupType });
    // var request = _.find(this.allRequests, { 'formIdentity': this.groupType, 'userRef': this.loggedUser.username });
    // this.form = resultForm;
    // if (request) {
    //   const flag = _.find(this.allInitimations.intimations, { userRef: this.loggedUser.email, formIdentity: this.groupType })
    //   if (flag) {
    //     setCommentValue(flag.endDate, flag.formIdentity, flag.comments);
    //   } else {
    //     setCommentValue('', '', []);
    //   }
    //   this.secondForm = request.formSubmitData;
    //   if (!request.userUpdateFlag) {
    //     this.form.exists = true;
    //   } else {
    //     this.form.exists = false;
    //   }
    // } else {
    //   this.form.exists = false;
    // }
    // }
    console.log(this.groupType);
    // this.justSubmittedName = null;
    // this.justSubmittedId = null;
    this.justSubmittedId = this.groupType ? this.groupType.id : null;
    this.justSubmittedName = this.groupType ? this.groupType.name : null;
    this.form = this.groupType.template;
    // this.secondForm = this.groupType.data;
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

  onSubmit($event) {
    // console.log("FORM AFTER SUBMIT:---", $event.data, $event, this.form.formIdentity);
    this.secondForm = $event.data;
    this.form.exists = true;
    // var flag: any = _.find(this.allRequests, { userRef: this.loggedUser.username, formIdentity: this.groupType })
    // if (!flag) {
    //   var values = {
    //     "currentReview": null,
    //     "endDate": null,
    //     "formData": 'values',
    //     "formIdentity": this.form.formIdentity,
    //     "formSubmitData": this.secondForm,
    //     "prevReview": null,
    //     "ratings": 0,
    //     "requestKey": 'qualification',
    //     "sectionKey": this.groupType,
    //     "startDate": null,
    //     "status": 'pending',
    //     "userName": this.loggedUser.username,
    //     "userUpdateFlag": false
    //   }
    //   console.log("T+REQUEST FOR API:---", values);
    //   this._accreditationRequestService.addAccreditationRequest(values).subscribe(
    //     result => {
    //       this.form.exists = true;
    //       console.log("RESULT AFTER ADDING REQUEST:--", result);
    //       this._accreditationRequestStore.addRequest(
    //         this.loggedUser.email,
    //         $event.data,
    //         this.form,
    //         'pending',
    //         this.groupType,
    //         null,
    //         null,
    //         null,
    //         null,
    //         'qualification',
    //         false,
    //         0
    //       );
    //       this.getRequestsFromApi();
    //     },
    //     error => {
    //       console.log("ERROR AFTER ADDING REQUEST:--", error);
    //     }
    //   );
    // } else {
    //   var object = {
    //     userRef: this.loggedUser.email,
    //     submitData: $event.data,
    //     formIdentity: this.groupType,
    //     userUpdateFlag: false,
    //     endDate: new Date(),
    //   }
    //   console.log('ALREADY SUBMITTED:--', object, this.currentIntimation);
    //   this._accreditationRequestStore.unSetUserUpdateFlag(this.loggedUser.email, this.currentIntimation.formIdentity, $event.data);
    //   this._fipIntimationsStore.updateIntimationStatus(this.loggedUser.email, this.currentIntimation.formIdentity);
    //   setCommentValue(null, null, []);
    //   this.form.exists = true;
    // }

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

    // {
    //   "sections": [
    //     {
    //       "data": "string",
    //       "id": "string"
    //     }
    //   ]
    // }

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

    // this.allSmes.forEach(element => {
    let object = {
      data: JSON.stringify(this.allSmes[0].data),
      id: this.allSmes[0].id
    }

    console.log("OBJECT TO STORE:--", object, this.userQualificationRequest[0].id);
    this._accreditationRequestService.updateQulificationRequest(object, this.userQualificationRequest[0].id).subscribe(
      result => {
        console.log("RESULT AFTER ADDING QUALIFICATION:--", result);
        this.getQualificationRequest(null);
      },
      error => {
        console.log("ERROR AFTER ADDING QUALIFICATION:--", error);
      }
    );
    // tempRequestsArray.push(object);
    // });
    // this.allRequests.forEach(element => {
    //   var object = {
    //     currentReview: element.currentReview,
    //     endDate: element.endDate,
    //     formData: "string",
    //     formSubmitData: JSON.stringify(element.formSubmitData),
    //     prevReview: element.previousReview,
    //     ratings: element.rating,
    //     sectionKey: element.formIdentity,
    //     startDate: element.startDate,
    //     status: "submit",
    //     userName: element.userRef,
    //     userUpdateFlag: element.userUpdateFlag,
    //   }
    //   // console.log(object)
    //   this._accreditationRequestService.updateAccreditationRequest(object).subscribe(
    //     result => {
    //       console.log("RESULT FROM UPDATE ACCREDTITAION:--", result);
    //       this._accreditationRequestStore.submitAllRequests(this.loggedUser.username, object.sectionKey);
    //     },
    //     error => {
    //       console.log("ERROR FROM UPDATE ACCREDTITAION:--", error);
    //     }
    //   );
    //   // tempRequestsArray.push(object);
    // });

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