import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimaryAppraisalRoutingModule } from "./primary-appraisal-routing.module";
import { PrimaryAppraisalComponent } from '../../components/component-index';
import { ProjectsModule } from "../projects/projects.module";

@NgModule({
  declarations: [
    PrimaryAppraisalComponent,
  ],
  imports: [
    CommonModule,
    PrimaryAppraisalRoutingModule,
    ProjectsModule,
  ]
})
export class PrimaryAppraisalModule { }
