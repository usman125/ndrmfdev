
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GmProposalComponent } from '../../components/component-index';

const routes: Routes = [
  {
    path: '',
    component: GmProposalComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GmProposalsRoutingModule { }