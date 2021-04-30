import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from "../../components/component-index";
import { RegisterRoutingModule } from "./register-routing.module";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    RegisterComponent,
  ],
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    RegisterRoutingModule,
    MatCardModule,
    FormsModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    MatSelectModule
  ],
  entryComponents:[]
})
export class RegisterModule { }
