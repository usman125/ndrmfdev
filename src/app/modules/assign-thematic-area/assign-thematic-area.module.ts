import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssignThematicAreaComponent } from "../../components/component-index";
import { AssignThematicAreaRoutingModule } from "./assign-thematic-area-routing.module";
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';



@NgModule({
  declarations: [
    AssignThematicAreaComponent
  ],
  imports: [
    CommonModule,
    AssignThematicAreaRoutingModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [AssignThematicAreaComponent]
})
export class AssignThematicAreaModule { }
