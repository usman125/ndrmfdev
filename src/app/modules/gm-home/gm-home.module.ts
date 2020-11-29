import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GmHomeRoutingModule } from './gm-home-routing.module';
import { GmHomeComponent } from 'src/app/components/component-index';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';



@NgModule({
  declarations: [
    GmHomeComponent
  ],
  imports: [
    CommonModule,
    GmHomeRoutingModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatToolbarModule
  ]
})
export class GmHomeModule { }
