import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../services/settings.service';
import { ConfirmModelService } from '../../services/confirm-model.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-sub-process',
  templateUrl: './add-sub-process.component.html',
  styleUrls: ['./add-sub-process.component.css'],
  providers: [ConfirmModelService]
})
export class AddSubProcessComponent implements OnInit {

  allProcesses: any = [];
  allSubProcesses: any = [];
  process: any = null;
  assignProcess: any = null;
  processName: any = null;

  allProcessType: any = [];
  poUsers: any = [];
  smeUsers: any = [];
  apiLoading: boolean = false;
  apiProcessLoading: boolean = false;

  constructor(
    private _settingService: SettingsService,
    private _userService: UserService,
    private _confirmModelService: ConfirmModelService,
  ) { }

  ngOnInit(): void {
    this.getAllProcesses();
  }

  getAllProcesses() {
    this._settingService.getProcesses().subscribe(
      (result: any) => {
        console.log("RESULT AFTER ALL PROCESS:--", result);
        this.allProcesses = result;
      },
      error => {
        console.log("RESULT AFTER ALL PROCESS:--", error);
      }
    )
  }

  processNameChanged($event) {
    console.log("PROCESS NAME CHANGED:--", $event);
    this.processName = $event;
  }

  // processChanged($event) {
  //   console.log("PROCESS TYPE CHANGED:--", $event, this.process);
  //   // this._settingService.getSubProcessTypes(this.process).subscribe(
  //   //   (result: any) => {
  //   //     console.log("RESULT AFTER GETTING SUB PROCESS:--", result);
  //   //   },
  //   //   error => {
  //   //     console.log("RESULT AFTER GETTING SUB PROCESS:--", error);
  //   //   }
  //   // );
  // }

  getSubProcess($event) {
    this.allProcessType = [];
    console.log("PROCESS TYPE CHANGED:--", $event, this.assignProcess);
    this._settingService.getSubProcessTypes($event).subscribe(
      (result: any) => {
        console.log("RESULT AFTER GETTING SUB PROCESS:--", result);
        this.allSubProcesses = result;
      },
      error => {
        console.log("RESULT AFTER GETTING SUB PROCESS:--", error);
      }
    );
  }

  addSubProcess() {
    const options = {
      title: 'Sub Process added!',
      message: 'OK to exit',
      cancelText: 'CANCEL',
      confirmText: 'OK',
      add: true,
      confirm: false,
    };
    console.log("SUB PROCESS VALUES:--", this.processName, this.process);
    this._settingService.addProcess(this.process, this.processName).subscribe(
      (result: any) => {
        console.log("RESULT ADDING SUB PROCESS:--", result);
        this._confirmModelService.open(options);
        this.process = null;
        this.processName = null;
      },
      error => {
        options.title = error.error.message;
        this._confirmModelService.open(options);
        console.log("RESULT ADDING SUB PROCESS:--", error);
      }
    );
  }

  processChanged($event) {
    console.log("PROCESS CHANGED:---", $event);
    // this.apiLoading = true;
    this._settingService.getProcessMeta($event).subscribe(
      (result: any) => {
        // this.apiLoading = false;
        console.log("RESULT FETCHING TYPE:---", result);
        this.allProcessType = result;
        this.getProcessOwners();
        this.getSMES();
      },
      error => {
        console.log("ERROR FETCHING TYPE:---", error);
      }
    );
  }

  getProcessOwners() {
    this._userService.withRoleprocessOwner().subscribe(
      (result: any) => {
        // this.apiLoading = false;
        console.log("RESULT FROM PROCEsS OWNER:---", result);
        this.poUsers = result;
      },
      error => {
        // this.apiLoading = false;
        console.log("ERROR FROM PROCEsS OWNER:---", error);
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
    this._settingService.updateProcess(this.assignProcess, object).subscribe(
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
      // this.assignProcess = item;
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

}
