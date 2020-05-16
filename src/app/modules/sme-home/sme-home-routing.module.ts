import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SmeHomeComponent } from '../../components/component-index';

const routes: Routes = [
  {
    path: '',
    component: SmeHomeComponent,
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class SmeHomeRoutingModule { }
