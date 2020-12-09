import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GmHomeRoutingModule } from './gm-home-routing.module';
import { GmHomeComponent } from 'src/app/components/component-index';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ChartsModule } from 'ng2-charts';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    GmHomeComponent
  ],
  imports: [
    CommonModule,
    GmHomeRoutingModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    ChartsModule,
    MatButtonToggleModule,
    MatIconModule
  ]
})
export class GmHomeModule { }
