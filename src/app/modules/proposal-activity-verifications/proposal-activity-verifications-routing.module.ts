import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProposalActivityVerificationsComponent } from '../../components/component-index';

const routes: Routes = [
  {
    path: '',
    component: ProposalActivityVerificationsComponent,
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ProposalActivityVerificationsRoutingModule { }
