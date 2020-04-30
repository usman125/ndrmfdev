import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditUserComponent } from '../../components/component-index';

const routes: Routes = [
  {
    path: '',
    component: EditUserComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class EditUserRoutingModule { }
