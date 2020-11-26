import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AccreditationRequestReplay, setAccreditationRequestReplay } from 'src/app/stores/accreditation-requests/AccreditationRequestReplay';
import { AccreditationRequestStore } from 'src/app/stores/accreditation-requests/accreditation-requests-store';
import { AccreditationRequestService } from 'src/app/services/accreditation-request.service';

@Component({
  selector: 'app-view-govt-agency-request',
  templateUrl: './view-govt-agency-request.component.html',
  styleUrls: ['./view-govt-agency-request.component.css']
})
export class ViewGovtAgencyRequestComponent implements OnInit {

  selectedRequesttemplate: any = null;

  selectedRequest: any = null;

  constructor(
    private _settingsService: SettingsService,
    private _accreditationRequestStore: AccreditationRequestStore,
    private _accreditationRequestService: AccreditationRequestService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
  ) { }

  ngOnInit(): void {

    AccreditationRequestReplay.subscribe(data => {
      console.log("DATA IN VIREW ACCREDIT REPLAY:---", data);
      this.selectedRequest = data;
      this.selectedRequest.template = this.selectedRequesttemplate;
    });

    // this._activatedRoute.paramMap.subscribe(params => {
    //   this.selectedRequestId = params.get("requestId");
    //   console.log("SELECTED REQUEST ID:---", this.selectedRequestId);
    this.getProcessTemplate();
    // });
  }

  getProcessTemplate() {
    this._settingsService.getProcessTemplate('ACCREDITATION_QUESTIONNAIRE').subscribe(
      (result: any) => {
        console.log("RESULT AFTER GETTING TEMPLATE:---", result);
        this.selectedRequesttemplate = JSON.parse(result.sections[0].template)
      },
      error => {
        console.log("ERROR GETTING TEMPLATE:---", error);
      }
    );
  }

  onSubmit($event) {
    var object = {
      data: JSON.stringify($event.data),
      template: JSON.stringify(this.selectedRequesttemplate),
    }
    console.log("FORM SUBMITTED:--", object);
    this._accreditationRequestService.submitPendingAccreditation(
      this.selectedRequest.id,
      object
    ).subscribe(
      (result: any) => {
        console.log("RESULT AFTER SUBMITTING REQUEST:--", result);
        this._accreditationRequestStore.changePendingStatus(false, this.selectedRequest.id);
        setAccreditationRequestReplay(null, null, null, null);
      },
      error => {
        console.log("RESULT AFTER SUBMITTING REQUEST:--", error);
      }
    );
  }

}
