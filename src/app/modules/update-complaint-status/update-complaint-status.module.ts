import { UpdateComplaintStatusRoutingModule } from './update-complain-status.routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpdateComplaintStatusComponent } from '../../components/component-index';
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { MatSelectModule } from "@angular/material/select";
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from "@angular/material/card";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";


@NgModule({
  declarations: [
    UpdateComplaintStatusComponent
  ],
  imports: [
    CommonModule,
    UpdateComplaintStatusRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    MatSortModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    FormsModule,ReactiveFormsModule,
    MatChipsModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatInputModule

  ]
})
export class UpdateComplaintStatusModule { }
