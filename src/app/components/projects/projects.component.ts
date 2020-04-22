import { Component, OnInit, OnDestroy } from '@angular/core';
import {Subscription} from 'rxjs';
import {ProjectsStore} from '../../stores/projects/projects-store';
import { Router } from "@angular/router";
import { AddProjectModelService } from "../../services/add-project-model.service";

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
        this.allProjects = data.peojects;
      })
    );
  }

  goToDetails(item){
    console.log("PROJECT TO VIEW:---", item);
    this._router.navigate(['/project-details']);
  }
  

  addNewProject(){
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
