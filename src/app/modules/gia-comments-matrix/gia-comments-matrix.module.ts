import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GiaCommentsMatrixRoutingModule } from './gia-comments-matrix-routing.module';
import { GiaCommentsMatrixComponent } from '../../components/component-index';
import { MatChipsModule } from '@angular/material/chips';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgxPrintModule } from 'ngx-print';


@NgModule({
  declarations: [
    GiaCommentsMatrixComponent
  ],
  imports: [
    CommonModule,
    GiaCommentsMatrixRoutingModule,
    MatChipsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    NgxPrintModule
  ]
})
export class GiaCommentsMatrixModule { }
