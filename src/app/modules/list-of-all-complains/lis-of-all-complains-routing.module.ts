
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListOfAllComplainsComponent} from '../../components/component-index'

const routes: Routes = [
  {
    path: '',
    component: ListOfAllComplainsComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListOfAllComplainsRoutingModule { }
