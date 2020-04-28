import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExtendedAppraisalComponent } from '../../components/component-index';
import { ExtendedAppraisalRoutingModule } from "./extended-appraisal-routing.module";

@NgModule({
  declarations: [
    ExtendedAppraisalComponent,
  ],
  imports: [
    CommonModule,
    ExtendedAppraisalRoutingModule,
  ]
})
export class ExtendedAppraisalModule { }
