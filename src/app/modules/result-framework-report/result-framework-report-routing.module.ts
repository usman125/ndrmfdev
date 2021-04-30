import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResultFrameworkReportComponent } from '../../components/component-index';

const routes: Routes = [
  {
    path: '',
    component: ResultFrameworkReportComponent,
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ResultFrameworkReportRoutingModule { }