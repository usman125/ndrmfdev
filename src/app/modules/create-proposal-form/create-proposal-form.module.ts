import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateProposalFormRoutingModule } from "./create-proposal-form-routing.module";
import { CreateProposalFormComponent } from "../../components/component-index";

@NgModule({
  declarations: [
    CreateProposalFormComponent
  ],
  imports: [
    CommonModule,
    CreateProposalFormRoutingModule
  ]
})
export class CreateProposalFormModule { }
