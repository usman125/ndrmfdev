import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import  {ConcernedPersonDialogComponent} from '../../components/component-index',
import {ConcernedPersonDialogRoutingModule} from "./concerned-person-dialog-routing.module",
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from "@angular/material/input";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';


@NgModule({
  declarations: [
    ConcernedPersonDialogComponent
  ],
  imports: [
    CommonModule,
    ConcernedPersonDialogRoutingModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatCheckboxModule
  ]
})
export class ConcernedPersonDialogModule { }
