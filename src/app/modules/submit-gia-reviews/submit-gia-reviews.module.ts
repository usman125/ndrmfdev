import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubmitGiaReviewsComponent } from 'src/app/components/component-index';
import { SubmitGiaReviewsRoutingModule } from './submit-gia-reviews-routing.module';
import { GiaProjectsModule } from '../gia-projects/gia-projects.module';



@NgModule({
  declarations: [
    SubmitGiaReviewsComponent
  ],
  imports: [
    CommonModule,
    SubmitGiaReviewsRoutingModule,
    GiaProjectsModule,

  ],
  exports: [SubmitGiaReviewsComponent]
})
export class SubmitGiaReviewsModule { }
