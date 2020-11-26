import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccreditationRequestComponent } from '../../components/component-index';

const routes: Routes = [
  {
    path: '',
    component: AccreditationRequestComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccreditationRequestRoutingModule { }