import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssignComplainComponent } from '../../components/component-index';

const routes: Routes = [
  {
    path: '',
    component: AssignComplainComponent,
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AssignComplainRoutingModule { }
