import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QualificationReportComponent } from '../../components/component-index';

const routes: Routes = [
  {
    path: '',
    component: QualificationReportComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QualificationReportRoutingModule { }