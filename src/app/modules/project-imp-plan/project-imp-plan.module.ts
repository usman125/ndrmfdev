import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectImpPlanRoutingModule } from './project-imp-plan-routing.module';
import { ProjectImpPlanComponent } from '../../components/component-index';

import {
  FormsModule,
  ReactiveFormsModule
} from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatDividerModule } from "@angular/material/divider";
import { MatTreeModule } from "@angular/material/tree";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatGridListModule } from "@angular/material/grid-list";
import { FormioModule } from "angular-formio";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { CostDetailsModule } from '../cost-details/cost-details.module';



@NgModule({
  declarations: [
    ProjectImpPlanComponent
  ],
  imports: [
    CommonModule,
    ProjectImpPlanRoutingModule,
    CostDetailsModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatDividerModule,
    MatTreeModule,
    MatToolbarModule,
    MatCheckboxModule,
    MatGridListModule,
    FormioModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatButtonToggleModule
  ],
  exports: [ProjectImpPlanComponent]
})
export class ProjectImpPlanModule { }
