import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MobileViewRoutingModule } from './mobile-view-routing.module';
import { MobileViewComponent } from '../../components/component-index';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
    MobileViewComponent
  ],
  imports: [
    CommonModule,
    MobileViewRoutingModule,
    MatCardModule,
    MatButtonModule
  ]
})
export class MobileViewModule { }
