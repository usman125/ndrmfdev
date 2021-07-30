import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubProjectDocumentSectionsRoutingModule } from './sub-project-document-sections-routing.module';
import { DepUserFilterPipe3, SubProjectDocumentSectionsComponent } from '../../components/component-index';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormioModule } from 'angular-formio';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { SubProjectDocumentCommentsMatrixModule } from '../sub-project-document-comments-matrix/sub-project-document-comments-matrix.module';
import { NgxPrintModule } from 'ngx-print';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';



@NgModule({
  declarations: [
    SubProjectDocumentSectionsComponent,
    DepUserFilterPipe3
  ],
  imports: [
    CommonModule,
    SubProjectDocumentSectionsRoutingModule,
    SubProjectDocumentCommentsMatrixModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    FormioModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatInputModule,
    FormsModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatChipsModule,
    NgxPrintModule,
    MatTooltipModule,
    MatDividerModule,
  ],
  exports: [SubProjectDocumentSectionsComponent]
})
export class SubProjectDocumentSectionsModule { }
