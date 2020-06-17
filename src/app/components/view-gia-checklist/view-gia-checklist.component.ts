import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';
import { PrimaryAppraisalFormsStore } from 'src/app/stores/primary-appraisal-forms/primary-appraisal-forms-store';

@Component({
  selector: 'app-view-gia-checklist',
  templateUrl: './view-gia-checklist.component.html',
  styleUrls: ['./view-gia-checklist.component.css']
})
export class ViewGiaChecklistComponent implements OnInit {

  selectedProjectId: any = null;
  apiLoading: boolean = false;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _projectService: ProjectService,
    private _primaryAppraisalFormsStore: PrimaryAppraisalFormsStore,
  ) { }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe(params => {
      this.selectedProjectId = params.get("projectId");
      this.getProjectDetails();
    });
  }

  getProjectDetails() {
    this.apiLoading = true;
    this._projectService.getSingleProject(this.selectedProjectId).subscribe(
      (result: any) => {
        this._primaryAppraisalFormsStore.addSelectedProject(result);
        this.apiLoading = false;
      },
      error => {
        console.log("ERROR DETAILS FROM DATABASE:--", error);
      },
    );
  }

}
