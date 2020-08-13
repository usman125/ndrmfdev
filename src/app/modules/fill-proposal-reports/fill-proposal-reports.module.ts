import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FillProposalReportsRoutingModule } from './fill-proposal-reports-routing.module';
import { FillProposalReportsComponent } from '../../components/component-index';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormioModule } from 'angular-formio';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';



@NgModule({
  declarations: [
    FillProposalReportsComponent
  ],
  imports: [
    CommonModule,
    FillProposalReportsRoutingModule,
    MatToolbarModule,
    FormioModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatTooltipModule
  ]
})
export class FillProposalReportsModule { }
