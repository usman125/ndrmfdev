import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectPlanComponent } from '../../components/component-index';

const routes: Routes = [
  {
    path: '',
    component: ProjectPlanComponent,
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ProjectPlanRoutingModule { }