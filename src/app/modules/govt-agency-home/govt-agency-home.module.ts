import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GovtAgencyHomeRoutingModule } from './govt-agency-home-routing.module';
import { GovtAgencyHomeComponent } from 'src/app/components/component-index';



@NgModule({
  declarations: [
    GovtAgencyHomeComponent
  ],
  imports: [
    CommonModule,
    GovtAgencyHomeRoutingModule
  ]
})
export class GovtAgencyHomeModule { }
