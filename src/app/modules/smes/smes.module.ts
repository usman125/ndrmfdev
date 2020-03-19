import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SmeComponent } from "../../components/component-index";
import { SmesRoutingModule } from "./smes-routing.module";
import { MatTableModule } from "@angular/material/table";
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from "@angular/material/tooltip";

@NgModule({
  declarations: [
    SmeComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatTooltipModule,
    MatButtonModule,
    SmesRoutingModule
  ]
  
})
export class SmesModule { }
