import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GiaProjectsRoutingModule } from "./gia-projects-routing.module";
import { GiaProjectsComponent } from "../../components/component-index";
// import { ProjectsModule } from "../projects/projects.module";
// import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatSelectModule } from "@angular/material/select";
import { MatIconModule } from "@angular/material/icon";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FormioModule } from "angular-formio";
// import { ProjectDetailsModule } from "../project-details/project-details.module";
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgxPrintModule } from 'ngx-print';
import { ProjectPlanModule } from '../project-plan/project-plan.module';
import { ProjectImpPlanModule } from '../project-imp-plan/project-imp-plan.module';
import { AngularEditorModule } from '@kolkov/angular-editor';

@NgModule({
  declarations: [
    GiaProjectsComponent,
  ],
  imports: [
    CommonModule,
    // FroalaEditorModule.forRoot(),
    // FroalaViewModule.forRoot(),
    GiaProjectsRoutingModule,
    // ProjectPlanModule,
    ProjectImpPlanModule,
    // ProjectDetailsModule,
    // ProjectsModule,
    MatCardModule,
    MatToolbarModule,
    MatSelectModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    FormioModule,
    ReactiveFormsModule,
    MatListModule,
    MatInputModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    NgxPrintModule,
    AngularEditorModule,
  ],
  exports: [GiaProjectsComponent]
})
export class GiaProjectsModule { }
