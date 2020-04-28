import { Component, OnInit, OnDestroy, Output, Input } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { ProjectsStore } from "../../stores/projects/projects-store";
import { PrimaryAppraisalFormsStore } from "../../stores/primary-appraisal-forms/primary-appraisal-forms-store";
import { PrimaryAppraisalRequestsStore } from "../../stores/primary-appraisal-requests/primary-appraisal-requests-store";
import { Subscription } from "rxjs";
import { setCurrentProject, currentProjectReplay } from "../../stores/projects/project-replay";

@Component({
  selector: 'app-fill-primary-appraisal',
  templateUrl: './fill-primary-appraisal.component.html',
  styleUrls: ['./fill-primary-appraisal.component.css'],
  providers: []
})
export class FillPrimaryAppraisalComponent implements OnInit, OnDestroy {

  selectedProject: any = null;
  selectedProjectId: any = null;
  Subscription: Subscription = new Subscription();
  apprasialForm: any = null;
  form: any = null;
  apprasialRequest: any = null;
  apprasialRequests: any = [];
  submitData: any = null;
  loggedUser: any = null;

  @Output() showFillApprasialBtn: boolean = false;
  @Input() preAppViewType: string = 'fill';

  constructor(
    private _projectsStore: ProjectsStore,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _primaryAppraisalFormsStore: PrimaryAppraisalFormsStore,
    private _primaryAppraisalRequestsStore: PrimaryAppraisalRequestsStore,
  ) { }

  ngOnInit(): void {

    this.loggedUser = JSON.parse(localStorage.getItem('user'));

    this._activatedRoute.paramMap.subscribe(params => {
      this.selectedProjectId = params.get("projectId");
      const project = this._projectsStore.getProject(this.selectedProjectId);
      setCurrentProject(
        project.name,
        project.type,
        project.status,
        project.userRef,
        project.key,
        project.primaryAppraisalStatus,
        project.primaryAppraisalStartDate,
        project.primaryAppraisalEndDate,
        project.extendedAppraisalStatus,
        project.extendedAppraisalExpiry,
      );
    });
    currentProjectReplay.subscribe((data) => {
      this.selectedProject = data;
      console.log("SELCTED PROJECT ID IS:--", this.selectedProjectId, this.selectedProject);
    })
    this._primaryAppraisalFormsStore.state$.subscribe(data => {
      this.form = data.primaryAppraisals[0];
      console.log("APPRASIAL FORM:----", this.form);
    })
    this.Subscription.add(
      this._primaryAppraisalRequestsStore.state$.subscribe(data => {
        this.apprasialRequests = data.requests;
        for (let i = 0; i < this.apprasialRequests.length; i++) {
          if (this.apprasialRequests[i].projectRef === this.selectedProjectId) {
            this.apprasialRequest = this.apprasialRequests[i];
            this.submitData = this.apprasialRequests[i].submitData;
            break;
          }
        }
        if (this.apprasialRequest) {
          this.form.exists = true
        }else {
          this.form.exists = false
        }
        console.log("APPRASIAL REQUESTS:----\n", this.apprasialRequests,
          "\nSINGLE REQUEST:---\n", this.apprasialRequest,
          "\nSUBMIT DATA:---\n", this.submitData,
        );
      })
    );
    // this.Subscription.add(
    // );

  }

  onSubmit($event) {
    console.log("FORM SUBMIT DATA:---", $event.data);
    this.submitData = $event.data;
    this._primaryAppraisalRequestsStore.addRequest(
      this.selectedProjectId,
      this.loggedUser.username,
      $event.data,
      'appresial-form',
      null,
      'pending',
    )
    this.form.exists = true;
  }

  completeTask(){
    setCurrentProject(
      this.selectedProject.name,
      this.selectedProject.type,
      this.selectedProject.status,
      this.selectedProject.userRef,
      this.selectedProject.key,
      'submitted',
      this.selectedProject.primaryAppraisalStartDate,
      new Date().toISOString(),
      this.selectedProject.extendedAppraisalStatus,
      this.selectedProject.extendedAppraisalExpiry,
    );
    this._projectsStore.completeAppraisalTask(this.selectedProjectId);
    this._primaryAppraisalRequestsStore.submitAppraisalRequest(this.selectedProjectId);
  }

  ngOnDestroy() {
    // currentProjectReplay.unsubscribe();
  }

}
