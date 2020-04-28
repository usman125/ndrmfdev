import { Component, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-primary-appraisal',
  templateUrl: './primary-appraisal.component.html',
  styleUrls: ['./primary-appraisal.component.css']
})
export class PrimaryAppraisalComponent implements OnInit {


  @Output() showAddBtn: any = false;
  @Output() viewType: string = 'po';

  constructor() { }

  ngOnInit(): void {
  }

}
