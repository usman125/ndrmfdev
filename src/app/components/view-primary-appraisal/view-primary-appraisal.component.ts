import { Component, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-view-primary-appraisal',
  templateUrl: './view-primary-appraisal.component.html',
  styleUrls: ['./view-primary-appraisal.component.css']
})
export class ViewPrimaryAppraisalComponent implements OnInit {

  @Output() preAppViewType: string = 'view';

  constructor() { }

  ngOnInit(): void {
  }

}
