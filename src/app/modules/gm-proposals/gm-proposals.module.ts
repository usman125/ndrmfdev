import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GmProposalsRoutingModule } from './gm-proposals-routing.module';
import { GmProposalComponent } from 'src/app/components/component-index';
import { ProjectsModule } from '../projects/projects.module';



@NgModule({
  declarations: [
    GmProposalComponent
  ],
  imports: [
    CommonModule,
    GmProposalsRoutingModule,
    ProjectsModule
  ]
})
export class GmProposalsModule { }
