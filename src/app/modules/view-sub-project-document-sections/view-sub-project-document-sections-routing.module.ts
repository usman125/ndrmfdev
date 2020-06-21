import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewSubProjectDocumentSectionsComponent } from '../../components/component-index';

const routes: Routes = [
  {
    path: '',
    component: ViewSubProjectDocumentSectionsComponent,
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewSubProjectDocumentSectionsRoutingModule { }
