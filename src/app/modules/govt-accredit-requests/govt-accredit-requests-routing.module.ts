import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GovtAccreditRequestsComponent } from '../../components/component-index';

const routes: Routes = [
  {
    path: '',
    component: GovtAccreditRequestsComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GovtAccreditRequestsRoutingModule { }