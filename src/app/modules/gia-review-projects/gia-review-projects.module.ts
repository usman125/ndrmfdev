import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GiaReviewProjectsComponent } from 'src/app/components/component-index';
import { GiaReviewProjectsRoutingModule } from './gia-review-projects-routing.module';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';

@NgModule({
  declarations: [
    GiaReviewProjectsComponent
  ],
  imports: [
    CommonModule,
    GiaReviewProjectsRoutingModule,
    MatGridListModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    FormsModule,
    ReactiveFormsModule,
    MatChipsModule
  ]
})
export class GiaReviewProjectsModule { }
