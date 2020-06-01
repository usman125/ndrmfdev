import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PrimaryAppraisalFormsStore } from "../../stores/primary-appraisal-forms/primary-appraisal-forms-store";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-add-extended-appraisal-form',
  templateUrl: './add-extended-appraisal-form.component.html',
  styleUrls: ['./add-extended-appraisal-form.component.css']
})
export class AddExtendedAppraisalFormComponent implements OnInit {

  selectedProjectId: any = null;
  selectedProject: any = null;
  Subscription: Subscription = new Subscription();

  @Input() totalSections: any = 0;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _primaryAppraisalFormsStore: PrimaryAppraisalFormsStore,
  ) { }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe(params => {
      this.selectedProjectId = params.get("projectId");
      // const project = this._projectsStore.getProject(this.selectedProjectId);
      // setCurrentProject(
      //   project.name,
      //   project.type,
      //   project.status,
      //   project.userRef,
      //   project.key,
      //   project.primaryAppraisalStatus,
      //   project.primaryAppraisalStartDate,
      //   project.primaryAppraisalEndDate,
      //   project.extendedAppraisalStatus,
      //   project.extendedAppraisalExpiry,
      // );
      // this.getProjectDetails();
    });
    this.Subscription.add(
      this._primaryAppraisalFormsStore.state$.subscribe(data => {
        this.selectedProject = data.selectedProject;
      })
    )
  }

}
