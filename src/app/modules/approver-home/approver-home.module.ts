import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApproverHomeRoutingModule } from './approver-home-routing.module';
import { ApproverHomeComponent } from '../../components/component-index';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';



@NgModule({
  declarations: [
    ApproverHomeComponent
  ],
  imports: [
    CommonModule,
    ApproverHomeRoutingModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatCardModule,
  ]
})
export class ApproverHomeModule { }
