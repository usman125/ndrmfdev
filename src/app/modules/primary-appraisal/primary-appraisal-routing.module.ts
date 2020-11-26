import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrimaryAppraisalComponent } from '../../components/component-index';

const routes: Routes = [
  {
    path: '',
    component: PrimaryAppraisalComponent,
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})

export class PrimaryAppraisalRoutingModule { }
