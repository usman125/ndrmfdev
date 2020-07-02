import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from "../../services/user.service";
import { SettingsService } from "../../services/settings.service";
import { AuthStore } from "../../stores/auth/auth-store";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {


  allUsers: any = null;
  fipCount: any = null;
  smeCount: any = null;
  poCount: any = null;

  allProcess: any = null;
  withOwner: any = 0;
  withoutOwner: any = 0;

  thematicCount: any = 0;

  pendingSignUpsCount: any = 0;

  apiLoading: any = null;

  templatesCount: any = [];
  sectionsCount: any = [];

  Subscription: Subscription = new Subscription();

  constructor(
    private _userService: UserService,
    private _settingsService: SettingsService,
    private _authStore: AuthStore,
    private _router: Router,
  ) { }

  ngOnInit(): void {

    this.Subscription.add(
      this._authStore.state$.subscribe(data => {
        this.apiLoading = data.auth.apiCall;
      })
    )

    this.userStats();
    this.processStats();
    this.pendingSignUps();
    this.templateStats();
    this.thematicAreasCount();
  }

  userStats() {
    this._authStore.setLoading();
    this._userService.getAllUsers().subscribe(
      (result: any) => {
        this.allUsers = result.length;
        let usersArray = [];
        let smeCount = 0;
        let fipCount = 0;
        let poCount = 0;
        for (let i = 0; i < result.length; i++) {
          var object = {
            firstName: result[i].firstName,
            lastName: result[i].lastName,
            email: result[i].email,
            username: result[i].username,
            password: result[i].password || null,
            role: result[i].roles ?
              result[i].roles[0] ?
                result[i].roles[0].name.toLowerCase() : 'FIP'.toLowerCase()
              : null,
            smeRef: null,
            department: result[i].departmentId || null,
            active: result[i].enabled,
            eligibileFlag: false,
            qualificationFlag: false,
            roles: result[i].roles,
            orgId: result[i].orgId,
            orgName: result[i].orgName,
            org: [{ 'id': result[i].orgId, 'name': result[i].orgName }]
          }
          if (object.role === 'sme') {
            smeCount = smeCount + 1;
          } else if (object.role === 'fip') {
            fipCount = fipCount + 1;
          } else if (object.role === 'process owner') {
            poCount = poCount + 1;
          }
          usersArray.push(object);
        }
        this.smeCount = smeCount;
        this.fipCount = fipCount;
        this.poCount = poCount;
        this._authStore.removeLoading();
        console.log("RESULT FROM ALL USERS:--", usersArray);
      },
      error => {
        this._authStore.removeLoading();
        console.log("ERROR ALL USERS:--", error);
      }
    );
  }

  processStats() {
    this._authStore.setLoading();
    this._settingsService.getProcesses().subscribe(
      (result: any) => {
        this.allProcess = result.length;
        let dummySections = [];
        let withOwner = 0;
        let withoutOwner = 0;
        let sectionsCount = 0;

        let eligiSectionsCount = 0;
        let qualiSectionsCount = 0;
        let ppSectionsCount = 0;
        let eaSectionsCount = 0;

        result.forEach(element => {
          var object = {
            name: null,
            sectionsCount: 0
          }
          this._settingsService.getProcessMeta(element).subscribe(
            (result: any) => {
              if (result.processOwner !== null) {
                withOwner = withOwner + 1;
              } else {
                withoutOwner = withoutOwner + 1;
              }
              if (result.sections !== null) {
                sectionsCount = sectionsCount + result.sections.length;
              }
              if (result.sections !== null) {
                object.sectionsCount = result.sections.length;
              }
              if (element === 'ELIGIBILITY') {
                object.name = 'Eligibility';
              }
              if (element === 'QUALIFICATION') {
                object.name = 'Qualification';
              }
              if (element === 'PROJECT_PROPOSAL') {
                object.name = 'Project Proposal';
              }
              if (element === "EXTENDED_APPRAISAL") {
                object.name = 'Extended Appraisal';
              }
              if (element === 'PRELIMINARY_APPRAISAL') {
                object.name = 'Priliminary Appraisal';
              }
              if (element === 'GIA') {
                object.name = 'GIA';
              }
              if (element === 'GIA_CHECKLIST') {
                object.name = 'Checklist to FIP';
              }
              if (element === 'ACCREDITATION_QUESTIONNAIRE') {
                object.name = 'Accreditation Questionnaire';
              }
              if (element === 'SUB_PROJECT_DOCUMENT') {
                object.name = 'Sub Project Document';
              }
              if (element === 'QPR') {
                object.name = 'QPR';
              }
              if (object.name !== null) dummySections.push(object);
              this.sectionsCount = dummySections;
              this.withoutOwner = withoutOwner;
              this.withOwner = withOwner;
              console.log("RESULT:--", result, dummySections);
              this._authStore.removeLoading();
            },
            error => {
              this._authStore.removeLoading();
              console.log("ERROR:--", error);
            }
          );
        });
      },
      error => {
        console.log("ERROR ALL PROCESSES:--", error);
      }
    );
  }

  pendingSignUps() {
    this._authStore.setLoading();
    this._settingsService.getPendingSignups().subscribe(
      (result: any) => {
        this._authStore.removeLoading();
        console.log("PENDING SIGNUPS:--", result);
        this.pendingSignUpsCount = result.length;
      },
      error => {
        this._authStore.removeLoading();
        console.log("ERROR PENDING SIGNUPS:--", error);
      }
    );
  }

  templateStats() {
    this._authStore.setLoading();
    this._settingsService.getProcesses().subscribe(
      (result: any) => {
        let sectionsCount = 0;
        let dummyProcesses = [];

        result.forEach(element => {
          var object = {
            name: null,
            sectionsCount: 0
          }
          this._settingsService.getProcessTemplate(element).subscribe(
            (result: any) => {
              if (result.sections !== null) {
                sectionsCount = sectionsCount + result.sections.length;
              }
              if (result.sections !== null) {
                object.sectionsCount = result.sections.length;
              }
              if (element === 'ELIGIBILITY') {
                object.name = 'Eligibility';
              }
              if (element === 'QUALIFICATION') {
                object.name = 'Qualification';
              }
              if (element === 'PROJECT_PROPOSAL') {
                object.name = 'Project Proposal';
              }
              if (element === "EXTENDED_APPRAISAL") {
                object.name = 'Extended Appraisal';
              }
              if (element === 'PRELIMINARY_APPRAISAL') {
                object.name = 'Priliminary Appraisal';
              }
              if (element === 'GIA') {
                object.name = 'GIA';
              }
              if (element === 'GIA_CHECKLIST') {
                object.name = 'Checklist to FIP';
              }
              if (element === 'ACCREDITATION_QUESTIONNAIRE') {
                object.name = 'Accreditation Questionnaire';
              }
              if (element === 'SUB_PROJECT_DOCUMENT') {
                object.name = 'Sub Project Document';
              }
              if (element === 'QPR') {
                object.name = 'QPR';
              }
              dummyProcesses.push(object);
              console.log("RESULT:--", result, dummyProcesses);
              this.templatesCount = dummyProcesses;
              this._authStore.removeLoading();
            },
            error => {
              // object.name = element;
              // dummyProcesses.push(object);
              this._authStore.removeLoading();
              console.log("ERROR:--", error);
            }
          );
        });
      },
      error => {
        this._authStore.removeLoading();
        console.log("ERROR ALL PROCESSES:--", error);
      }
    );
  }

  thematicAreasCount() {
    this._authStore.setLoading();
    this._settingsService.getAllThematicAreas().subscribe(
      (result: any) => {
        this._authStore.removeLoading();
        console.log("RESULT FROM THEMATIC AREAS:--", result);
        this.thematicCount = result.length;
      },
      error => {
        this._authStore.removeLoading();
        console.log("ERROR FROM THEMATIC AREAS:--", error);
      }
    );
  }

  goToRoute(route) {
    this._router.navigate([route]);
  }

}
