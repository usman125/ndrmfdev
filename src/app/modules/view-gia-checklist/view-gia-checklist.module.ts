import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewGiaChecklistRoutingModule } from './view-gia-checklist-routing.module';
import { ViewGiaChecklistComponent } from '../../components/component-index';
import { GiaChecklistModule } from '../gia-checklist/gia-checklist.module';


@NgModule({
  declarations: [
    ViewGiaChecklistComponent
  ],
  imports: [
    CommonModule,
    ViewGiaChecklistRoutingModule,
    GiaChecklistModule,

  ],
  exports: [ViewGiaChecklistComponent]
})
export class ViewGiaChecklistModule { }
