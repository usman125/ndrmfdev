import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FipQualificationComponent, AccreditationCommentsMatrixComponent } from "../../components/component-index";
import { FipQualificationRoutingModule } from './fip-qualification-routing.module';
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatBadgeModule } from "@angular/material/badge";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FormioModule } from "angular-formio";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatListModule } from '@angular/material/list';

@NgModule({
  declarations: [
    FipQualificationComponent,
    AccreditationCommentsMatrixComponent,
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatCardModule,
    FormioModule,
    MatIconModule,
    MatBadgeModule,
    MatButtonModule,
    MatButtonToggleModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    FipQualificationRoutingModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatListModule,
  ]
})
export class FipQualificationModule { }
