import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExtendedAppraisalFormsComponent } from '../../components/component-index';
import { ExtendedAppraisalFormsRoutingModule } from "./extended-appraisal-forms-routing.module";


@NgModule({
  declarations: [
    ExtendedAppraisalFormsComponent,
  ],
  imports: [
    CommonModule,
    ExtendedAppraisalFormsRoutingModule,
  ]
})
export class ExtendedAppraisalFormsModule { }
