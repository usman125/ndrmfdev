import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FillProposalReportsComponent } from '../../components/component-index';

const routes: Routes = [
  {
    path: '',
    component: FillProposalReportsComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FillProposalReportsRoutingModule { }