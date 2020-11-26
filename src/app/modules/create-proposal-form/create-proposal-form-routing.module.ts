import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateProposalFormComponent } from '../../components/component-index';

const routes: Routes = [
  {
    path: '',
    component: CreateProposalFormComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateProposalFormRoutingModule { }