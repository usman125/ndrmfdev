import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CeoHomeRoutingModule } from "./ceo-home-routing.module";
import { CeoHomeComponent } from "../../components/component-index";
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    CeoHomeComponent
  ],
  imports: [
    CommonModule,
    CeoHomeRoutingModule,
    MatCardModule,
    MatProgressSpinnerModule
  ]
})
export class CeoHomeModule { }
