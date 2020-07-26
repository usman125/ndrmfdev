import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddSubProcessRoutingModule } from './add-sub-process-routing.module';
import { AddSubProcessComponent } from '../../components/component-index';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';


@NgModule({
  declarations: [
    AddSubProcessComponent
  ],
  imports: [
    CommonModule,
    AddSubProcessRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    MatIconModule,
    MatToolbarModule,
    MatSelectModule
  ]
})
export class AddSubProcessModule { }
