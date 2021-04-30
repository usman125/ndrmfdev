import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllEligibilityRequestsComponent } from '../../components/component-index';
import { AllEligibilityRequestsRoutingModule } from './all-eligibility-requests-routing.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    AllEligibilityRequestsComponent
  ],
  imports: [
    CommonModule,
    AllEligibilityRequestsRoutingModule,
    MatToolbarModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatIconModule
  ]
})
export class AllEligibilityRequestsModule { }
