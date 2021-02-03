import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QprSectionsRoutingModule } from './qpr-sections-routing.module';
import { QprSectionsComponent } from '../../components/component-index';
import { FormioModule } from 'angular-formio';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';



@NgModule({
  declarations: [
    QprSectionsComponent
  ],
  imports: [
    CommonModule,
    QprSectionsRoutingModule,
    FormioModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    FormsModule,
    MatButtonModule,
    MatDividerModule
  ],
  exports: [QprSectionsComponent]
})
export class QprSectionsModule { }
