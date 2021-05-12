import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditComplainComponent } from '../../components/component-index';

const routes: Routes = [
  {
    path: '',
    component: EditComplainComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class EditComplainRoutingModule { }
