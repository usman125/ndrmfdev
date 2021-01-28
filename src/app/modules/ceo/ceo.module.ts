import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CeoRoutingModule } from "./ceo-routing.module";
import { CEOComponent } from '../../components/component-index';
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from "@angular/material/table";
import { MatCardModule } from "@angular/material/card";
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

@NgModule({
  declarations: [
    CEOComponent,
  ],
  imports: [
    CommonModule,
    CeoRoutingModule,
    MatPaginatorModule,
    MatCardModule,
    MatTableModule,
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
export class CEOModule { }
