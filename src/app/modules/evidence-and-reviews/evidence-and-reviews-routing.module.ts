import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EvidenceAndReviewsComponent } from '../../components/component-index';


const routes: Routes = [
  {
    path: '',
    component: EvidenceAndReviewsComponent,
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class EvidenceAndReviewsComponentRoutingModule { }
