import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CostDetailsComponent } from '../../components/component-index';
import { CostDetailsRoutingModule } from './cost-details-routing.module';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormioModule } from 'angular-formio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';



@NgModule({
  declarations: [
    CostDetailsComponent,
  ],
  imports: [
    CommonModule,
    CostDetailsRoutingModule,
    MatInputModule,
    MatTabsModule,
    // MatTabGroup
    MatButtonModule,
    FormsModule,
    FormioModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatSelectModule,
    MatChipsModule
  ],
  exports: [CostDetailsComponent]
})
export class CostDetailsModule { }
