import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GmHomeComponent } from '../../components/component-index';

const routes: Routes = [
  {
    path: '',
    component: GmHomeComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GmHomeRoutingModule { }