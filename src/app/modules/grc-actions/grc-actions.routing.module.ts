
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GrcActionsComponent} from '../../components/component-index'

const routes: Routes = [
  {
    path: '',
    component: GrcActionsComponent,
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class GrcActionsComponentRoutingModule { }
