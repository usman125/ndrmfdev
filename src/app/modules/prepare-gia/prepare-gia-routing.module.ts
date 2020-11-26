import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrepareGiaComponent } from '../../components/component-index';

const routes: Routes = [
  {
    path: '',
    component: PrepareGiaComponent,
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class PrepareGiaRoutingModule { }
