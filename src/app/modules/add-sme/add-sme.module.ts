import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddSmeComponent } from "../../components/component-index";
import { AddSmeRoutingModule } from "./add-sme-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatGridListModule } from "@angular/material/grid-list";

@NgModule({
  declarations: [
    AddSmeComponent
  ],
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    AddSmeRoutingModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatGridListModule,
  ]
})
export class AddSmeModule { }
