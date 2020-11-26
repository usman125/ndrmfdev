import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SmeComponent } from "../../components/component-index";
import { SmesRoutingModule } from "./smes-routing.module";
import { MatTableModule } from "@angular/material/table";
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { MatInputModule } from "@angular/material/input";
import {
  MatListModule,
} from "@angular/material/list";

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
    MatToolbarModule,
    SmesRoutingModule,
    MatCardModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
  ]

})
export class SmesModule { }
