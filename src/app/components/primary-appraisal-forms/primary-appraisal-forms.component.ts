import { Component, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-primary-appraisal-forms',
  templateUrl: './primary-appraisal-forms.component.html',
  styleUrls: ['./primary-appraisal-forms.component.css']
})
export class PrimaryAppraisalFormsComponent implements OnInit {

  @Output() showAddBtn: any = false;
  @Output() viewType: string = 'propapp';

  constructor() { }

  ngOnInit(): void {
  }

}
