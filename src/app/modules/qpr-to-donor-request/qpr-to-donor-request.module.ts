import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QprToDonorRequestRoutingModule } from './qpr-to-donor-request-routing.module';
import { QprToDonorRequestComponent } from '../../components/component-index';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormioModule } from 'angular-formio';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';



@NgModule({
  declarations: [
    QprToDonorRequestComponent,
  ],
  imports: [
    CommonModule,
    QprToDonorRequestRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    FormioModule,
    MatDividerModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
  ]
})
export class QprToDonorRequestModule { }
