import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShowAttachmentsComponent } from '../../components/component-index';

const routes: Routes = [
  {
    path: '',
    component: ShowAttachmentsComponent,
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ShowAttachmentsComponentRoutingModule { }
