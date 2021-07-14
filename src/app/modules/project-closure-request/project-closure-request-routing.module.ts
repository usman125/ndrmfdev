import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectClosureRequestComponent } from '../../components/component-index';

const routes: Routes = [
  {
    path: '',
    component: ProjectClosureRequestComponent,
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ProjectClosureRequestRoutingModule { }
