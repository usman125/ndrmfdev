import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimaryAppraisalFormsRoutingModule } from "./primary-appraisal-forms-routing.module";
import { PrimaryAppraisalFormsComponent } from '../../components/component-index';

@NgModule({
  declarations: [
    PrimaryAppraisalFormsComponent
  ],
  imports: [
    CommonModule,
    PrimaryAppraisalFormsRoutingModule,
  ]
})
export class PrimaryAppraisalFormsModule { }
