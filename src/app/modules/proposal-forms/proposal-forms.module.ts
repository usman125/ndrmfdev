import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProposalFormsRoutingModule } from "./proposal-forms-routing.module";
import { ProposalFormsComponent } from "../../components/component-index";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatCardModule } from "@angular/material/card";
import { MatTooltipModule } from "@angular/material/tooltip";
import { FormioModule } from "angular-formio";

@NgModule({
  declarations: [
    ProposalFormsComponent,
  ],
  imports: [
    CommonModule,
    FormioModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    ProposalFormsRoutingModule,
  ]
})

export class ProposalFormsModule { }
