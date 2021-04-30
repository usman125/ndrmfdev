import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SmeQprRequestsComponent } from '../../components/component-index';

const routes: Routes = [
  {
    path: '',
    component: SmeQprRequestsComponent,
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class SmeQprRequestsRoutingModule { }
