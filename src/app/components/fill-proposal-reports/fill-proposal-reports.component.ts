import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-fill-proposal-reports',
  templateUrl: './fill-proposal-reports.component.html',
  styleUrls: ['./fill-proposal-reports.component.css']
})
export class FillProposalReportsComponent implements OnInit {

  selectedProjectId: any = null;

  constructor(
    private _router: Router,
    private _location: Location,
    private _activatedRoute: ActivatedRoute,
    private _settingsService: SettingsService,
  ) { }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe(params => {
      this.selectedProjectId = params.get("projectId");
      // console.log("SELECTED PROJECT ID IS:--", this.selectedProjectId);
      this.getProcessMeta();
    });
  }

  getProcessMeta() {
    this._settingsService.getProcessMeta("PROJECT_PROPOSAL").subscribe(
      (result: any) => {
        // console.log("RESULT FROM PROCESS TEMPLATES:---", result);
      },
      error => {
        console.log("RESULT FROM PROCESS TEMPLATES:---", error);
      }
    )
  }

  goBack() {
    this._location.back();
  }

}
