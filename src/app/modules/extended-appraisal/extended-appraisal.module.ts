import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExtendedAppraisalComponent } from '../../components/component-index';
import { ExtendedAppraisalRoutingModule } from "./extended-appraisal-routing.module";
import { ProjectsModule } from "../projects/projects.module";

@NgModule({
  declarations: [
    ExtendedAppraisalComponent,
  ],
  imports: [
    CommonModule,
    ExtendedAppraisalRoutingModule,
    ProjectsModule,
  ]
})
export class ExtendedAppraisalModule { }
