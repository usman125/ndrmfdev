import { Component, OnInit, OnDestroy, Output, Input } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { ProjectsStore } from "../../stores/projects/projects-store";
import { PrimaryAppraisalFormsStore } from "../../stores/primary-appraisal-forms/primary-appraisal-forms-store";
import { PrimaryAppraisalRequestsStore } from "../../stores/primary-appraisal-requests/primary-appraisal-requests-store";
import { Subscription } from "rxjs";
import { setCurrentProject, currentProjectReplay } from "../../stores/projects/project-replay";
import { ProjectService } from "../../services/project.service";

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
  @Input() viewType: string = 'dm';

  pendingAppraisalDays: any = null;

  constructor(
    private _projectsStore: ProjectsStore,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _projectService: ProjectService,
    private _primaryAppraisalFormsStore: PrimaryAppraisalFormsStore,
    private _primaryAppraisalRequestsStore: PrimaryAppraisalRequestsStore,
  ) { }

  ngOnInit(): void {


    this.loggedUser = JSON.parse(localStorage.getItem('user'));

    // this._activatedRoute.paramMap.subscribe(params => {
    //   this.selectedProjectId = params.get("projectId");
    //   const project = this._projectsStore.getProject(this.selectedProjectId);
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
    // currentProjectReplay.subscribe((data) => {
    //   this.selectedProject = data;
    //   console.log("SELCTED PROJECT ID IS:--", this.selectedProjectId, this.selectedProject);
    // })
    // this.getPreAppraisalRequests();
    this.Subscription.add(
      this._primaryAppraisalFormsStore.state$.subscribe(data => {
        // this.form = data.primaryAppraisals[0];
        this.selectedProject = data.selectedProject;
        if (this.selectedProject && this.selectedProject.preAppraisal) {
          if (typeof (this.selectedProject.preAppraisal.template) === 'string') {
            this.selectedProject.preAppraisal.template = JSON.parse(this.selectedProject.preAppraisal.template);
          }
          if (typeof (this.selectedProject.preAppraisal.data) === 'string') {
            this.selectedProject.preAppraisal.data = JSON.parse(this.selectedProject.preAppraisal.data);
          }
        }
        // if (this.selectedProject && this.selectedProject.preAppraisal.data) {
        // }
        console.log("APPRASIAL FORM:----", this.selectedProject);
        if (this.selectedProject && this.selectedProject.preAppraisal) {

          var date1 = new Date();
          var date2 = new Date(this.selectedProject.preAppraisal.endDate);

          // To calculate the time difference of two dates 
          var Difference_In_Time = date2.getTime() - date1.getTime();

          // To calculate the no. of days between two dates 
          var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

          this.pendingAppraisalDays = Math.trunc(Difference_In_Days);

          console.log("TIME DIFFERENCE:", Difference_In_Days, Math.trunc(Difference_In_Days));
        }
      })
    );
    this.Subscription.add(
      this._primaryAppraisalRequestsStore.state$.subscribe(data => {
        this.apprasialRequests = data.requests;
        console.log("APPRASIAL REQUESTS:----\n", this.apprasialRequests,
          "\nSINGLE REQUEST:---\n", this.apprasialRequest,
          "\nSUBMIT DATA:---\n", this.submitData,
        );
      })
    );

  }

  getPreAppraisalRequests() {
    this._projectService.getPreAppraisalRequests().subscribe(
      result => {
        console.log("RESULT FROM PRE APPRAISAL:--", result);
      },
      error => {
        console.log("ERROR FROM PRE APPRAISAL:--", error);
      }
    );
  }


  onSubmit($event) {
    console.log("FORM SUBMIT DATA:---", $event.data);
    this.submitData = $event.data;
    this._projectService.submitPreAppraisal(this.selectedProject.id, { data: JSON.stringify($event.data) }).subscribe(
      result => {
        console.log("RESULT FROM ADDING PRE APPRAISAL:--", result);
        this._primaryAppraisalFormsStore.addPrimaryAppraisal(
          {
            data: $event.data,
            startDate: this.selectedProject.preAppraisal.startDate,
            endDate: this.selectedProject.preAppraisal.endDate,
            id: this.selectedProject.preAppraisal.id,
            status: 'Completed',
            proposalName: this.selectedProject.preAppraisal.proposalName,
            template: this.selectedProject.preAppraisal.template,
            assigned: this.selectedProject.preAppraisal.assigned,
          }
        );
      },
      error => {
        console.log("ERROR FROM ADDING PRE APPRAISAL:--", error);
      }
    )
    // this.form.exists = true;
  }

  completeTask() {
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
    // this._projectsStore.completeAppraisalTask(this.selectedProjectId);
    this._primaryAppraisalRequestsStore.submitAppraisalRequest(this.selectedProjectId);
  }

  ngOnDestroy() {
    // currentProjectReplay.unsubscribe();
  }

}
