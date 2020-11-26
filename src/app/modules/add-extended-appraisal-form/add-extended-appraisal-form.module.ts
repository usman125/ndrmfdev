import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddExtendedAppraisalFormRoutingModule } from "./add-extended-appraisal-form-routing.module";
import { AddExtendedAppraisalFormComponent } from '../../components/component-index';
import { ProjectDetailsModule } from "../project-details/project-details.module";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatListModule } from "@angular/material/list";
import { MatTooltipModule } from "@angular/material/tooltip";
import { AddExtendedAppraisalSmeModule } from "../add-extended-appraisal-sme/add-extended-appraisal-sme.module";

@NgModule({
  declarations: [
    AddExtendedAppraisalFormComponent,
  ],
  imports: [
    CommonModule,
    AddExtendedAppraisalFormRoutingModule,
    ProjectDetailsModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatListModule,
    AddExtendedAppraisalSmeModule,
    MatTooltipModule,
  ]
})
export class AddExtendedAppraisalFormModule { }
