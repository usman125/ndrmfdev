import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsModule } from "../projects/projects.module";
import { UserProjectsRoutingModule } from "./user-projects-routing.module";
import { UserProjectsComponent } from "../../components/component-index";

@NgModule({
  declarations: [
    UserProjectsComponent,
  ],
  imports: [
    CommonModule,
    UserProjectsRoutingModule,
    ProjectsModule,
  ]
})
export class UserProjectsModule { }
