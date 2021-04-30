import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PoHomeComponent } from "../../components/component-index";
import { PoHomeRoutingModule } from "./po-home-routing.module";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
// import { MatGridListModule } from "@angular/material/grid-list";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { ChartsModule } from 'ng2-charts';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { ResultFrameworkReportModule } from '../result-framework-report/result-framework-report.module';
import { KpiProjectStatsModule } from '../kpi-project-stats/kpi-project-stats.module';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [
    PoHomeComponent,
  ],
  imports: [
    CommonModule,
    PoHomeRoutingModule,
    ResultFrameworkReportModule,
    KpiProjectStatsModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    // MatGridListModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    ChartsModule,
    MatButtonToggleModule,
    MatTabsModule,
    MatTooltipModule
  ]
})
export class PoHomeModule { }
