import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FipHomeComponent } from '../../components/component-index';


const routes: Routes = [
  {
    path: '',
    component: FipHomeComponent,
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FipHomeRoutingModule { }