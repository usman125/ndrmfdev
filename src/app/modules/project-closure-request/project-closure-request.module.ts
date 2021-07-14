import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectClosureRequestComponent } from '../../components/component-index';
import { ProjectClosureRequestRoutingModule } from './project-closure-request-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatRadioModule } from '@angular/material/radio';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';



@NgModule({
  declarations: [
    ProjectClosureRequestComponent
  ],
  imports: [
    CommonModule,
    ProjectClosureRequestRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatTooltipModule,
    MatRadioModule,
    MatDividerModule,
    MatProgressSpinnerModule,
  ],
  exports: [ProjectClosureRequestComponent]
})
export class ProjectClosureRequestModule { }
