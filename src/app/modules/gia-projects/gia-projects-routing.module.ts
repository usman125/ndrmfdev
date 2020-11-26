import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GiaProjectsComponent } from '../../components/component-index';
const routes: Routes = [
  {
    path: '',
    component: GiaProjectsComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GiaProjectsRoutingModule { }
