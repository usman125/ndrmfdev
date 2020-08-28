import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

export interface Activity {
  name: string,
  subActivities: Activity[]
}

@Component({
  selector: 'app-pip',
  templateUrl: './pip.component.html',
  styleUrls: ['./pip.component.css']
})
export class PipComponent implements OnInit {
  startDate = moment();
  activitiesForm: FormGroup;
  selectedQuarters = [];
  quarters = ['Q1', 'Q2', 'Q3', 'Q4','Q5', 'Q6', 'Q7', 'Q8'];

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.activitiesForm = this.fb.group({
      activities: this.fb.array([])
    })
  }

  get activities(): FormArray { return this.activitiesForm.get('activities') as FormArray }

  addActivity() {
    this.selectedQuarters.push(this.quarters.map(q => false));
    this.activities.push(this.getActivityFormGroup());
  }

  getActivityFormGroup() {
    return this.fb.group({
      name: ['', Validators.required],
      subActivities: this.fb.array([])
    })
  }

  quarterSelected(activityIndex, quarterIndex){
    this.selectedQuarters[activityIndex][quarterIndex] = !this.selectedQuarters[activityIndex][quarterIndex];
  }
}