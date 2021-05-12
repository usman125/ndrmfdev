import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AssignToConcernPersonComponent} from '../../components/component-index';

const routes: Routes = [
  {
    path: '',
    component: AssignToConcernPersonComponent,
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AssignToConcernedPersonRoutingModule { }
