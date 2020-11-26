import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApproverHomeComponent } from '../../components/component-index';

const routes: Routes = [
  {
    path: '',
    component: ApproverHomeComponent,
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ApproverHomeRoutingModule { }