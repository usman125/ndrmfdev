import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GovtAccreditRequestsComponent } from 'src/app/components/component-index';
import { GovtAccreditRequestsRoutingModule } from './govt-accredit-requests-routing.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { ViewGovtAgencyRequestModule } from '../view-govt-agency-request/view-govt-agency-request.module';



@NgModule({
  declarations: [
    GovtAccreditRequestsComponent,
  ],
  imports: [
    CommonModule,
    GovtAccreditRequestsRoutingModule,
    ViewGovtAgencyRequestModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [GovtAccreditRequestsComponent]
})
export class GovtAccreditRequestsModule { }
