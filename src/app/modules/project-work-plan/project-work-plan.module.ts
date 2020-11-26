import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectWorkPlanRoutingModule } from './project-work-plan-routing.module';
import { ProjectWorkPlanComponent } from '../../components/component-index';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';



@NgModule({
  declarations: [
    ProjectWorkPlanComponent
  ],
  imports: [
    CommonModule,
    ProjectWorkPlanRoutingModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatToolbarModule,
    MatSelectModule
  ],
  exports: [ProjectWorkPlanComponent]
})
export class ProjectWorkPlanModule { }
