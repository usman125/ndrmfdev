import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CostDetailsComponent } from '../../components/component-index';

const routes: Routes = [
  {
    path: '',
    component: CostDetailsComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CostDetailsRoutingModule { }
