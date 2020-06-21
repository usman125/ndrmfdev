import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProposalFileMatrixRoutingModule } from './proposal-file-matrix-routing.module';
import { ProposalFileMatrixComponent } from '../../components/component-index';



@NgModule({
  declarations: [
    ProposalFileMatrixComponent
  ],
  imports: [
    CommonModule,
    ProposalFileMatrixRoutingModule
  ]
})
export class ProposalFileMatrixModule { }
