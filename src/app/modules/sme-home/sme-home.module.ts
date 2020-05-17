import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SmeHomeRoutingModule } from "./sme-home-routing.module";
import { SmeHomeComponent } from "../../components/component-index";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
// import { MatGridListModule } from "@angular/material/grid-list";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";


@NgModule({
  declarations: [
    SmeHomeComponent,
  ],
  imports: [
    CommonModule,
    SmeHomeRoutingModule,
    MatCardModule,
    MatIconModule,
    // MatGridListModule,
    MatToolbarModule,
    // MatExpansionModule,
    MatProgressSpinnerModule,
  ]
})
export class SmeHomeModule { }
