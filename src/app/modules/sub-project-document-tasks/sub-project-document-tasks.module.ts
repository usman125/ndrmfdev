import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubProjectDocumentTasksComponent } from '../../components/component-index';
import { SubProjectDocumentTasksRoutingModule } from '../sub-project-document-tasks/sub-project-document-tasks-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTooltipModule } from '@angular/material/tooltip';


@NgModule({
  declarations: [
    SubProjectDocumentTasksComponent
  ],
  imports: [
    CommonModule,
    SubProjectDocumentTasksRoutingModule,
    MatIconModule,
    MatInputModule,
    MatTableModule,
    MatCardModule,
    FormsModule,
    MatButtonModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatSortModule,
    MatTooltipModule,
  ]
})
export class SubProjectDocumentTasksModule { }
