import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectDetailsComponent } from "../../components/component-index";
import { ProjectDetailsRoutingModule } from "./project-details-routing.module";
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    ProjectDetailsComponent,
  ],
  imports: [
    CommonModule,
    MatTabsModule,
    MatCardModule,
    MatButtonToggleModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    ProjectDetailsRoutingModule,
  ]
})
export class ProjectDetailsModule { }
