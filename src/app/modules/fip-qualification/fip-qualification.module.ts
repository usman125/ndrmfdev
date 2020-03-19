import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FipQualificationComponent, AccreditationCommentsMatrixComponent } from "../../components/component-index";
import { FipQualificationRoutingModule } from './fip-qualification-routing.module';
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatBadgeModule } from "@angular/material/badge";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FormioModule } from "angular-formio";

@NgModule({
  declarations: [
    FipQualificationComponent,
    AccreditationCommentsMatrixComponent,
  ],
  imports: [
    CommonModule,
    MatCardModule,
    FormioModule,
    MatIconModule,
    MatBadgeModule,
    MatButtonToggleModule,
    FormsModule,
    ReactiveFormsModule,
    FipQualificationRoutingModule,
  ]
})
export class FipQualificationModule { }
