import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewPrimaryAppraisalRoutingModule } from "./view-primary-appraisal-routing.module";
import { ViewPrimaryAppraisalComponent } from "../../components/component-index";
import { FillPrimaryAppraisalModule } from "../fill-primary-appraisal/fill-primary-appraisal.module";

@NgModule({
  declarations: [
    ViewPrimaryAppraisalComponent,
  ],
  imports: [
    CommonModule,
    ViewPrimaryAppraisalRoutingModule,
    FillPrimaryAppraisalModule,
  ],
  exports: [ViewPrimaryAppraisalComponent]
})
export class ViewPrimaryAppraisalModule { }
