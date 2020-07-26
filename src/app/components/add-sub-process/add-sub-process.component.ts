import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../services/settings.service';
import { ConfirmModelService } from '../../services/confirm-model.service';

@Component({
  selector: 'app-add-sub-process',
  templateUrl: './add-sub-process.component.html',
  styleUrls: ['./add-sub-process.component.css'],
  providers: [ConfirmModelService]
})
export class AddSubProcessComponent implements OnInit {

  allProcesses: any = [];
  process: any = null;
  processName: any = null;

  constructor(
    private _settingService: SettingsService,
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

  processChanged($event) {
    console.log("PROCESS TYPE CHANGED:--", $event, this.process);
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
      },
      error => {
        options.title = error.error.message;
        this._confirmModelService.open(options);
        console.log("RESULT ADDING SUB PROCESS:--", error);
      }
    );
  }

}
