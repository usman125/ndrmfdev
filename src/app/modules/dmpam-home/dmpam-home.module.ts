import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DmpamHomeRoutingModule } from './dmpam-home-routing.module';
import { DmpamHomeComponent } from 'src/app/components/component-index';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';



@NgModule({
  declarations: [
    DmpamHomeComponent
  ],
  imports: [
    CommonModule,
    DmpamHomeRoutingModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    MatProgressSpinnerModule
  ]
})
export class DmpamHomeModule { }
