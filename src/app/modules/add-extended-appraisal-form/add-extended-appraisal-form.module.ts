import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddExtendedAppraisalFormRoutingModule } from "./add-extended-appraisal-form-routing.module";
import { AddExtendedAppraisalFormComponent } from '../../components/component-index';

@NgModule({
  declarations: [
    AddExtendedAppraisalFormComponent,
  ],
  imports: [
    CommonModule,
    AddExtendedAppraisalFormRoutingModule,
  ]
})
export class AddExtendedAppraisalFormModule { }
