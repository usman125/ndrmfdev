import { Component, OnInit, Input } from '@angular/core';
import { AuthStore } from '../../stores/auth/auth-store';
import { Subscription } from 'rxjs';
import * as _ from 'lodash';

@Component({
  selector: 'app-project-work-plan',
  templateUrl: './project-work-plan.component.html',
  styleUrls: ['./project-work-plan.component.css']
})
export class ProjectWorkPlanComponent implements OnInit {

  // @Input() proMonths: any = 20;
  proMonths: any = 20;

  mainOutputId: any = null;
  activity: any = null;
  output: any = null;

  outPutArray: any = [];
  quartersArray: any = [];

  quarters: any = [];
  phase: any = null;

  Subscription: Subscription = new Subscription();


  workPlanPhases: any = [
    {
      title: 'Inception Phase',
      _id: 'IncPhase'
    },
    {
      title: 'Implementation Phase',
      _id: 'ImpPhase',
    },
    {
      title: 'Project Completion Phase',
      _id: 'ComPhase',
    },
  ];

  constructor(
    private _authStore: AuthStore,
  ) { }

  ngOnInit(): void {
    console.log("MONTHS IN WORK PLAN:---", this.proMonths);
    this.quarters = Math.ceil(this.proMonths / 3);
    // this.Subscription.add(
    //   this._authStore.state$.subscribe(data => {
    //     this.proMonths = data.auth.proMonths;
    //     this.quarters = Math.ceil(this.proMonths / 3);
    //   })
    // );
    for (let i = 0; i < this.quarters; i++) {
      var quarter = {
        title: i,
        included: false
      }
      this.quartersArray.push(quarter);
    }
    console.log("PROJECT MONTHS IN PROPOSED WORK PLAN:---", this.proMonths, this.quarters, this.quartersArray);
  }

  addMainOutput() {
    var output = {
      title: this.output,
      _id: new Date().toISOString(),
      activities: [],
    }
    this.outPutArray.push(output);
    for (let i = 0; i < this.workPlanPhases.length; i++) {
      if (this.phase === this.workPlanPhases[i]._id) {
        this.workPlanPhases[i].output = this.outPutArray;
      }
    }
    this.output = null;
    this.phase = null;
    console.log("WORK PLAN PHASES:--", this.workPlanPhases);
  }

  mainOutputChanged($event) {
    console.log("MAIN OUT PUT CHANGED:--", $event);
  }

  AddActivity() {
    var activity = {
      title: this.activity,
      _id: new Date().toISOString(),
      outPutId: this.mainOutputId,
      quarters: []
    }
    for (let i = 0; i < this.quarters; i++) {
      var quarter = {
        title: i,
        included: false
      }
      activity.quarters.push(quarter);
    }
    for (let i = 0; i < this.workPlanPhases.length; i++) {
      if (this.workPlanPhases[i].output) {
        for (let j = 0; j < this.workPlanPhases[i].output.length; j++) {
          if (this.workPlanPhases[i].output[j]._id === this.mainOutputId) {
            this.workPlanPhases[i].output[j].activities.push(activity);
          }
        }
      }
    }
    console.log("ACTIVITIES ARRAy:--", this.workPlanPhases);
    this.mainOutputId = null;
    this.activity = null;
  }

  phaseChanged($event) {
    console.log("PHASE CHANGED:---", $event);

  }

  addToQuarter(cost, item, outcome) {
    console.log("ITEM TO ADD:---", cost, item, outcome);
    // for (let i = 0; i < this.workPlanPhases.length; i++) {
    //   if (this.workPlanPhases[i].output) {
    for (let j = 0; j < outcome.quarters.length; j++) {
      if (outcome.quarters[j].title === item.title) {
        outcome.quarters[j].included = !outcome.quarters[j].included;
      }
    }
    //   }
    // }

  }

}
