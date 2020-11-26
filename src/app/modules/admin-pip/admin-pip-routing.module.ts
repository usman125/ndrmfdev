import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminPipComponent } from '../../components/component-index';

const routes: Routes = [
  {
    path: '',
    component: AdminPipComponent,
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AdminPipRoutingModule { }