import { Component, OnInit } from '@angular/core';
import { setThematicAreaValue, thematicAreaReplay } from "../../stores/proposal-forms/proposal-forms-replay";
import { UserService } from 'src/app/services/user.service';
import { SettingsService } from "../../services/settings.service";
import { ProposalFormsStore } from "../../stores/proposal-forms/proposal-forms-store";

@Component({
  selector: 'app-assign-thematic-area',
  templateUrl: './assign-thematic-area.component.html',
  styleUrls: ['./assign-thematic-area.component.css']
})
export class AssignThematicAreaComponent implements OnInit {

  selectedArea: any = null;
  apiLoading: boolean = false;
  poUsers: any = [];
  processOwner: any = null;


  constructor(
    private _userService: UserService,
    private _settingsService: SettingsService,
    private _proposalFormsStore: ProposalFormsStore,
  ) { }

  ngOnInit(): void {
    thematicAreaReplay.subscribe(data => {
      // console.log("DATA FROM THEMATIC AREA:--", data);
      this.selectedArea = data;
      this.processOwner = this.selectedArea.processOwner;
    });
    this.getProcessOwners();
  }

  getProcessOwners() {
    this.apiLoading = true;
    this._userService.withRoleprocessOwner().subscribe(
      (result: any) => {
        // console.log("RESULT FROM PROCEsS OWNER:---", result);
        this.poUsers = result;
        this.apiLoading = false;
      },
      error => {
        this.apiLoading = false;
        console.log("ERROR FROM PROCEsS OWNER:---", error);
      }
    );
  }


  poChanged($event) {
    // console.log("PO CHANGED:---", $event);
  }

  comparePoObjects(o1: any, o2: any): boolean {
    if (o2 !== null) {
      return o1.name === o2.name && o1.id === o2.id;
    }
    return false;
  }

  updateThematicArea() {
    // console.log("BODY FOR API:--", {
    //   name: this.selectedArea.name,
    //   enabled: this.selectedArea.enabled,
    //   processOwnerId: this.processOwner.id
    // });
    this.apiLoading = true;
    this._settingsService.updateThematicArea(
      {
        name: this.selectedArea.name,
        enabled: this.selectedArea.enabled,
        processOwnerId: this.processOwner.id
      },
      this.selectedArea.id
    ).subscribe(
      result => {
        // console.log("RESULT UPDATING THEMATIC AREA:--", result);
        this._proposalFormsStore.updateProcessOwner(this.selectedArea.id, this.processOwner);
        this.apiLoading = false;
      },
      error => {
        this.apiLoading = true;
        console.log("ERROR UPDATING THEMATIC AREA:--", error);
      }
    );
  }
}
