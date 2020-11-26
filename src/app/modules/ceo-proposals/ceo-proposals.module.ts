import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CeoProposalsRoutingModule } from "./ceo-proposals-routing.module";
import { CeoProposalComponent } from "../../components/component-index";
import { ProjectsModule } from '../projects/projects.module';

@NgModule({
  declarations: [
    CeoProposalComponent
  ],
  imports: [
    CommonModule,
    CeoProposalsRoutingModule,
    ProjectsModule
  ]
})
export class CeoProposalsModule { }
