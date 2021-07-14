import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TpvRoutingModule } from './tpv-routing.module';
import { TpvComponent } from '../../components/component-index';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';



@NgModule({
  declarations: [
    TpvComponent
  ],
  imports: [
    CommonModule,
    TpvRoutingModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatRadioModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatTabsModule,
  ],
  exports: [TpvComponent]
})
export class TpvModule { }
