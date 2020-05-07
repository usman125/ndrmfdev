import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssignSectionsProcessRoutingModule } from "./assign-sections-process-routing.module";
import { AssignSectionsProcessComponent } from "../../components/component-index";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    AssignSectionsProcessComponent,
  ],
  imports: [
    CommonModule,
    AssignSectionsProcessRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    FormsModule, 
    MatSelectModule, 
    ReactiveFormsModule,
  ]
})
export class AssignSectionsProcessModule { }
