import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QprSectionsComponent } from '../../components/component-index';

const routes: Routes = [
  {
    path: '',
    component: QprSectionsComponent,
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class QprSectionsRoutingModule { }
