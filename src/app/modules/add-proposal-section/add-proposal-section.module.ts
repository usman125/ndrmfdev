import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddProposalRoutingModule } from "./add-proposal-section-routing.module";
import { AddProposalSectionComponent } from "../../components/component-index";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatToolbarModule } from "@angular/material/toolbar";

@NgModule({
  declarations: [
    AddProposalSectionComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatToolbarModule,
    AddProposalRoutingModule
  ]
})
export class AddProposalSectionModule { }
