import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FillQprRoutingModule } from './fill-qpr-routing.module';
import { FillQprComponent } from '../../components/component-index';
import { QprSectionsModule } from '../qpr-sections/qpr-sections.module';
import { ProjectImpPlanModule } from '../project-imp-plan/project-imp-plan.module';
// import { MatToolbarModule } from '@angular/material/toolbar';



@NgModule({
  declarations: [
    FillQprComponent
  ],
  imports: [
    CommonModule,
    FillQprRoutingModule,
    QprSectionsModule,
    ProjectImpPlanModule,
    // MatToolbarModule,
  ],
  exports: []
})
export class FillQprModule { }
