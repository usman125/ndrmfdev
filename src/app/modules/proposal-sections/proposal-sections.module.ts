import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProposalSectionsComponent } from '../../components/component-index';
import { ProposalSectionsRoutingModule } from "./proposal-sections-routing.module";
import { MatTableModule } from "@angular/material/table";
import { MatCardModule } from "@angular/material/card";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatToolbarModule } from "@angular/material/toolbar";

@NgModule({
  declarations: [
    ProposalSectionsComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatPaginatorModule,
    MatSortModule,
    MatTooltipModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    ProposalSectionsRoutingModule
  ]
})

export class ProposalSectionsModule { }
