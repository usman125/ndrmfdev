import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';;
import { AssignSectionsProcessComponent } from "../../components/component-index";

const routes: Routes = [
  {
    path: '',
    component: AssignSectionsProcessComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssignSectionsProcessRoutingModule { }
