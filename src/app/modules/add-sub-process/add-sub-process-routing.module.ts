import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddSubProcessComponent } from '../../components/component-index';

const routes: Routes = [
  {
    path: '',
    component: AddSubProcessComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddSubProcessRoutingModule { }