import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExtendedAppraisalSmesRoutingModule } from "./extended-appraisal-smes-routing.module";
import { ExtendedAppraisalSmesComponent } from '../../components/component-index';

@NgModule({
  declarations: [
    ExtendedAppraisalSmesComponent,
  ],
  imports: [
    CommonModule,
    ExtendedAppraisalSmesRoutingModule
  ]
})
export class ExtendedAppraisalSmesModule { }
