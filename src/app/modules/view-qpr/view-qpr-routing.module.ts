import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewQprComponent } from '../../components/component-index';

const routes: Routes = [
  {
    path: '',
    component: ViewQprComponent,
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ViewQprRoutingModule { }
