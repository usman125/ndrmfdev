import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccreditationRequestComponent, AssignTask } from "../../components/component-index";
import { AccreditationRequestRoutingModule } from "./accreditation-request-routing.module";
import { MatTableModule } from "@angular/material/table";
import { MatCardModule } from "@angular/material/card";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatInputModule } from "@angular/material/input";
import { MatDividerModule } from "@angular/material/divider";
import { BarRatingModule } from "ngx-bar-rating";
import { FormioModule } from "angular-formio";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatListModule } from '@angular/material/list';
import { MatSortModule } from '@angular/material/sort';
import { MatChipsModule } from '@angular/material/chips';
import { NgxPrintModule } from 'ngx-print';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [
    AccreditationRequestComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatListModule,
    FormioModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonToggleModule,
    MatButtonModule,
    MatInputModule,
    BarRatingModule,
    MatDividerModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    AccreditationRequestRoutingModule,
    MatSortModule,
    MatChipsModule,
    NgxPrintModule,
    MatMenuModule,
  ],
  entryComponents: [AssignTask]
})
export class AccreditationRequestModule { }
