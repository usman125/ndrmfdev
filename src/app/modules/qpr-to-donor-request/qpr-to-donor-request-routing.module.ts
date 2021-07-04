import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QprToDonorRequestComponent } from '../../components/component-index';

const routes: Routes = [
  {
    path: '',
    component: QprToDonorRequestComponent,
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class QprToDonorRequestRoutingModule { }
