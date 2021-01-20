import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { KpiProjectStatsComponent } from '../../components/component-index';

const routes: Routes = [
  {
    path: '',
    component: KpiProjectStatsComponent,
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class KpiProjectStatsRoutingModule { }
