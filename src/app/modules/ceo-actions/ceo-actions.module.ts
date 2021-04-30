import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CeoActionsComponentRoutingModule} from './ceo-actions-routing.module'
import { CeoActionsComponent } from '../../components/component-index';
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from "@angular/material/card";
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

@NgModule({
  declarations: [
    CeoActionsComponent
  ],
  imports: [
    CommonModule,
    CeoActionsComponentRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    MatSortModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatChipsModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatInputModule,
  ]
})
export class CeoActionsModule { }