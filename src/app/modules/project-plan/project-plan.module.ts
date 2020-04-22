import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectPlanRoutingModule } from "./project-plan-routing.module";
import { ProjectPlanComponent, TreeComponent } from "../../components/component-index";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
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

@NgModule({
  declarations: [
    ProjectPlanComponent,
    TreeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatDividerModule,
    MatGridListModule,
    MatTreeModule,
    MatCheckboxModule,
    MatToolbarModule,
    ProjectPlanRoutingModule
  ],
  exports: [ProjectPlanComponent]
})
export class ProjectPlanModule { }
