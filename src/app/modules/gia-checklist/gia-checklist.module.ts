import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GiaChecklistRoutingModule } from './gia-checklist-routing.module';
import { GiaChecklistComponent } from '../../components/component-index';


import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatToolbarModule } from "@angular/material/toolbar";
// import { MatSelectModule } from "@angular/material/select";
import { MatIconModule } from "@angular/material/icon";
// import {
//   FormsModule,
//   ReactiveFormsModule
// } from "@angular/forms";
import { FormioModule } from "angular-formio";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    GiaChecklistComponent
  ],
  imports: [
    CommonModule,
    GiaChecklistRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    // MatSelectModule,
    MatIconModule,
    // FormsModule,
    // ReactiveFormsModule,
    FormioModule,
  ],
  exports: [GiaChecklistComponent]
})
export class GiaChecklistModule { }
