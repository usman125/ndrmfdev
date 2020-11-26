import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfirmDialogComponent } from '../../components/component-index';

const routes: Routes = [
  {
    path: '',
    component: ConfirmDialogComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfirmDialogRoutingModule { }