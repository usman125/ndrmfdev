import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PoHomeComponent } from '../../components/component-index';

const routes: Routes = [
  {
    path: '',
    component: PoHomeComponent,
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class PoHomeRoutingModule { }
