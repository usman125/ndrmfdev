import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GiaCommentsMatrixComponent } from '../../components/component-index';
const routes: Routes = [
  {
    path: '',
    component: GiaCommentsMatrixComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GiaCommentsMatrixRoutingModule { }
