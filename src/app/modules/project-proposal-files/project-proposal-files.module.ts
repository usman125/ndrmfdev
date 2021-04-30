import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectProposalFilesComponent } from '../../components/component-index';
import { ProjectProposalFilesRoutingModule } from './project-proposal-files-routing.module';
import { MatTreeModule } from '@angular/material/tree';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    ProjectProposalFilesComponent
  ],
  imports: [
    CommonModule,
    ProjectProposalFilesRoutingModule,
    MatTreeModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [ProjectProposalFilesComponent]
})
export class ProjectProposalFilesModule { }
