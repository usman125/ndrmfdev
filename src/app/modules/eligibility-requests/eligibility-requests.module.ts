import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from "@angular/material/table";
import { MatCardModule } from "@angular/material/card";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatInputModule } from "@angular/material/input";
import { EligibilityRequestsComponent } from "../../components/component-index";
import { EligibilityRequestsRoutingModule } from "./eligibility-requests-routing.module";
import { FormioModule } from "angular-formio";

@NgModule({
  declarations: [
    EligibilityRequestsComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatButtonToggleModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    FormioModule,
    MatInputModule,
    EligibilityRequestsRoutingModule,
  ]
})
export class EligibilityRequestsModule { }
