import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PoHomeComponent } from "../../components/component-index";
import { PoHomeRoutingModule } from "./po-home-routing.module";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
// import { MatGridListModule } from "@angular/material/grid-list";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

@NgModule({
  declarations: [
    PoHomeComponent,
  ],
  imports: [
    CommonModule,
    PoHomeRoutingModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    // MatGridListModule,
    MatToolbarModule,
    MatProgressSpinnerModule
  ]
})
export class PoHomeModule { }