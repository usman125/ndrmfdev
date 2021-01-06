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
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ProjectWorkPlanModule } from '../project-work-plan/project-work-plan.module';
import { PipComponent } from '../../components/pip/pip.component';
import { PipModule } from '../pip/pip.module';
import { ProjectImpPlanModule } from '../project-imp-plan/project-imp-plan.module';
import { ProjectProposalFilesModule } from '../project-proposal-files/project-proposal-files.module';
import { ResultFrameworkReportModule } from '../result-framework-report/result-framework-report.module';

@NgModule({
  declarations: [
    ProjectDetailsComponent,
    // PipComponent
  ],
  imports: [
    CommonModule,
    ProjectDetailsRoutingModule,
    ProjectPlanModule,
    // ProjectWorkPlanModule,
    // PipModule,
    ProjectImpPlanModule,
    ProjectProposalFilesModule,
    ResultFrameworkReportModule,
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
    MatTooltipModule,
    MatProgressBarModule,
  ],
  exports: [ProjectDetailsComponent]
})
export class ProjectDetailsModule { }
