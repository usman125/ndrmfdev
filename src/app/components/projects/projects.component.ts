import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProjectsStore } from '../../stores/projects/projects-store';
import { Router } from "@angular/router";
import { AddProjectModelService } from "../../services/add-project-model.service";
import { setCurrentProject } from "../../stores/projects/project-replay";

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  providers: [AddProjectModelService]
})
export class ProjectsComponent implements OnInit, OnDestroy {

  allProjects: any = [];
  Subscriptions: Subscription = new Subscription();

  @Input() showAddBtn: boolean = true;
  @Input() viewType: string = null;


  constructor(
    private _projectsStore: ProjectsStore,
    private _AddProjectModelService: AddProjectModelService,
    private _router: Router,
  ) { }

  ngOnInit(): void {
    console.log("SHOW BUTTON VALUE:--", this.showAddBtn, this.viewType);
    this.Subscriptions.add(
      this._projectsStore.state$.subscribe(data => {
        console.log(data.projects);
        this.allProjects = data.projects;
      })
    );
  }

  goToDetails(item) {
    console.log("PROJECT TO VIEW:---", item);
    setCurrentProject(
      item.name,
      item.type,
      item.status,
      item.userRef,
      item.key,
      item.primaryAppraisalStatus,
      item.primaryAppraisalStartDate,
      item.primaryAppraisalEndDate,
      item.extendedAppraisalStatus,
      item.extendedAppraisalExpiry,
    );
    if (this.viewType == 'gia') {
      this._router.navigate(['/gia-appraisal', item.key]);
    } else if (this.viewType == 'po') {
      this._router.navigate(['/create-primary-appraisal', item.key]);
    } else if (this.viewType == 'dm') {
      this._router.navigate(['/fill-primary-appraisal', item.key]);
    } else {
      this._router.navigate(['/project-details', item.key]);
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
      }
    });
  }

  ngOnDestroy(): void {
    this.Subscriptions.unsubscribe();
  }

}
