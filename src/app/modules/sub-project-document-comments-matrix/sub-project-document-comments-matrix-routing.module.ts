import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SubProjectDocumentCommentsMatrixComponent } from '../../components/component-index';

const routes: Routes = [
  {
    path: '',
    component: SubProjectDocumentCommentsMatrixComponent,
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubProjectDocumentCommentsMatrixRoutingModule { }