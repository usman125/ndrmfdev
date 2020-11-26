import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProposalSectionsComponent } from '../../components/component-index';

const routes: Routes = [
  {
    path: '',
    component: ProposalSectionsComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProposalSectionsRoutingModule { }