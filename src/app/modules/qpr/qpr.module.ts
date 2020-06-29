import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QprRoutingModule } from './qpr-routing.module';
import { QprComponent } from '../../components/component-index';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';



@NgModule({
  declarations: [
    QprComponent
  ],
  imports: [
    CommonModule,
    QprRoutingModule,
    MatCardModule,
    MatInputModule,
    MatToolbarModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTooltipModule
  ],
  exports: [QprComponent]
})
export class QprModule { }
