import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreatePrimaryAppraisalComponent } from '../../components/component-index';

const routes: Routes = [
  {
    path: '',
    component: CreatePrimaryAppraisalComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreatePrimaryAppraisalRoutingModule { }