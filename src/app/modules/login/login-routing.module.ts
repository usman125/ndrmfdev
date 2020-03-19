import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../../components/component-index';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
]

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class LoginRoutingModule { }