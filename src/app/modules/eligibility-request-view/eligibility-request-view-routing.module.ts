import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EligibilityRequestViewComponent } from '../../components/component-index';

const routes: Routes = [
  {
    path: '',
    component: EligibilityRequestViewComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EligibilityRequestViewRoutingModule { }