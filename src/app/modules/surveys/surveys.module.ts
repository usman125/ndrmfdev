import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SurveysComponent } from "../../components/component-index";
import { SurveysRoutingModule } from "./surveys-routing.module";
import { MatTableModule } from "@angular/material/table";
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from "@angular/material/icon";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatListModule } from "@angular/material/list";
import { MatInputModule } from "@angular/material/input";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { FormioModule } from 'angular-formio';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    SurveysComponent,
  ],
  imports: [
    CommonModule,
    MatTableModule,
    SurveysRoutingModule,
    MatIconModule,
    MatPaginatorModule,
    MatToolbarModule,
    MatCardModule,
    FormioModule,
    MatButtonModule,
    MatSortModule,
    MatListModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
  ]
})

export class SurveysModule { }
