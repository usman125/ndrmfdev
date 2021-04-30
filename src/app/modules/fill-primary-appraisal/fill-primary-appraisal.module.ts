import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FillPrimaryAppraisalComponent } from '../../components/component-index';
import { FillPrimaryAppraisalRoutingModule } from "./fill-primary-appraisal-routing.module";
import { FormioModule } from "angular-formio";
import { MatCardModule } from "@angular/material/card";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { ProjectDetailsModule } from "../project-details/project-details.module";
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgxPrintModule } from 'ngx-print';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [
    FillPrimaryAppraisalComponent,
  ],
  imports: [
    CommonModule,
    FillPrimaryAppraisalRoutingModule,
    ProjectDetailsModule,
    FormioModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    NgxPrintModule,
    MatTooltipModule
  ],
  exports: [FillPrimaryAppraisalComponent]
})
export class FillPrimaryAppraisalModule { }
