
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssignThematicAreaComponent } from "../../components/component-index";

const routes: Routes = [
  {
    path: '',
    component: AssignThematicAreaComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AssignThematicAreaRoutingModule { }
