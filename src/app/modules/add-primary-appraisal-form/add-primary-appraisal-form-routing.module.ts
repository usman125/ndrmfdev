import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddPrimaryAppraisalFormComponent } from '../../components/component-index';

const routes: Routes = [
  {
    path: '',
    component: AddPrimaryAppraisalFormComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddPrimaryAppraisalFormRoutingModule { }
