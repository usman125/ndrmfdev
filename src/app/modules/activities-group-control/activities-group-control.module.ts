import { NgModule, Pipe, PipeTransform } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivitiesGroupControlRoutingModule } from './activities-group-control-routing.module';
import { ActivitiesGroupControlComponent } from '../../components/component-index';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Pipe({ name: 'keys' })
export class KeysPipe implements PipeTransform {
  transform(value): any {
    return Object.keys(value)
  }
}

@NgModule({
  declarations: [
    ActivitiesGroupControlComponent,
    KeysPipe
  ],
  imports: [
    CommonModule,
    ActivitiesGroupControlRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCheckboxModule,
  ],
  exports: [ActivitiesGroupControlComponent]
})
export class ActivitiesGroupControlModule { }
