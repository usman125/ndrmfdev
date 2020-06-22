import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewSubProjectDocumentSectionsRoutingModule } from './view-sub-project-document-sections-routing.module';
import { ViewSubProjectDocumentSectionsComponent } from '../../components/component-index';
import { SubProjectDocumentSectionsModule } from '../sub-project-document-sections/sub-project-document-sections.module';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  declarations: [
    ViewSubProjectDocumentSectionsComponent
  ],
  imports: [
    CommonModule,
    ViewSubProjectDocumentSectionsRoutingModule,
    SubProjectDocumentSectionsModule,
    MatToolbarModule
  ]
})
export class ViewSubProjectDocumentSectionsModule { }
