
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CEOComponent } from '../../components/component-index';

const routes: Routes = [
  {
    path: '',
    component: CEOComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CeoRoutingModule { }