import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewQprRoutingModule } from './view-qpr-routing.module';
import { ViewQprComponent } from '../../components/component-index';



@NgModule({
  declarations: [
    ViewQprComponent
  ],
  imports: [
    CommonModule,
    ViewQprRoutingModule
  ]
})
export class ViewQprModule { }
