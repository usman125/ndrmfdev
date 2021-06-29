import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QprSectionsRoutingModule } from './qpr-sections-routing.module';
import { DepUserFilterPipe2, QprSectionsComponent, QprSumPipe } from '../../components/component-index';
import { FormioModule } from 'angular-formio';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgxPrintModule } from 'ngx-print';



@NgModule({
  declarations: [
    QprSectionsComponent,
    DepUserFilterPipe2,
    QprSumPipe,
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
    MatSelectModule,
    ReactiveFormsModule,
    MatListModule,
    MatRadioModule,
    MatDividerModule,
    MatToolbarModule,
    NgxPrintModule,
    MatProgressSpinnerModule,
  ],
  exports: [QprSectionsComponent]
})
export class QprSectionsModule { }
