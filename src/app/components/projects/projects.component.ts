import { Component, OnInit, OnDestroy } from '@angular/core';
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

  constructor(
    private _projectsStore: ProjectsStore,
    private _AddProjectModelService: AddProjectModelService,
    private _router: Router,
  ) { }

  ngOnInit(): void {
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
    );
    this._router.navigate(['/project-details', item.key]);
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
