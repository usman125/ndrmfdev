import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TpvComponent } from '../../components/component-index';

const routes: Routes = [
  {
    path: '',
    component: TpvComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TpvRoutingModule { }