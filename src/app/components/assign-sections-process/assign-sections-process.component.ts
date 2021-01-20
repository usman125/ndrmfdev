import { Component, OnInit } from '@angular/core';
import { SettingsService } from "../../services/settings.service";
import { UserService } from "../../services/user.service";
import { ConfirmModelService } from '../../services/confirm-model.service';

@Component({
  selector: 'app-assign-sections-process',
  templateUrl: './assign-sections-process.component.html',
  styleUrls: ['./assign-sections-process.component.css'],
  providers: [ConfirmModelService]
})
export class AssignSectionsProcessComponent implements OnInit {

  process: any = null;
  po: any = null;
  sme: any = null;
  allProcess: any = [];
  allProcessType: any = [];
  poUsers: any = [];
  smeUsers: any = [];
  apiLoading: boolean = false;
  apiProcessLoading: boolean = false;

  selectedProcess: any = null;


  userType = [
    'SME',
    'PROCESS OWNER'
  ]

  constructor(
    private _settingsService: SettingsService,
    private _userService: UserService,
    private _confirmModelService: ConfirmModelService,
  ) { }

  ngOnInit(): void {
    this.getAllProcess();
    this.getDmPams();
  }

  getAllProcess() {
    this.apiProcessLoading = true;
    this._settingsService.getProcesses().subscribe(
      (result: any) => {
        this.apiProcessLoading = false;
        console.log("ALL PROCESS RESULT:---", result);
        this.allProcess = result;
      },
      error => {
        this.apiProcessLoading = false;
        console.log("ERROR PROCESS FETCHING:---", error);
      }
    );
  }

  processChanged($event) {
    console.log("PROCESS CHANGED:---", $event);
    // this.apiLoading = true;
    if ($event !== 'DISBURSEMENT') {

      this._settingsService.getProcessMeta($event).subscribe(
        (result: any) => {
          // this.apiLoading = false;
          console.log("RESULT FETCHING TYPE:---", result);
          this.allProcessType = result;
          // var object = {
          //   processOwner: null,
          //   sections: [],
          // }
          // let dummyTypes = [];
          // object.processOwner = result.processOwner;
          // result.sections.forEach(element => {
          //   if (element.sme === null){
          //     dummyTypes.push(element);
          //   }
          // });
          // object.sections = dummyTypes;
          // this.allProcessType = object;
          this.apiLoading = true;
          this.getProcessOwners();
          this.getSMES();
          if ($event === 'EXTENDED_APPRAISAL') {
            this.getDmPams();
          }
        },
        error => {
          console.log("ERROR FETCHING TYPE:---", error);
        }
      );
    } else {
      this.allProcessType = {
        processOwner: null,
      }
      this.getProcessOwners();

    }
  }

  getProcessOwners() {
    this._userService.withRoleprocessOwner().subscribe(
      (result: any) => {
        // this.apiLoading = false;
        console.log("RESULT FROM PROCEsS OWNER:---", result);
        this.poUsers = result;
      },
      error => {
        this.apiLoading = false;
        console.log("ERROR FROM PROCEsS OWNER:---", error);
      }
    );
  }

  getDmPams() {
    this._userService.getDmPams().subscribe(
      (result: any) => {
        // this.apiLoading = false;
        // this.poUsers = result;
        result.forEach(element => {
          this.poUsers.push(element);
          this.smeUsers.push(element);
        });
        // console.log("RESULT FROM DM PAMS:---", result);
      },
      error => {
        this.apiLoading = false;
        console.log("ERROR FROM DM PAMS:---", error);
      }
    );
  }

  getSMES() {
    // this.apiLoading = true;
    this._userService.withRoleSME().subscribe(
      (result: any) => {
        console.log("RESULT FROM SMES:---", result);
        this.smeUsers = result;
        this.apiLoading = false;
      },
      error => {
        this.apiLoading = false;
        console.log("ERROR FROM SMES:---", error);
      }
    );
  }

  poChanged($event) {
    console.log("PO CHANGED:---", $event);
  }

  smeChanged($event) {
    console.log("SME CHANGED:---", $event);
  }

  updateProcessMeta() {
    this.apiLoading = true;
    let object = {
      processOwnerId: this.allProcessType.processOwner !== null ? this.allProcessType.processOwner.id : null,
      sections: []
    }
    let dummySections = [];
    if (this.allProcessType.sections) {
      this.allProcessType.sections.forEach(element => {
        if (element.sme !== null) {
          let section = {
            id: element.id,
            smeId: element.sme.id
          }
          dummySections.push(section);
        }
      });
    }
    object.sections = dummySections.length ? dummySections : null;
    this._settingsService.updateProcess(this.process, object).subscribe(
      result => {
        this.apiLoading = false;
        console.log("RESULT FROM UPDATING:---", result);
        const options = {
          title: 'Success!',
          message: 'Succefully Saved.',
          cancelText: 'CANCEL',
          confirmText: 'OK',
          add: true,
          confirm: false,
        };

        this._confirmModelService.open(options);

        this._confirmModelService.confirmed().subscribe(confirmed => {
          if (confirmed) {
            console.log("CONFIRMED FROM MODEL", confirmed);
          }
        });
      },
      error => {
        this.apiLoading = false;
        console.log("ERROR FROM UPDATING:---", error);
      }
    );
  }

  comparePoObjects(o1: any, o2: any): boolean {
    if (o2) {
      return o1.name === o2.name && o1.id === o2.id;
    }
    return false;
  }

  compareSmeObjects(o1: any, o2: any): boolean {
    if (o2) {
      return o1.name === o2.name && o1.id === o2.id;
    }
    return false;
  }

  // ACCORDION STYLES
  step = 0;
  stepArray: any = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  setArrayStep(i, item) {
    console.log("ITEM TO FETCH USERS:--", i, item);
    setTimeout(() => {
      this.allProcessType = [];
      this.process = item;
      this.processChanged(item);
    })
    this.stepArray = i;
  }
  prevArrayStep() {
    // console.log("ITEM TO FETCH USERS:--", item);
    this.stepArray--;
  }
  nextArrayStep() {
    // console.log("ITEM TO FETCH USERS:--", item);
    this.stepArray++;
  }

  PROCESS_NAME(name) {
    switch (name) {
      case 'ELIGIBILITY':
        return 'Eligibility';
      case 'QUALIFICATION':
        return 'Qualification';
      case 'ACCREDITATION_QUESTIONNAIRE':
        return 'Accreditation Questionnaire';
      case 'PROJECT_PROPOSAL':
        return 'Project Proposal';
      case 'PRELIMINARY_APPRAISAL':
        return 'Preliminary Appraisal';
      case 'EXTENDED_APPRAISAL':
        return 'Extended Appraisal';
      case 'GIA':
        return 'GIA';
      case 'GIA_CHECKLIST':
        return 'GIA Checklist';
      case 'SUB_PROJECT_DOCUMENT':
        return 'Sub Project Document';
      default:
        return name;
    }
  }

}
