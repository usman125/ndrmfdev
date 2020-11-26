import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddProjectDialogComponent } from '../../components/component-index';

const routes: Routes = [
  {
    path: '',
    component: AddProjectDialogComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddProjectDialogRoutingModule { }