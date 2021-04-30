import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllQualificationRequestsRoutingModule } from '../all-qualification-requests/all-qualification-requests-routing.module';
import { QualificationReportComponent } from '../../components/component-index';



@NgModule({
  declarations: [
    QualificationReportComponent
  ],
  imports: [
    CommonModule,
    AllQualificationRequestsRoutingModule
  ]
})
export class QualificationReportModule { }
