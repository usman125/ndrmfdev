import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimaryAppraisalProjectsRoutingModule } from "./primary-appraisal-projects-routing.module";
import { ProjectsModule } from "../projects/projects.module";
import { PrimaryAppraisalProjectsComponent } from "../../components/component-index";

@NgModule({
  declarations: [
    PrimaryAppraisalProjectsComponent,
  ],
  imports: [
    CommonModule,
    PrimaryAppraisalProjectsRoutingModule,
    ProjectsModule,
  ]
})
export class PrimaryAppraisalProjectsModule { }
