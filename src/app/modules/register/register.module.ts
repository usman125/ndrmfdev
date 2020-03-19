import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from "../../components/component-index";
import { RegisterRoutingModule } from "./register-routing.module";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    RegisterComponent
  ],
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    RegisterRoutingModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class RegisterModule { }
