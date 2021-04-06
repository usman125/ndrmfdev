import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { FormioModule } from 'angular-formio';
import { ViewGovtAgencyRequestRoutingModule } from './view-govt-agency-request-routing.module';
import { ViewGovtAgencyRequestComponent } from '../../components/component-index';
import { MatListModule } from '@angular/material/list';
import { MatChipsModule } from '@angular/material/chips';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';


@NgModule({
  declarations: [
    ViewGovtAgencyRequestComponent,
  ],
  imports: [
    CommonModule,
    ViewGovtAgencyRequestRoutingModule,
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
    ReactiveFormsModule,
    FormioModule,
    MatListModule,
    MatChipsModule,
    MatCheckboxModule,
    MatInputModule
  ],
  exports: [ViewGovtAgencyRequestComponent]
})
export class ViewGovtAgencyRequestModule { }
