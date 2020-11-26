import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddSmeComponent } from '../../components/component-index';

const routes: Routes = [
  {
    path: '',
    component: AddSmeComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddSmeRoutingModule { }