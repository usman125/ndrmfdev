import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllEligibilityRequestsComponent } from '../../components/component-index';

const routes: Routes = [
  {
    path: '',
    component: AllEligibilityRequestsComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AllEligibilityRequestsRoutingModule { }