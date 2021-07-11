import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SubProjectDocumentTasksComponent } from '../../components/component-index';

const routes: Routes = [
  {
    path: '',
    component: SubProjectDocumentTasksComponent,
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubProjectDocumentTasksRoutingModule { }