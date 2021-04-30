import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectProposalFilesComponent } from '../../components/component-index';

const routes: Routes = [
  {
    path: '',
    component: ProjectProposalFilesComponent,
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectProposalFilesRoutingModule { }