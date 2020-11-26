import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsRoutingModule } from "./projects-routing.module";
import {
  ProjectsComponent,
  DataFilterPipe
} from "../../components/component-index";
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
// import { MatInputModule } from '@angular/material/label';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatToolbarModule } from "@angular/material/toolbar";

@NgModule({
  declarations: [
    ProjectsComponent,
    DataFilterPipe,
  ],
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    MatGridListModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
  ],
  exports: [ProjectsComponent]
})
export class ProjectsModule { }
