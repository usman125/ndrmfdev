import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddProposalRoutingModule } from "./add-proposal-section-routing.module";
import { AddProposalSectionComponent } from "../../components/component-index";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatToolbarModule } from "@angular/material/toolbar";
import { ProposalFormsModule } from "../proposal-forms/proposal-forms.module";
import { ProposalSectionsModule } from "../proposal-sections/proposal-sections.module";
import { AssignThematicAreaModule } from "../assign-thematic-area/assign-thematic-area.module";

@NgModule({
  declarations: [
    AddProposalSectionComponent
  ],
  imports: [
    CommonModule,
    AddProposalRoutingModule,
    ProposalFormsModule,
    ProposalSectionsModule,
    AssignThematicAreaModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatToolbarModule,
  ]
})
export class AddProposalSectionModule { }
