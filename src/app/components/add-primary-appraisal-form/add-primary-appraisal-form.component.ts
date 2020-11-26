import { Component, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-add-primary-appraisal-form',
  templateUrl: './add-primary-appraisal-form.component.html',
  styleUrls: ['./add-primary-appraisal-form.component.css']
})
export class AddPrimaryAppraisalFormComponent implements OnInit {

  @Output() viewType: string = 'propapp';

  constructor() { }

  ngOnInit(): void {
  }

}
