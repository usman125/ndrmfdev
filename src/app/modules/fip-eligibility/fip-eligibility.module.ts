import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from "@angular/material/card";
import { MatToolbarModule } from "@angular/material/toolbar";
import { FormioModule } from "angular-formio";
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FipEligibilityComponent } from "../../components/component-index";
import { FipEligibilityRoutingModule } from "./fip-eligibility-routing.module";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    FipEligibilityComponent,
  ],
  imports: [
    CommonModule,
    MatButtonToggleModule,
    MatCardModule,
    FormioModule,
    FipEligibilityRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
  ]
})
export class FipEligibilityModule { }
