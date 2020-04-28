import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddPrimaryAppraisalFormRoutingModule } from "./add-primary-appraisal-form-routing.module";
import { AddPrimaryAppraisalFormComponent } from '../../components/component-index';

@NgModule({
  declarations: [
    AddPrimaryAppraisalFormComponent,
  ],
  imports: [
    CommonModule,
    AddPrimaryAppraisalFormRoutingModule,
  ]
})
export class AddPrimaryAppraisalFormModule { }
