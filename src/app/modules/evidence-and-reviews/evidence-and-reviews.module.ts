import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EvidenceAndReviewsComponent } from '../../components/component-index';
import {EvidenceAndReviewsComponentRoutingModule} from './evidence-and-reviews-routing.module'
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
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
    EvidenceAndReviewsComponent
  ],
  imports: [
    CommonModule,
    EvidenceAndReviewsComponentRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    MatSortModule,
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
export class EvidenceAndReviewsModule { }
