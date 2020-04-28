import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrepareGiaComponent } from "../../components/component-index";
import { PrepareGiaRoutingModule } from "./prepare-gia-routing.module";
import { ProjectsModule } from "../projects/projects.module";

@NgModule({
  declarations: [
    PrepareGiaComponent,
  ],
  imports: [
    CommonModule,
    PrepareGiaRoutingModule,
    ProjectsModule,
  ]
})
export class PrepareGiaModule { }
