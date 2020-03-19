import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EligibilityRequestsComponent } from '../../components/component-index';

const routes: Routes = [
  {
    path: '',
    component: EligibilityRequestsComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EligibilityRequestsRoutingModule { }