import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FillQprRoutingModule } from './fill-qpr-routing.module';
import { FillQprComponent } from '../../components/component-index';
import { QprSectionsModule } from '../qpr-sections/qpr-sections.module';
import { ProjectImpPlanModule } from '../project-imp-plan/project-imp-plan.module';



@NgModule({
  declarations: [
    FillQprComponent
  ],
  imports: [
    CommonModule,
    FillQprRoutingModule,
    QprSectionsModule,
    ProjectImpPlanModule
  ],
  exports: []
})
export class FillQprModule { }
