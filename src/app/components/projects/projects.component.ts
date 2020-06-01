import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProjectsStore } from '../../stores/projects/projects-store';
import { Router } from "@angular/router";
import { AddProjectModelService } from "../../services/add-project-model.service";
import { setCurrentProject } from "../../stores/projects/project-replay";
// import { trigger, state, style, transition, animate } from '@angular/animations';
import { ProjectService } from "../../services/project.service";

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  providers: [AddProjectModelService],
  // animations: [
  //   trigger('changeDivSize', [
  //     state('initial', style({
  //       backgroundColor: 'green',
  //       width: '100px',
  //       height: '100px'
  //     })),
  //     state('final', style({
  //       backgroundColor: 'red',
  //       width: '200px',
  //       height: '200px'
  //     })),
  //     transition('initial=>final', animate('1500ms')),
  //     transition('final=>initial', animate('1000ms'))
  //   ]),
  // ]
})
export class ProjectsComponent implements OnInit, OnDestroy {

  allProjects: any = [];
  Subscriptions: Subscription = new Subscription();

  @Input() showAddBtn: boolean = true;
  @Input() viewType: string = null;
  filterQuery: any = null;
  loggedUser: any = null;


  constructor(
    private _projectsStore: ProjectsStore,
    private _AddProjectModelService: AddProjectModelService,
    private _projectService: ProjectService,
    private _router: Router,
  ) { }

  ngOnInit(): void {
    this.loggedUser = JSON.parse(localStorage.getItem('user'));
    // this.getAllProjects();
    if (this.loggedUser.role === 'fip') this.getAllProjects();
    if (this.loggedUser.role === 'process owner') this.getPoProjects();
    if (this.loggedUser.role === 'dm pam' && this.viewType === 'dm') this.getDmPamProjects();
    if (this.loggedUser.role === 'dm pam' && (this.viewType === 'extapp' || this.viewType === 'propapp')) this.getExtAppraisalProjects();
    if (this.loggedUser.role === 'sme') this.getExtAppraisalProjects();
    console.log("SHOW BUTTON VALUE:--", this.showAddBtn, this.viewType, this.loggedUser);
    this.Subscriptions.add(
      this._projectsStore.state$.subscribe(data => {
        console.log("PROJECTS FROM STORE:--", data.projects);
        this.allProjects = data.projects;
      })
    );
  }

  getAllProjects() {
    this._projectService.getAllProjects().subscribe(
      (result: any) => {
        console.log("RESULT ALL PROJECT:---", result);
        this._projectsStore.addAllProjects(result);
      },
      error => {
        console.log("ERROR ALL PROJECT:---", error);
      }
    );
  }

  getExtAppraisalProjects() {
    this._projectService.getExtAppraisalProjects().subscribe(
      (result: any) => {
        console.log("RESULT EXTENDED APPRAISAL PROJECT:---", result);
        this._projectsStore.addAllProjects(result);
      },
      error => {
        console.log("ERROR EXTENDED APPRAISAL PROJECT:---", error);
      }
    );
  }

  getPoProjects() {
    this._projectService.getPoProjects().subscribe(
      (result: any) => {
        console.log("RESULT ALL PO PROJECT:---", result);
        this._projectsStore.addAllProjects(result);
        // this.getExtAppraisalProjects();
      },
      error => {
        console.log("ERROR ALL PO PROJECT:---", error);
      }
    );
  }

  getDmPamProjects() {
    this._projectService.getDmPamProjects().subscribe(
      (result: any) => {
        console.log("RESULT ALL DM PAM PROJECT:---", result);
        this._projectsStore.addAllProjects(result);
      },
      error => {
        console.log("ERROR ALL DM PAM PROJECT:---", error);
      }
    );
  }

  goToDetails(item) {
    console.log("PROJECT TO VIEW:---", item);
    // setCurrentProject(
    //   item.name,
    //   item.type,
    //   item.status,
    //   item.userRef,
    //   item.key,
    //   item.primaryAppraisalStatus,
    //   item.primaryAppraisalStartDate,
    //   item.primaryAppraisalEndDate,
    //   item.extendedAppraisalStatus,
    //   item.extendedAppraisalExpiry,
    // );
    if (this.viewType == 'gia') {
      this._router.navigate(['/gia-appraisal', item.id]);
    } else if (this.viewType == 'po') {
      this._router.navigate(['/create-primary-appraisal', item.id]);
    } else if (this.loggedUser.role === 'dm pam' && this.viewType === 'dm') {
      this._router.navigate(['/fill-primary-appraisal', item.id]);
    } else if (this.loggedUser.role === 'dm pam' && this.viewType === 'extapp') {
      this._router.navigate(['/add-extended-appraisal-form', item.id]);
    } else if (this.loggedUser.role === 'dm pam' && this.viewType === 'propapp') {
      this._router.navigate(['/add-primary-appraisal-form', item.id]);
    } else if (this.loggedUser.role === 'sme' && this.viewType === 'extapp') {
      this._router.navigate(['/add-extended-appraisal-form', item.id]);
    } else if (this.loggedUser.role === 'sme' && this.viewType === 'propapp') {
      this._router.navigate(['/add-primary-appraisal-form', item.id]);
    } else {
      this._router.navigate(['/project-details', item.id]);
    }
  }


  addNewProject() {
    const options = {
      title: 'Leave page?',
      message: 'By leaving this page you will permanently lose your form changes.',
      cancelText: 'CANCEL',
      confirmText: 'ADD PROJECT'
    };
    this._AddProjectModelService.open(options);

    this._AddProjectModelService.confirmed().subscribe(confirmed => {
      if (confirmed) {
        // this.saveData();
        console.log("CONFIRMED FROM MODEL", confirmed);
        this.addProject(confirmed);
        // this._projectsStore.addProject(
        //   null,
        //   this.loggedUser.firstName + this.loggedUser.lastName,
        //   confirmed.name,
        //   'Draft',
        //   new Date().toISOString(),
        //   confirmed.thematicAreaName
        // );
      }
    });
  }

  addProject(values) {
    this._projectService.commenceNewProjects(values).subscribe(
      (result: any) => {
        console.log("RESULT ADDING PROJECT:---", result);
        this._projectsStore.addProject(
          result.id,
          this.loggedUser.firstName + this.loggedUser.lastName,
          values.name,
          'Draft',
          new Date().toISOString(),
          values.thematicAreaName
        )
      },
      error => {
        console.log("ERROR ADDING PROJECT:---", error);
      }
    );

  }

  ngOnDestroy(): void {
    this._projectsStore.addAllProjects([]);
    this.Subscriptions.unsubscribe();
  }


  // ANIMATION 
  // currentState = 'initial';

  // changeState() {
  //   this.currentState = this.currentState === 'initial' ? 'final' : 'initial';
  // }

}
