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
    FormsModule
  ],
  exports: [QprSectionsComponent]
})
export class QprSectionsModule { }
