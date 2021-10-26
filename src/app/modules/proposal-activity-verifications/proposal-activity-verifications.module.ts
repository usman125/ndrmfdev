import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProposalActivityVerificationsComponent } from '../../components/component-index';
import { ProposalActivityVerificationsRoutingModule } from './proposal-activity-verifications-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';



@NgModule({
  declarations: [
    ProposalActivityVerificationsComponent
  ],
  imports: [
    CommonModule,
    ProposalActivityVerificationsRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  exports: [ProposalActivityVerificationsComponent]
})
export class ProposalActivityVerificationsModule { }
