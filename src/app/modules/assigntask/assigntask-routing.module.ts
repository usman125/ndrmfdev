import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssignTask } from '../../components/component-index';

const routes: Routes = [
  {
    path: '',
    component: AssignTask,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssignTaskRoutingModule { }