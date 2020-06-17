import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GiaChecklistComponent } from '../../components/component-index';

const routes: Routes = [
  {
    path: '',
    component: GiaChecklistComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class GiaChecklistRoutingModule { }
