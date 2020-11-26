import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddProposalSectionComponent } from '../../components/component-index';

const routes: Routes = [
  {
    path: '',
    component: AddProposalSectionComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddProposalRoutingModule { }