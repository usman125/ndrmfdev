import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExtendedAppraisalFormsComponent } from '../../components/component-index';
import { ExtendedAppraisalFormsRoutingModule } from "./extended-appraisal-forms-routing.module";
// import { MatTooltipModule } from '@angular/material/tooltip';


@NgModule({
  declarations: [
    ExtendedAppraisalFormsComponent,
  ],
  imports: [
    CommonModule,
    ExtendedAppraisalFormsRoutingModule,
    
  ]
})
export class ExtendedAppraisalFormsModule { }
