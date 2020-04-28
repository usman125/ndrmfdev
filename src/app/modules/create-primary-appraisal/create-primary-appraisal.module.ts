import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreatePrimaryAppraisalRoutingModule } from "./create-primary-appraisal-routing.module";
import { CreatePrimaryAppraisalComponent } from "../../components/component-index";
import { ProjectDetailsModule } from "../project-details/project-details.module";


@NgModule({
  declarations: [
    CreatePrimaryAppraisalComponent,
  ],
  imports: [
    CommonModule,
    CreatePrimaryAppraisalRoutingModule,
    ProjectDetailsModule,
  ]
})
export class CreatePrimaryAppraisalModule { }
