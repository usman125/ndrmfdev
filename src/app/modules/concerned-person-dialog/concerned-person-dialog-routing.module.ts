import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import  {ConcernedPersonDialogComponent} from '../../components/component-index'

const routes: Routes = [
  {
    path: '',
    component: ConcernedPersonDialogComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConcernedPersonDialogRoutingModule { }
