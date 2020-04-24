import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectPlanModule } from "../project-plan/project-plan.module";
import { AdminPipRoutingModule } from "./admin-pip-routing.module";
import { AdminPipComponent } from "../../components/component-index";

@NgModule({
  declarations: [
    AdminPipComponent
  ],
  imports: [
    CommonModule,
    ProjectPlanModule,
    AdminPipRoutingModule,
  ]
})
export class AdminPipModule { }
