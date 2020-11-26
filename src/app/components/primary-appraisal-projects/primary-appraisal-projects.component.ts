import { Component, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-primary-appraisal-projects',
  templateUrl: './primary-appraisal-projects.component.html',
  styleUrls: ['./primary-appraisal-projects.component.css']
})
export class PrimaryAppraisalProjectsComponent implements OnInit {

  @Output() viewType: string = 'dm';
  @Output() showAddBtn: boolean = false;

  constructor() { }


  ngOnInit(): void {
  }

}
