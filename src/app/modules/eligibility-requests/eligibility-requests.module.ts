import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { MatTableModule } from "@angular/material/table";
import { MatCardModule } from "@angular/material/card";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatInputModule } from "@angular/material/input";
// import { MatPaginatorModule } from "@angular/material/paginator";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { EligibilityRequestsComponent } from "../../components/component-index";
import { EligibilityRequestsRoutingModule } from "./eligibility-requests-routing.module";
import { FormioModule } from "angular-formio";
import { MatListModule } from '@angular/material/list';
import { MatChipsModule } from '@angular/material/chips';
// import { MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [
    EligibilityRequestsComponent
  ],
  imports: [
    CommonModule,
    // MatTableModule,
    MatCardModule,
    MatButtonToggleModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    FormioModule,
    MatInputModule,
    // MatPaginatorModule,
    // MatSortModule,
    MatProgressSpinnerModule,
    EligibilityRequestsRoutingModule,
    MatListModule,
    MatIconModule,
    MatChipsModule
  ]
})
export class EligibilityRequestsModule { }
