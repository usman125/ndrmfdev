import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from '../../components/component-index';
import { UsersRoutingModule } from "./users-routing.module";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from "@angular/material/card";
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  declarations: [
    UsersComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    MatSortModule,
    MatIconModule,
    MatButtonModule,
    UsersRoutingModule,
    MatTooltipModule,
    MatToolbarModule,
  ]
})

export class UsersModule { }
