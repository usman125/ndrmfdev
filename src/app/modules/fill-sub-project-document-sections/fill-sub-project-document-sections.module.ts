import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FillSubProjectDocumentSectionsRoutingModule } from './fill-sub-project-document-sections-routing.module';
import { FillSubProjectDocumentSectionsComponent } from '../../components/component-index';
import { SubProjectDocumentSectionsModule } from '../sub-project-document-sections/sub-project-document-sections.module';
import { MatToolbarModule } from '@angular/material/toolbar';



@NgModule({
  declarations: [
    FillSubProjectDocumentSectionsComponent
  ],
  imports: [
    CommonModule,
    FillSubProjectDocumentSectionsRoutingModule,
    SubProjectDocumentSectionsModule,
    MatToolbarModule
  ]
})
export class FillSubProjectDocumentSectionsModule { }
