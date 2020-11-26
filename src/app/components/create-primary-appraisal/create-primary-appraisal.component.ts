import { Component, OnInit, Output, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { ProjectsStore } from "../../stores/projects/projects-store";
import { currentProjectReplay, setCurrentProject } from "../../stores/projects/project-replay";

@Component({
  selector: 'app-create-primary-appraisal',
  templateUrl: './create-primary-appraisal.component.html',
  styleUrls: ['./create-primary-appraisal.component.css']
})
export class CreatePrimaryAppraisalComponent implements OnInit, OnDestroy {

  selectedProject: any = null;
  selectedProjectId: any = null;

  @Output() viewType: string = 'po';


  constructor(
    private _activatedRoute: ActivatedRoute,
    private _projectsStore: ProjectsStore,
    private _router: Router,
  ) { }

  ngOnInit(): void {
    // this._activatedRoute.paramMap.subscribe(params => {
    //   this.selectedProjectId = params.get("projectId");
    //   const project = this._projectsStore.getProject(this.selectedProjectId);
    //   // this.selectedProject = this._projectsStore.getProject(this.selectedProjectId);
    //   setCurrentProject(
    //     project.name,
    //     project.type,
    //     project.status,
    //     project.userRef,
    //     project.key,
    //     project.primaryAppraisalStatus,
    //     project.primaryAppraisalStartDate,
    //     project.primaryAppraisalEndDate,
    //     project.extendedAppraisalStatus,
    //     project.extendedAppraisalExpiry,
    //   );
    // });
    currentProjectReplay.subscribe((data) => {
      this.selectedProject = data;
    })
    console.log("SELCTED PROJECT ID IS:--", this.selectedProjectId, this.selectedProject);
  }


  ngOnDestroy(){
    // currentProjectReplay.unsubscribe();
  }

}
