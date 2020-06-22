import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddExtendedAppraisalSmeRoutingModule } from "./add-extended-appraisal-sme-routing.module";
import { AddExtendedAppraisalSmeComponent } from '../../components/component-index';
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatListModule } from "@angular/material/list";
import { MatDividerModule } from "@angular/material/divider";
import { FormioModule } from "angular-formio";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    AddExtendedAppraisalSmeComponent,
  ],
  imports: [
    CommonModule,
    AddExtendedAppraisalSmeRoutingModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    FormioModule,
    MatDividerModule,
    MatListModule,
    MatProgressSpinnerModule,
  ],
  exports: [AddExtendedAppraisalSmeComponent]
})
export class AddExtendedAppraisalSmeModule { }
