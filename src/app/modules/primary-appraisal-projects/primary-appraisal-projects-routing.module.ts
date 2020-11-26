import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrimaryAppraisalProjectsComponent } from '../../components/component-index';


const routes: Routes = [
  {
    path: '',
    component: PrimaryAppraisalProjectsComponent,
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})

export class PrimaryAppraisalProjectsRoutingModule { }
