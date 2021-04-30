import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UpdateComplaintComponent } from '../../components/component-index';

const routes: Routes = [
  {
    path: '',
    component: UpdateComplaintComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class UpdateComplaintComponentRoutingModule { }
