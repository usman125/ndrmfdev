import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PipRoutingModule } from './pip-routing.module';
import { PipComponent } from '../../components/component-index';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ActivitiesGroupControlModule } from '../activities-group-control/activities-group-control.module';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    PipComponent
  ],
  imports: [
    CommonModule,
    PipRoutingModule,
    ActivitiesGroupControlModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule
  ],
  exports: [PipComponent]
})
export class PipModule { }
