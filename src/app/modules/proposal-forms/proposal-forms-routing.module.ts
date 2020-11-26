import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProposalFormsComponent } from "../../components/component-index";

const routes: Routes = [
  {
    path: '',
    component: ProposalFormsComponent,
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
export class ProposalFormsRoutingModule { }