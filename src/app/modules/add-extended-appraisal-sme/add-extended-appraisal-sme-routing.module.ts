import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddExtendedAppraisalSmeComponent } from '../../components/component-index';

const routes: Routes = [
  {
    path: '',
    component: AddExtendedAppraisalSmeComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddExtendedAppraisalSmeRoutingModule { }
