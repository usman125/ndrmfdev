import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddExtendedAppraisalSmeRoutingModule } from "./add-extended-appraisal-sme-routing.module";
import { AddExtendedAppraisalSmeComponent } from '../../components/component-index';

@NgModule({
  declarations: [
    AddExtendedAppraisalSmeComponent,
  ],
  imports: [
    CommonModule,
    AddExtendedAppraisalSmeRoutingModule,
  ]
})
export class AddExtendedAppraisalSmeModule { }
