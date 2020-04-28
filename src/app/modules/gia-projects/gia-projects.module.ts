import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GiaProjectsRoutingModule } from "./gia-projects-routing.module";
import { GiaProjectsComponent } from "../../components/component-index";
import { ProjectsModule } from "../projects/projects.module";
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatSelectModule } from "@angular/material/select";
import { MatIconModule } from "@angular/material/icon";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FormioModule } from "angular-formio";
import { ProjectDetailsModule } from "../project-details/project-details.module";

@NgModule({
  declarations: [
    GiaProjectsComponent,
  ],
  imports: [
    CommonModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    GiaProjectsRoutingModule,
    ProjectDetailsModule,
    ProjectsModule,
    MatCardModule,
    MatToolbarModule,
    MatSelectModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    FormioModule,
    ReactiveFormsModule,
  ]
})
export class GiaProjectsModule { }
