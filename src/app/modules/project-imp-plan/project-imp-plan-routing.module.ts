import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectImpPlanComponent } from '../../components/component-index';

const routes: Routes = [
  {
    path: '',
    component: ProjectImpPlanComponent,
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ProjectImpPlanRoutingModule { }