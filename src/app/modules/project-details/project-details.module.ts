import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectDetailsComponent } from "../../components/component-index";
import { ProjectDetailsRoutingModule } from "./project-details-routing.module";
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatListModule } from "@angular/material/list";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { FormioModule } from "angular-formio";
// import { ViewPrimaryAppraisalModule } from "../view-primary-appraisal/view-primary-appraisal.module";
import { ProjectPlanModule } from "../project-plan/project-plan.module";
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [
    ProjectDetailsComponent,
  ],
  imports: [
    CommonModule,
    ProjectDetailsRoutingModule,
    ProjectPlanModule,
    MatProgressSpinnerModule,
    FormioModule,
    MatButtonModule,
    MatTabsModule,
    MatCardModule,
    MatButtonToggleModule,
    FormsModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatIconModule,
    MatToolbarModule,
    MatListModule,
    MatInputModule,
    MatChipsModule,
    MatSelectModule,
    MatTooltipModule
  ],
  exports: [ProjectDetailsComponent]
})
export class ProjectDetailsModule { }
