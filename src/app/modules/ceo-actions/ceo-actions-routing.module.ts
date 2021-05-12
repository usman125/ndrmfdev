
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CeoActionsComponent } from '../../components/component-index';

const routes: Routes = [
  {
    path: '',
    component: CeoActionsComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CeoActionsComponentRoutingModule { }