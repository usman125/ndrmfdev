import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddExtendedAppraisalFormComponent } from '../../components/component-index';

const routes: Routes = [
  {
    path: '',
    component: AddExtendedAppraisalFormComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddExtendedAppraisalFormRoutingModule { }
