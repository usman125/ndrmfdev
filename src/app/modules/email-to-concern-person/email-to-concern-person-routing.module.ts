import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmailToConcernPersonComponent } from '../../components/component-index';

const routes: Routes = [
  {
    path: '',
    component: EmailToConcernPersonComponent,
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class EmailToConcernPersonRoutingModule { }
