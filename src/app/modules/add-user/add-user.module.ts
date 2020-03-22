import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddUserComponent } from "../../components/component-index";
import { AddUserRoutingModule } from "./add-user-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatGridListModule } from "@angular/material/grid-list";

@NgModule({
  declarations: [
    AddUserComponent
  ],
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    AddUserRoutingModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    MatTooltipModule,
    MatGridListModule,
  ],
  exports:[AddUserComponent]
})
export class AddUserModule { }
