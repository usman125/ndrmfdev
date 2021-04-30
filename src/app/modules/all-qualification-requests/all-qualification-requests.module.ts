import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllQualificationRequestsRoutingModule } from './all-qualification-requests-routing.module';
import { AllQualificationRequestsComponent } from '../../components/component-index';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    AllQualificationRequestsComponent
  ],
  imports: [
    CommonModule,
    AllQualificationRequestsRoutingModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatButtonModule
  ]
})
export class AllQualificationRequestsModule { }
