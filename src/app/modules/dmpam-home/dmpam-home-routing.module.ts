import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DmpamHomeComponent } from '../../components/component-index';

const routes: Routes = [
  {
    path: '',
    component: DmpamHomeComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class DmpamHomeRoutingModule { }
