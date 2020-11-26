import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FillPrimaryAppraisalComponent } from '../../components/component-index';

const routes: Routes = [
  {
    path: '',
    component: FillPrimaryAppraisalComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FillPrimaryAppraisalRoutingModule { }
