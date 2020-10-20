import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EligibilityRequestViewRoutingModule } from './eligibility-request-view-routing.module';
import { EligibilityRequestViewComponent } from '../../components/component-index';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    EligibilityRequestViewComponent
  ],
  imports: [
    CommonModule,
    EligibilityRequestViewRoutingModule,
    MatToolbarModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    FormsModule
  ]
})
export class EligibilityRequestViewModule { }
