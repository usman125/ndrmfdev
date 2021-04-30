import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllQualificationRequestsComponent } from '../../components/component-index';

const routes: Routes = [
  {
    path: '',
    component: AllQualificationRequestsComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AllQualificationRequestsRoutingModule { }