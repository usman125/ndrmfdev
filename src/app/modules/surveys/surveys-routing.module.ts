import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SurveysComponent, AuthGuard } from '../../components/component-index';
import { Role } from "../../models/Roles";

const routes: Routes = [
  {
    path: '',
    component: SurveysComponent,
    // canActivate:[AuthGuard],
    // data:[{
    //   roles: [Role.Admin]
    // }]
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SurveysRoutingModule { }