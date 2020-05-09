import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PendingSignupsComponent } from '../../components/component-index';

const routes: Routes = [
  {
    path: '',
    component: PendingSignupsComponent,
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class PendingSignupsRoutingModule { }
