import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FillQprRoutingModule } from './fill-qpr-routing.module';
import { FillQprComponent } from '../../components/component-index';
import { QprSectionsModule } from '../qpr-sections/qpr-sections.module';



@NgModule({
  declarations: [
    FillQprComponent
  ],
  imports: [
    CommonModule,
    FillQprRoutingModule,
    QprSectionsModule
  ],
  exports: []
})
export class FillQprModule { }
