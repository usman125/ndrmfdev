import { Component, OnInit, OnDestroy, ViewChild, EventEmitter } from '@angular/core';
import { AccreditationRequestStore } from "../../stores/accreditation-requests/accreditation-requests-store";
import { Subscription } from "rxjs";
import { SurveysStore } from "../../stores/surveys/surveys-store";
import { AuthStore } from "../../stores/auth/auth-store";
import * as _ from "lodash";
import { SmeService } from '../../services/sme.service';
declare var $: any;
import { SmeStore } from "../../stores/sme/sme-store";
import { AccreditationRequestService } from "../../services/accreditation-request.service";
import { SurveysService } from "../../services/surveys.service";
import { SettingsService } from "../../services/settings.service";

@Component({
  selector: 'app-fip-eligibility',
  templateUrl: './fip-eligibility.component.html',
  styleUrls: ['./fip-eligibility.component.css'],
  providers: []
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

  @ViewChild('group') group;

  constructor(
    private _surveysStore: SurveysStore,
    private _accreditationRequestService: AccreditationRequestService,
    private _surveysService: SurveysService,
    private _authStore: AuthStore,
    private _accreditationRequestStore: AccreditationRequestStore,
    private _smeService: SmeService,
    private _smeStore: SmeStore,
    private _settingsService: SettingsService,
  ) { }

  ngOnInit() {
    setTimeout(() => {
      this._authStore.setRouteName('FIP-ELIGIBILITY');
    });
    // this._smeService.getAllSmes().subscribe(
    //   result => {
    //     console.log("ALL SMES FROM APi:--", result);
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

    //         if (element.formIdentity != 'qualification') smesArray.push(object);
    //       });
    //       this._smeStore.addAllSmes(smesArray);

    //       this._surveysService.getAllSurveys().subscribe(
    //         result => {
    //           let surveysArray = []
    //           // console.log("ALL SURVEYS FROM API:--", result['formInfoList']);
    //           if (result['formInfoList']) {
    //             result['formInfoList'].forEach(element => {
    //               var object = {
    //                 name: element.sectionName,
    //                 smeRef: element.sectionKey,
    //                 formIdentity: element.formIdentity,
    //                 passScore: element.passingScore,
    //                 totalScore: element.totalScore,
    //                 display: element.displayType,
    //                 page: element.page,
    //                 numPages: element.numOfPages,
    //                 components: JSON.parse(element.component),
    //               }
    //               surveysArray.push(object)
    //             });
    //             this._surveysStore.addAllForms(surveysArray);
    //           }
    //           this._accreditationRequestService.getAllAccreditationRequests().subscribe(
    //             result => {
    //               // console.log("RESULT FROM ALL API REQUESTS:--", result['accreditationInfos']);
    //               let tempRequestsArray = [];
    //               if (result['accreditationInfos']) {
    //                 result['accreditationInfos'].forEach(element => {
    //                   var object = {
    //                     userRef: element.userName,
    //                     formSubmitData: JSON.parse(element.formSubmitData),
    //                     formData: element.formData,
    //                     status: element.status,
    //                     formIdentity: element.sectionKey,
    //                     startDate: element.startDate,
    //                     endDate: element.endDate,
    //                     previousReview: element.prevReview,
    //                     currentReview: element.currentReview,
    //                     requestKey: element.requestKey,
    //                     userUpdateFlag: element.userUpdateFlag,
    //                     rating: element.ratings,
    //                   }
    //                   tempRequestsArray.push(object);
    //                 })
    //               }
    //               this._accreditationRequestStore.addAllRequests(tempRequestsArray);
    //               this.Subscription.add(
    //                 this._smeStore.state$.subscribe(data => {
    //                   this.allSections = data.smes;
    //                   if (this.allSections)
    //                     this.groupType = this.allSections[0].key;
    //                   console.log("ALL SECTIONS:---", this.allSections);
    //                   // this.groupType = this.allSections[0].key;
    //                 })
    //               );
    //               this.Subscription.add(
    //                 this._surveysStore.state$.subscribe(data => {
    //                   this.allProfiles = data.surveys;
    //                   console.log("ALLSURVEYS:---", this.allProfiles)
    //                 })
    //               );
    //               this.Subscription.add(
    //                 this._accreditationRequestStore.state$.subscribe(data => {
    //                   this.allRequests = data.requests;
    //                   console.log("ALLPROFILES:---", this.allRequests)
    //                 })
    //               );
    //               this.setDefaults();
    //             },
    //             error => {
    //               console.log("ERROR FROM ALL REQUESTS:--", error);
    //             }
    //           );
    //         },
    //         error => {
    //           console.log("ERROR SURVEYS API:--", error);
    //         }
    //       );
    //     }
    //   },
    //   error => { }
    // );
    this.apiLoading = true;
    this._settingsService.getProcessTemplate('ELIGIBILITY').subscribe(
      (result: any) => {
        // this.apiLoading = false;
        console.log("RESULT FROM ELIGIBILITY TEMPLATES:--", result);
        // this.allSections = result.sections;
        this.allSections = result.sections.map((c) => {
          return {
            ...c,
            template: JSON.parse(c.template)
          }
        })
        this.groupType = this.allSections[0];
        this.form = this.allSections[0].template;
        this.form.exists = false;
        // this.apiLoading = false;
        this.getEligibilityRequest();
      },
      error => {
        console.log("ERROR FROM ELIGIBILITY TEMPLATES:--", error);
      }
    );
  }

  // setDefaults() {
  //   var resultForm = _.find(this.allProfiles, { 'smeRef': this.groupType })
  //   this.loggedUser = JSON.parse(localStorage.getItem('user'));
  //   this.form = resultForm;
  //   this.secondForm = null;
  //   // if (this.form) {

  //   var request = _.find(this.allRequests, { 'formIdentity': this.form.smeRef, 'userRef': this.loggedUser.username })
  //   if (request) {
  //     this.secondForm = request.formSubmitData;
  //     this.form.exists = true;
  //   } else {
  //     this.form.exists = false;
  //   }
  //   // }
  // }

  getEligibilityRequest() {
    // this.apiLoading = true;
    this._accreditationRequestService.getEligibilityRequest().subscribe(
      (result: any) => {
        console.log("RESULT AFTER GEETING ELIGIBILITY REQUESTS:---", result);
        if (result[0]) {
          this._accreditationRequestService.getSingleEligibilityRequest(result[0].id).subscribe(
            (result: any) => {
              console.log("RESULT SINGLE ELIGIBILITY REQUEST:---", result);
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
    // this.setDefaults()
    // console.log(this.groupType)
    this.form = this.groupType.template;
  }

  onSubmit($event) {
    this.secondForm = $event.data;
    // var flag: any = _.find(this.allRequests, { userRef: this.loggedUser.email, formIdentity: this.form.smeRef })
    // if (!flag) {
    this.form.exists = true;
    //   var values = {
    //     "currentReview": null,
    //     "endDate": null,
    //     "formData": 'values',
    //     "formIdentity": this.form.formIdentity,
    //     "formSubmitData": this.secondForm,
    //     "prevReview": null,
    //     "ratings": 0,
    //     "requestKey": 'eligibilty',
    //     "sectionKey": this.groupType,
    //     "startDate": null,
    //     "status": 'pending',
    //     "userName": this.loggedUser.username,
    //     "userUpdateFlag": false
    //   }
    console.log('NEW SUBMITTED:--', $event.data);
    //   this._accreditationRequestService.addAccreditationRequest(values).subscribe(
    //     result => {
    //       console.log("RESULT AFTER ADDING REQUEST:--", result);
    //       this._accreditationRequestStore.addRequest(
    //         this.loggedUser.email,
    //         $event.data,
    //         {},
    //         'pending',
    //         this.form.formIdentity,
    //         null,
    //         null,
    //         null,
    //         null,
    //         'eligibilty',
    //         false,
    //         0
    //       );
    //     },
    //     error => {
    //       console.log("ERROR AFTER ADDING REQUEST:--", error);
    //     }
    //   );

    // } else {
    //   console.log('ALREADY SUBMITTED:--');
    // }
    this._accreditationRequestService.addEligibilityRequest(
      JSON.stringify($event.data),
      JSON.stringify(this.form)
    ).subscribe(
      result => {
        console.log("RESULT AFTER ADDING ELIGIBLITY:--", result);
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
