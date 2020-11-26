import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddPrimaryAppraisalFormRoutingModule } from "./add-primary-appraisal-form-routing.module";
import { AddPrimaryAppraisalFormComponent } from '../../components/component-index';
import { ProjectDetailsModule } from '../project-details/project-details.module';


@NgModule({
  declarations: [
    AddPrimaryAppraisalFormComponent,
  ],
  imports: [
    CommonModule,
    AddPrimaryAppraisalFormRoutingModule,
    ProjectDetailsModule,    
  ]
})
export class AddPrimaryAppraisalFormModule { }
