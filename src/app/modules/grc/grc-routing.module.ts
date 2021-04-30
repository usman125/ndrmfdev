import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GRCComponent} from '../../components/component-index'

const routes: Routes = [
  {
    path: '',
    component: GRCComponent,
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class GRCRoutingModule { }
