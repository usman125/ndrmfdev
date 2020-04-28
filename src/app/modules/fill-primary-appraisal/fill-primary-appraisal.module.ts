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
  ],
  exports: [FillPrimaryAppraisalComponent]
})
export class FillPrimaryAppraisalModule { }
