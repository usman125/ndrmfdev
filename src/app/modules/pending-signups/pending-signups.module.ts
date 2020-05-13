import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PendingSignupsComponent } from '../../components/component-index';
import { PendingSignupsRoutingModule } from "./pending-signups-routing.module";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from "@angular/material/card";
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    PendingSignupsComponent,
  ],
  imports: [
    CommonModule,
    PendingSignupsRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatTooltipModule,
    MatToolbarModule,
    MatInputModule,
  ]
})
export class PendingSignupsModule { }
