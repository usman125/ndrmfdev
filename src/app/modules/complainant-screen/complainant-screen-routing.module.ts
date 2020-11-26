import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ComplainantScreenComponent} from '../../components/component-index'

const routes: Routes = [
  {
    path: '',
    component: ComplainantScreenComponent,
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ComplainantScreenRoutingModule { }
