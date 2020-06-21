import { Component, OnInit, Output } from '@angular/core';
import { Location } from '@angular/common';
import { ExtendedAppraisalSmesStore } from "../../stores/extended-appraisal-smes/extended-appraisal-smes-store";
import { Subscription } from 'rxjs';
import { ProjectService } from "../../services/project.service";

@Component({
  selector: 'app-add-extended-appraisal-sme',
  templateUrl: './add-extended-appraisal-sme.component.html',
  styleUrls: ['./add-extended-appraisal-sme.component.css']
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

  constructor(
    private _extendedAppraisalSmesStore: ExtendedAppraisalSmesStore,
    private _projectService: ProjectService,
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
            if (c.data === null && c.status === 'Pending') {
              pendingCount = pendingCount + 1;
            }
            if (c.data !== null && c.status === 'Pending') {
              pendingCount = pendingCount + 1;
            }
            if (c.data !== null && c.status === 'Completed') {
              submitCount = submitCount + 1;
            }
          });
          console.log("EXTENDED APPRAISAL IN SMES:---", data.extendedAppraisal, this.appraisalSections);
          this.totalSections = data.extendedAppraisal.sections.length;
          this.sectionStats = {
            pendingCount,
            submitCount
          }
        }
        this.apiLoading = false;
      })
    );
  }

  onSubmit($event, id) {
    var object = {
      data: JSON.stringify($event.data),
      id: id
    }
    console.log("DATA SUBMITTED:--", $event.data, object, this.extendedAppraisal.id);
    this._projectService.submitExtAppraisal(this.extendedAppraisal.id, object).subscribe(
      result => {
        console.log("RESULT FROM adding EP:--", result);
        this._extendedAppraisalSmesStore.updateSectionData(id, $event.data);
      },
      error => {
        console.log("ERROR FROM adding EP:--", error);
      },
    );
  }

}
