import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewGrantDisbursmentComponent } from '../../components/component-index';

const routes: Routes = [
  {
    path: '',
    component: ViewGrantDisbursmentComponent,
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ViewGrantDisbursmentRoutingModule { }
