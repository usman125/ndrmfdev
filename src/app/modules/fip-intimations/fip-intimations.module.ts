import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IntimateFip } from "../../components/component-index";
import { IntimateFipRoutingModule } from "./fip-initmations-routing.module";
import { SectionSelectorComponent } from '../../components/section-selector/section-selector.component';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    IntimateFip,
    SectionSelectorComponent,
  ],
  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    IntimateFipRoutingModule,
  ],
  exports: [],
  providers: [
    {
      provide: MatDialogRef,
      useValue: []
    },
    {
      provide: MAT_DIALOG_DATA,
      useValue: []
    }
  ]
})
export class IntimateFipModule { }
