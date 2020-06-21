import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProposalFileMatrixComponent } from '../../components/component-index';
const routes: Routes = [
  {
    path: '',
    component: ProposalFileMatrixComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProposalFileMatrixRoutingModule { }
