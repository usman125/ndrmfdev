import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GrantDisbursmentsRoutingModule } from './grant-disbursments-routing.module';
import { GrantDisbursmentsComponent } from '../../components/component-index';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';



@NgModule({
  declarations: [
    GrantDisbursmentsComponent
  ],
  imports: [
    CommonModule,
    GrantDisbursmentsRoutingModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatInputModule
  ]
})
export class GrantDisbursmentsModule { }
