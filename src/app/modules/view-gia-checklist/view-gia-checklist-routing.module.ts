import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewGiaChecklistComponent } from '../../components/component-index';

const routes: Routes = [
  {
    path: '',
    component: ViewGiaChecklistComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ViewGiaChecklistRoutingModule { }
