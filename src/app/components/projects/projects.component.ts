import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProjectsStore } from '../../stores/projects/projects-store';
import { Router } from "@angular/router";
import { AddProjectModelService } from "../../services/add-project-model.service";
import { setCurrentProject } from "../../stores/projects/project-replay";
// import { trigger, state, style, transition, animate } from '@angular/animations';
import { ProjectService } from "../../services/project.service";
// import { DataFilterPipe } from "../../pipes/data-filter.pipe";
import * as _ from 'lodash';
import { ConfirmModelService } from 'src/app/services/confirm-model.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  providers: [AddProjectModelService, ConfirmModelService]
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
    private _confirmModelService: ConfirmModelService,
    private _projectService: ProjectService,
    private _router: Router,
  ) { }

  ngOnInit(): void {
    this.loggedUser = JSON.parse(localStorage.getItem('user'));
    // this.getAllProjects();
    if (this.loggedUser.role === 'fip') this.getAllProjects();
    if (this.loggedUser.role === 'govt') this.getAllProjects();
    if (this.loggedUser.role === 'gm') this.getGmProjects();
    if (this.loggedUser.role === 'ceo') this.getCeoProjects();
    if (this.loggedUser.role === 'process owner' && this.viewType !== 'gia') this.getPoProjects();
    if (this.loggedUser.role === 'process owner' && this.viewType === 'gia') this.getGiaProjects();
    // if (this.viewType === 'gia-review') this.getGiaProjects();
    if (this.loggedUser.role === 'dm pam' && this.viewType === 'dm') this.getDmPamProjects();
    if (this.loggedUser.role === 'dm pam' && this.viewType === 'extapp') this.getExtAppraisalProjects();
    if (this.loggedUser.role === 'dm pam' && this.viewType === 'propapp') this.getAllProjects();
    if (this.loggedUser.role === 'sme') this.getExtAppraisalProjects();
    // console.log("SHOW BUTTON VALUE:--", this.showAddBtn, this.viewType, this.loggedUser);
    this.Subscriptions.add(
      this._projectsStore.state$.subscribe(data => {
        // console.log("PROJECTS FROM STORE:--", data.projects);
        this.allProjects = data.projects;
      })
    );
  }

  getAllProjects() {
    this._projectService.getAllProjects().subscribe(
      (result: any) => {
        let newResults = _.uniqBy(result, 'id');
        console.log("RESULT ALL PROJECT:---", result);
        this._projectsStore.addAllProjects(newResults);
      },
      error => {
        console.log("ERROR ALL PROJECT:---", error);
      }
    );
  }

  getGiaProjects() {
    this._projectService.getGiaProjects().subscribe(
      (result: any) => {
        let newResults = _.uniqWith(result, _.isEqual);
        // newResults.sort(function (x, y) {
        //   return x.submittedAt - y.submittedAt;
        // })
        // console.log("RESULT ALL GIA PROJECT:---", result, newResults);
        this._projectsStore.addAllProjects(newResults);
      },
      error => {
        console.log("ERROR ALL GIA PROJECT:---", error);
      }
    );
  }

  getExtAppraisalProjects() {
    this._projectService.getExtAppraisalProjects().subscribe(
      (result: any) => {
        // console.log("RESULT EXTENDED APPRAISAL PROJECT:---", result);
        let newResults = _.uniqBy(result, 'id');
        // newResults.sort(function (x, y) {
        //   return x.submittedAt - y.submittedAt;
        // })
        this._projectsStore.addAllProjects(newResults);
      },
      error => {
        console.log("ERROR EXTENDED APPRAISAL PROJECT:---", error);
      }
    );
  }

  getPoProjects() {
    this._projectService.getPoProjects().subscribe(
      (result: any) => {
        // console.log("RESULT ALL PO PROJECT:---", result);
        let newResults = _.uniqBy(result, 'id');
        // newResults.sort(function (x, y) {
        //   return x.submittedAt - y.submittedAt;
        // })
        this._projectsStore.addAllProjects(newResults);
        // this.getExtAppraisalProjects();
      },
      error => {
        console.log("ERROR ALL PO PROJECT:---", error);
      }
    );
  }

  getGmProjects() {
    this._projectService.getGmProjects().subscribe(
      (result: any) => {
        // console.log("RESULT ALL GM PROJECT:---", result);
        let newResults = _.uniqBy(result, 'id');
        // newResults.sort(function (x, y) {
        //   return x.submittedAt - y.submittedAt;
        // })
        this._projectsStore.addAllProjects(newResults);
        // this.getExtAppraisalProjects();
      },
      error => {
        console.log("ERROR ALL GM PROJECT:---", error);
      }
    );
  }

  getCeoProjects() {
    this._projectService.getCeoProjects().subscribe(
      (result: any) => {
        // console.log("RESULT ALL CEO PROJECT:---", result);
        let newResults = _.uniqBy(result, 'id');
        // newResults.sort(function (x, y) {
        //   return x.submittedAt - y.submittedAt;
        // })
        this._projectsStore.addAllProjects(newResults);
        // this.getExtAppraisalProjects();
      },
      error => {
        console.log("ERROR ALL CEO PROJECT:---", error);
      }
    );
  }

  getDmPamProjects() {
    this._projectService.getDmPamProjects().subscribe(
      (result: any) => {
        // console.log("RESULT ALL DM PAM PROJECT:---", result);
        let newResults = _.uniqBy(result, 'id');
        // newResults.sort(function (x, y) {
        //   return x.submittedAt - y.submittedAt;
        // })
        this._projectsStore.addAllProjects(newResults);
      },
      error => {
        console.log("ERROR ALL DM PAM PROJECT:---", error);
      }
    );
  }

  goToDetails(item) {
    // console.log("PROJECT TO VIEW:---", item);
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
    }
    else if (this.viewType == 'po') {
      this._router.navigate(['/create-primary-appraisal', item.id]);
    }
    else if (this.loggedUser.role === 'dm pam' && this.viewType === 'dm') {
      this._router.navigate(['/fill-primary-appraisal', item.id]);
    }
    else if (this.loggedUser.role === 'dm pam' && this.viewType === 'extapp') {
      this._router.navigate(['/add-extended-appraisal-form', item.id]);
    }
    else if (this.loggedUser.role === 'dm pam' && this.viewType === 'propapp') {
      this._router.navigate(['/add-primary-appraisal-form', item.id]);
    }
    else if (this.loggedUser.role === 'sme' && this.viewType === 'extapp') {
      this._router.navigate(['/add-extended-appraisal-form', item.id]);
    }
    else if (this.loggedUser.role === 'sme' && this.viewType === 'propapp') {
      this._router.navigate(['/add-primary-appraisal-form', item.id]);
    }
    else if (this.loggedUser.role === 'process owner' && this.viewType === 'gia') {
      this._router.navigate(['/gia-appraisal', item.id]);
    }
    else {
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
        // console.log("CONFIRMED FROM MODEL", confirmed);
        this.addProject(confirmed);
      }
    });
  }

  addProject(values) {

    const options = {
      title: '',
      message: '',
      cancelText: 'CANCEL',
      confirmText: 'ADD PROJECT',
      enableLoading: true,
      disableClose: true,
    };
    this._confirmModelService.open(options);
    this._projectService.commenceNewProjects(values).subscribe(
      (result: any) => {
        // console.log("RESULT ADDING PROJECT:---", result);
        if (this.viewType !== 'govt') {
          this._projectsStore.addProject(
            result.id,
            this.loggedUser.firstName + this.loggedUser.lastName,
            values.name,
            'Draft',
            new Date().toISOString(),
            values.thematicAreaName,
            true
          );
          this._confirmModelService.close();
          // this._router.navigate(['/project-details', result.id]);
        } else {
          this._projectsStore.addProject(
            result.id,
            this.loggedUser.firstName + this.loggedUser.lastName,
            values.name,
            'Upload PC1',
            new Date().toISOString(),
            values.thematicAreaName,
            true
          );
          // this._confirmModelService.dialogRef.close();
          this._router.navigate(['/project-details', result.id]);
          // window.location.href = '/project-details/' + result.id;
        }
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
