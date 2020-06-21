import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExtendedAppraisalSmesRoutingModule } from "./extended-appraisal-smes-routing.module";
import { ExtendedAppraisalSmesComponent } from '../../components/component-index';
import { MatChipsModule } from '@angular/material/chips';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgxPrintModule } from 'ngx-print';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@NgModule({
  declarations: [
    ExtendedAppraisalSmesComponent,
  ],
  imports: [
    CommonModule,
    ExtendedAppraisalSmesRoutingModule,
    MatChipsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    NgxPrintModule,
    MatProgressSpinnerModule
  ],
  exports: [ExtendedAppraisalSmesComponent]
})
export class ExtendedAppraisalSmesModule { }
