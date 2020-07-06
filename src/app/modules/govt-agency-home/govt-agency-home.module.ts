import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GovtAgencyHomeRoutingModule } from './govt-agency-home-routing.module';
import { GovtAgencyHomeComponent } from 'src/app/components/component-index';
import { ProjectsModule } from '../projects/projects.module';



@NgModule({
  declarations: [
    GovtAgencyHomeComponent
  ],
  imports: [
    CommonModule,
    GovtAgencyHomeRoutingModule,
    ProjectsModule,
  ]
})
export class GovtAgencyHomeModule { }
