import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimaryAppraisalFormsRoutingModule } from "./primary-appraisal-forms-routing.module";
import { PrimaryAppraisalFormsComponent } from '../../components/component-index';
import { ProjectsModule } from "../projects/projects.module";

@NgModule({
  declarations: [
    PrimaryAppraisalFormsComponent
  ],
  imports: [
    CommonModule,
    PrimaryAppraisalFormsRoutingModule,
    ProjectsModule,
  ]
})
export class PrimaryAppraisalFormsModule { }
