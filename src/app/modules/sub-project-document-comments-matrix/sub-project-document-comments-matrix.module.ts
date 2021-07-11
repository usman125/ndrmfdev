import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubProjectDocumentCommentsMatrixRoutingModule } from './sub-project-document-comments-matrix-routing.module';
import { SubProjectDocumentCommentsMatrixComponent } from 'src/app/components/component-index';
import { MatChipsModule } from '@angular/material/chips';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgxPrintModule } from 'ngx-print';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@NgModule({
  declarations: [
    SubProjectDocumentCommentsMatrixComponent,
  ],
  imports: [
    CommonModule,
    SubProjectDocumentCommentsMatrixRoutingModule,
    MatChipsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    NgxPrintModule,
    MatProgressSpinnerModule,
  ],
  exports: [SubProjectDocumentCommentsMatrixComponent]
})
export class SubProjectDocumentCommentsMatrixModule { }
