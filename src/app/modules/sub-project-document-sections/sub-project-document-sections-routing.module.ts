import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SmeComponent } from '../../components/component-index';

const routes: Routes = [
  {
    path: '',
    component: SmeComponent,
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubProjectDocumentSectionsRoutingModule { }
