import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FipQualificationComponent } from '../../components/component-index';


const routes: Routes = [
  {
    path: '',
    component: FipQualificationComponent,
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FipQualificationRoutingModule { }