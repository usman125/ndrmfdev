import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActivitiesGroupControlComponent } from '../../components/component-index';

const routes: Routes = [
  {
    path: '',
    component: ActivitiesGroupControlComponent,
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ActivitiesGroupControlRoutingModule { }
