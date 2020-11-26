import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateProposalFormRoutingModule } from "./create-proposal-form-routing.module";
import { CreateProposalFormComponent } from "../../components/component-index";
import { MatCardModule } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FormioModule, FormBuilderComponent } from "angular-formio";
import { MatSelectModule } from "@angular/material/select";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatToolbarModule } from "@angular/material/toolbar";

@NgModule({
  declarations: [
    CreateProposalFormComponent,
  ],
  imports: [
    CommonModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatGridListModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    FormioModule,
    MatToolbarModule,
    MatTooltipModule,
    MatSnackBarModule,
    CreateProposalFormRoutingModule
  ]
})
export class CreateProposalFormModule { }
