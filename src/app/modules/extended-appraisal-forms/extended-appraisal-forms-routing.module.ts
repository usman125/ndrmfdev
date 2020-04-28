import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExtendedAppraisalFormsComponent } from '../../components/component-index';

const routes: Routes = [
  {
    path: '',
    component: ExtendedAppraisalFormsComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExtendedAppraisalFormsRoutingModule { }
