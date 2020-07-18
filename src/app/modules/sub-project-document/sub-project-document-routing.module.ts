import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SubProjectDocumentComponent } from '../../components/component-index';

const routes: Routes = [
  {
    path: '',
    component: SubProjectDocumentComponent,
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubProjectDocumentRoutingModule { }