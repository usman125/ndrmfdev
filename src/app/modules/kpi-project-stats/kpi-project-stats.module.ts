import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KpiProjectStatsRoutingModule } from './kpi-project-stats-routing.module';
import { KpiProjectStatsComponent } from '../../components/component-index';
import { FormsModule } from '@angular/forms';
import { FormioModule } from 'angular-formio';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { ChartsModule } from 'ng2-charts';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
    KpiProjectStatsComponent
  ],
  imports: [
    CommonModule,
    KpiProjectStatsRoutingModule,
    FormsModule,
    FormioModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatIconModule,
    ChartsModule,
    MatButtonModule
  ],
  exports: [KpiProjectStatsComponent]
})
export class KpiProjectStatsModule { }
