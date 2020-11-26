import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FillQprComponent } from '../../components/component-index';

const routes: Routes = [
  {
    path: '',
    component: FillQprComponent,
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class FillQprRoutingModule { }
