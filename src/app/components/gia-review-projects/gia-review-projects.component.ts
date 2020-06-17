import { Component, OnInit, Output } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import { ProjectsStore } from 'src/app/stores/projects/projects-store';
import { Subscription } from "rxjs";
import { Router } from '@angular/router';

@Component({
  selector: 'app-gia-review-projects',
  templateUrl: './gia-review-projects.component.html',
  styleUrls: ['./gia-review-projects.component.css']
})
export class GiaReviewProjectsComponent implements OnInit {

  Subscription: Subscription = new Subscription();
  allProjects: any = [];
  filterQuery: any = null;

  constructor(
    private _projectService: ProjectService,
    private _projectsStore: ProjectsStore,
    private _router: Router,
  ) { }

  ngOnInit(): void {
    this.Subscription.add(
      this._projectsStore.state$.subscribe(data => {
        this.allProjects = data.projects;
      })
    )
    this.getGiaProjects();
  }

  getGiaProjects() {
    this._projectService.getGiaProjects().subscribe(
      (result: any) => {
        console.log("RESULT ALL GIA PROJECT:---", result);
        this._projectsStore.addAllProjects(result);
      },
      error => {
        console.log("ERROR ALL GIA PROJECT:---", error);
      }
    );
  }

  submitGiaReviews(item){
    console.log("SUBMIT GIA REVIEWS:--", item);
    this._router.navigate(['submit-gia-reviews', item.id]);
  }

}
