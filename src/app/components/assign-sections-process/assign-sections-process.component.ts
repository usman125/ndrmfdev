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

  }

  getAllProcess() {
    this.apiLoading = true;
    this._settingsService.getProcesses().subscribe(
      (result: any) => {
        this.apiLoading = false;
        console.log("ALL PROCESS RESULT:---", result);
        this.allProcess = result;
      },
      error => {
        this.apiLoading = false;
        console.log("ERROR PROCESS FETCHING:---", error);
      }
    );
  }

  processChanged($event) {
    console.log("PROCESS CHANGED:---", $event);
    this.apiLoading = true;
    this._settingsService.getProcessMeta($event).subscribe(
      (result: any) => {
        this.apiLoading = false;
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
        this.getProcessOwners();
        this.getSMES();
      },
      error => {
        console.log("ERROR FETCHING TYPE:---", error);
      }
    );
  }

  getProcessOwners() {
    this.apiLoading = true;
    this._userService.withRoleprocessOwner().subscribe(
      (result: any) => {
        this.apiLoading = false;
        console.log("RESULT FROM PROCEsS OWNER:---", result);
        this.poUsers = result;
      },
      error => {
        this.apiLoading = false;
        console.log("ERROR FROM PROCEsS OWNER:---", error);
      }
    );
  }

  getSMES() {
    this.apiLoading = true;
    this._userService.withRoleSME().subscribe(
      (result: any) => {
        this.apiLoading = false;
        console.log("RESULT FROM SMES:---", result);
        this.smeUsers = result;
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
    this.allProcessType.sections.forEach(element => {
      if (element.sme !== null) {
        let section = {
          id: element.id,
          smeId: element.sme.id
        }
        dummySections.push(section);
      }
    });
    object.sections = dummySections;
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
    return o1.name === o2.name && o1.id === o2.id;
  }

  compareSmeObjects(o1: any, o2: any): boolean {
    console.log(o1, o2)
    // return o1.name === o2.name && o1.id === o2.id;
    if (o2 !== null) {
      return o1.name === o2.name && o1.id === o2.id;
    }
    return false;
  }

}
