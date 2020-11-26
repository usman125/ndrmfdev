import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SettingsService } from 'src/app/services/settings.service';
import { ProjectService } from 'src/app/services/project.service';
import { PrimaryAppraisalFormsStore } from 'src/app/stores/primary-appraisal-forms/primary-appraisal-forms-store';
import { Subscription } from 'rxjs';
import { Location } from "@angular/common";

@Component({
  selector: 'app-gia-checklist',
  templateUrl: './gia-checklist.component.html',
  styleUrls: ['./gia-checklist.component.css']
})
export class GiaChecklistComponent implements OnInit, OnDestroy {

  selectedProjectId: any = null;
  selectedRequestTemplate: any = null;
  selectedProject: any = null;
  apiLoading: boolean = false;

  Subscription: Subscription = new Subscription();

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _settingsService: SettingsService,
    private _projectService: ProjectService,
    private _location: Location,
    private _primaryAppraisalFormsStore: PrimaryAppraisalFormsStore,
  ) { }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe(params => {
      this.selectedProjectId = params.get("projectId");
    });
    this.Subscription.add(
      this._primaryAppraisalFormsStore.state$.subscribe(data => {
        this.selectedProject = data.selectedProject;
        console.log("SELECTED PROJECT GIA CHECKLIST:--", this.selectedProject);
        if (this.selectedProject) {
          if (this.selectedProject.giaChecklist !== null) {
            if (typeof (this.selectedProject.giaChecklist.data) === 'string') {
              this.selectedProject.giaChecklist.data = JSON.parse(this.selectedProject.giaChecklist.data);
            }
          }
        }
        this.apiLoading = false;
      })
    );
    this.getProcessTemplate();
  }

  getProcessTemplate() {
    this.apiLoading = true;
    this._settingsService.getProcessTemplate('GIA_CHECKLIST').subscribe(
      (result: any) => {
        console.log("RESULT AFTER GETTING TEMPLATE:---", result);
        this.selectedRequestTemplate = JSON.parse(result.sections[0].template)
      },
      error => {
        this.apiLoading = false;
        console.log("ERROR GETTING TEMPLATE:---", error);
      }
    );
  }

  onSubmit($event) {
    var object = {
      data: JSON.stringify($event.data),
      template: JSON.stringify(this.selectedRequestTemplate),
    }
    console.log("DATA ON SUBMISSION:--", $event.data, this.selectedRequestTemplate);
    this._projectService.submitGiaChecklist(this.selectedProjectId, object).subscribe(
      result => {
        console.log("RESULT AFTER ADDING:--", result);
        this._primaryAppraisalFormsStore.submitGiaCheckList($event.data);
      },
      error => {
        console.log("ERROR AFTER ADDING:--", error);
      }
    );
  }

  goBack() {
    console.log("GO BACK");
    this._location.back();
  }

  ngOnDestroy(): void {
    this.Subscription.unsubscribe();
  }


}
