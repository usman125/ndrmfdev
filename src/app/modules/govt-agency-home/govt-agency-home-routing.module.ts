import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GovtAgencyHomeComponent } from '../../components/component-index';

const routes: Routes = [
  {
    path: '',
    component: GovtAgencyHomeComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GovtAgencyHomeRoutingModule { }