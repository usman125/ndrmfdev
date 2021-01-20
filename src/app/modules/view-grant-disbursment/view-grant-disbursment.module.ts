import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewGrantDisbursmentRoutingModule } from './view-grant-disbursment-routing.module';
import { ViewGrantDisbursmentComponent, CostsFilterPipe, DepUserFilterPipe } from '../../components/component-index';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatRadioModule } from '@angular/material/radio';



@NgModule({
  declarations: [
    ViewGrantDisbursmentComponent,
    CostsFilterPipe,
    DepUserFilterPipe
    // DataFilterPipe
  ],
  imports: [
    CommonModule,
    ViewGrantDisbursmentRoutingModule,
    MatExpansionModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatToolbarModule,
    FormsModule,
    ReactiveFormsModule,
    MatChipsModule,
    MatRadioModule
  ]
})
export class ViewGrantDisbursmentModule { }
