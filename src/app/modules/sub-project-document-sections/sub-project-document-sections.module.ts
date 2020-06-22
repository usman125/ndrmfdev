import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubProjectDocumentSectionsRoutingModule } from './sub-project-document-sections-routing.module';
import { SubProjectDocumentSectionsComponent } from '../../components/component-index';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormioModule } from 'angular-formio';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    SubProjectDocumentSectionsComponent
  ],
  imports: [
    CommonModule,
    SubProjectDocumentSectionsRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    FormioModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatInputModule,
    FormsModule
  ],
  exports: [SubProjectDocumentSectionsComponent]
})
export class SubProjectDocumentSectionsModule { }
