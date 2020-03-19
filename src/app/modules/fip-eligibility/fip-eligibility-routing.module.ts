import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FipEligibilityComponent } from '../../components/component-index';


const routes: Routes = [
  {
    path: '',
    component: FipEligibilityComponent,
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FipEligibilityRoutingModule { }