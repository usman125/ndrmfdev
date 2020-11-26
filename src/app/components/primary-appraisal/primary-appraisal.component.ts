import { Component, OnInit, Output, OnDestroy } from '@angular/core';
import { Subscription } from "rxjs";
import { ProjectsStore } from 'src/app/stores/projects/projects-store';

@Component({
  selector: 'app-primary-appraisal',
  templateUrl: './primary-appraisal.component.html',
  styleUrls: ['./primary-appraisal.component.css']
})
export class PrimaryAppraisalComponent implements OnInit, OnDestroy {


  Subscription: Subscription = new Subscription();

  @Output() showAddBtn: any = false;
  @Output() viewType: string = 'po';

  constructor(
    private _projectsStore: ProjectsStore,
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this._projectsStore.addAllProjects([]);
    this.Subscription.unsubscribe();
  }

}
