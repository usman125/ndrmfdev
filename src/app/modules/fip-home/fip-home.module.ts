import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FipHomeComponent } from "../../components/component-index";
import { FipHomeRoutingModule } from "./fip-home-routing.module";
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  declarations: [
    FipHomeComponent
  ],
  imports: [
    CommonModule,
    FipHomeRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatCardModule,
    MatCardModule,
    MatToolbarModule,
  ]
})
export class FipHomeModule { }
