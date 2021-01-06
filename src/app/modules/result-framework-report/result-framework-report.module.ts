import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultFrameworkReportRoutingModule } from './result-framework-report-routing.module';
import { ResultFrameworkReportComponent } from '../../components/component-index';



@NgModule({
  declarations: [
    ResultFrameworkReportComponent
  ],
  imports: [
    CommonModule,
    ResultFrameworkReportRoutingModule,
  ],
  exports: [ResultFrameworkReportComponent]
})
export class ResultFrameworkReportModule { }
