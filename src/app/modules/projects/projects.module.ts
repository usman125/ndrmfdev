import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsRoutingModule } from "./projects-routing.module";
import { ProjectsComponent } from "../../components/component-index";
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
// import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [
    ProjectsComponent,
  ],
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    MatGridListModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class ProjectsModule { }
