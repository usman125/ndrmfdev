import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CeoProposalsRoutingModule } from "./ceo-proposals-routing.module";
import { CeoProposalComponent } from "../../components/component-index";

@NgModule({
  declarations: [
    CeoProposalComponent
  ],
  imports: [
    CommonModule,
    CeoProposalsRoutingModule
  ]
})
export class CeoProposalsModule { }
