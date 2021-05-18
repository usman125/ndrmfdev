import { Component, OnInit, Output } from '@angular/core';
import { Location } from '@angular/common';
import { ExtendedAppraisalSmesStore } from "../../stores/extended-appraisal-smes/extended-appraisal-smes-store";
import { Subscription } from 'rxjs';
import { ProjectService } from "../../services/project.service";
import { ConfirmModelService } from 'src/app/services/confirm-model.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-add-extended-appraisal-sme',
  templateUrl: './add-extended-appraisal-sme.component.html',
  styleUrls: ['./add-extended-appraisal-sme.component.css'],
  providers: [ConfirmModelService]
})
export class AddExtendedAppraisalSmeComponent implements OnInit {

  Subscription: Subscription = new Subscription();
  appraisalSections: any = [];
  unassignedSections: any = [];
  extendedAppraisal: any = null;
  sectionStats: any = null;
  apiLoading: boolean = false;
  @Output() totalSections: any = null;
  options: Object = {
    readOnly: false
  }

  loggedUser = JSON.parse(localStorage.getItem('user'));

  constructor(
    private _extendedAppraisalSmesStore: ExtendedAppraisalSmesStore,
    private _projectService: ProjectService,
    private _confirmModelService: ConfirmModelService,
    private _location: Location,
  ) { }

  ngOnInit(): void {
    this.apiLoading = true;
    this.Subscription.add(
      this._extendedAppraisalSmesStore.state$.subscribe(data => {
        this.extendedAppraisal = data.extendedAppraisal;
        if (data.extendedAppraisal) {
          this.appraisalSections = [];
          this.unassignedSections = [];
          let pendingCount = 0;
          let submitCount = 0;
          data.extendedAppraisal.sections.forEach(c => {
            if (typeof (c.template) === 'string') {
              c.template = JSON.parse(c.template);
            }
            if (typeof (c.data) === 'string') {
              c.data = JSON.parse(c.data);
            }
            if (c.assigned === true) {
              this.appraisalSections.push(c);
            } else {
              this.unassignedSections.push(c);
            }
            if ((c.data === null && c.status === 'Pending') ||
              (c.data !== null && c.status === 'Pending')) {
              pendingCount = pendingCount + 1;
            }
            // if (c.data !== null && c.status === 'Pending') {
            //   pendingCount = pendingCount + 1;
            // }
            if (c.data !== null && c.status === 'Completed') {
              submitCount = submitCount + 1;
            }
          });
          console.log("EXTENDED APPRAISAL IN SMES:---", data.extendedAppraisal, this.appraisalSections, this.unassignedSections);
          this.totalSections = data.extendedAppraisal.sections.length;
          this.sectionStats = {
            pendingCount,
            submitCount
          }
        }
        this.appraisalSections = _.orderBy(this.appraisalSections, ['orderNum'], ['asc']);
        this.unassignedSections = _.orderBy(this.unassignedSections, ['orderNum'], ['asc']);
        this.apiLoading = false;
      })
    );
  }

  onSubmit($event, id) {
    var object = {
      data: JSON.stringify($event.data),
      id: id
    }
    // console.log("DATA SUBMITTED:--", $event.data, object, this.extendedAppraisal.id);
    this._projectService.submitExtAppraisal(this.extendedAppraisal.id, object).subscribe(
      result => {
        // console.log("RESULT FROM adding EP:--", result);
        this._extendedAppraisalSmesStore.updateSectionData(id, $event.data);
      },
      error => {
        console.log("ERROR FROM adding EP:--", error);
      },
    );
  }

  assignExtendedAppraisalSection(id) {
    var object = {
      data: null,
      id: id
    }
    const options = {
      title: '',
      message: '',
      cancelText: 'CANCEL',
      confirmText: 'OK',
      add: true,
      confirm: false,
    };
    // console.log("DATA SUBMITTED:--", $event.data, object, this.extendedAppraisal.id);
    this._projectService.assignExtAppraisal(this.extendedAppraisal.id, object).subscribe(
      (result: any) => {
        this._extendedAppraisalSmesStore.updateSectionStatus(id);
        options.title = result.message;
        this._confirmModelService.open(options);
      },
      error => {
        console.log("ERROR FROM adding EP:--", error);
      },
    );
  }

  extendedAppraisalDecisionByDm() {
    const options = {
      title: '',
      message: '',
      cancelText: 'CANCEL',
      confirmText: 'OK',
      add: true,
      confirm: false,
    };
    // console.log("DATA SUBMITTED:--", $event.data, object, this.extendedAppraisal.id);
    this._projectService.extendedAppraisalDecisionByDm(this.extendedAppraisal.id).subscribe(
      (result: any) => {
        this._extendedAppraisalSmesStore.extendedAppraisalDecisionByDm();
        options.title = result.message;
        this._confirmModelService.open(options);
      },
      error => {
        console.log("ERROR FROM adding EP:--", error);
      },
    );
  }

}
