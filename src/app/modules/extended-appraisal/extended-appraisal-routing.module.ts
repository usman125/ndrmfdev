import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExtendedAppraisalComponent } from '../../components/component-index';

const routes: Routes = [
  {
    path: '',
    component: ExtendedAppraisalComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExtendedAppraisalRoutingModule { }
