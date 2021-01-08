import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultFrameworkReportRoutingModule } from './result-framework-report-routing.module';
import { ResultFrameworkReportComponent } from '../../components/component-index';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ChartsModule } from 'ng2-charts';



@NgModule({
  declarations: [
    ResultFrameworkReportComponent
  ],
  imports: [
    CommonModule,
    ResultFrameworkReportRoutingModule,
    MatButtonToggleModule,
    MatButtonModule,
    MatIconModule,
    ChartsModule
  ],
  exports: [ResultFrameworkReportComponent]
})
export class ResultFrameworkReportModule { }
