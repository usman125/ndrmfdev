import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddProjectDialogComponent } from '../../components/component-index';
import { AddProjectDialogRoutingModule } from "./add-project-dialog-routing.module";
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from "@angular/material/input";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatRadioModule } from "@angular/material/radio";
import {
  FormsModule,
  ReactiveFormsModule
} from "@angular/forms";


@NgModule({
  declarations: [
    AddProjectDialogComponent,
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatRadioModule,
    AddProjectDialogRoutingModule,
  ]
})

export class AddProjectDialogModule { }
