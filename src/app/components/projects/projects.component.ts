import { Component, OnInit, OnDestroy } from '@angular/core';
import {Subscription} from 'rxjs';
import {ProjectsStore} from '../../stores/projects/projects-store';
import { Router } from "@angular/router";

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit, OnDestroy {

  allProjects: any = [];
  Subscriptions: Subscription = new Subscription();

  constructor(
    private _projectsStore: ProjectsStore,
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
  
  ngOnDestroy(): void {
    this.Subscriptions.unsubscribe();
  }

}
