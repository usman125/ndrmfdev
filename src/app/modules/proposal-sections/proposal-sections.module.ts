import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProposalSectionsComponent } from '../../components/component-index';
import { ProposalSectionsRoutingModule } from "./proposal-sections-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
// import { MatTableModule } from "@angular/material/table";
// import { MatPaginatorModule } from "@angular/material/paginator";
// import { MatSortModule } from "@angular/material/sort";
// import { MatTooltipModule } from "@angular/material/tooltip";
// import { MatToolbarModule } from "@angular/material/toolbar";
// import { MatInputModule } from "@angular/material/label";

@NgModule({
  declarations: [
    ProposalSectionsComponent
  ],
  imports: [
    CommonModule,
    // MatTableModule,
    MatCardModule,
    // MatPaginatorModule,
    // MatSortModule,
    // MatTooltipModule,
    MatIconModule,
    MatButtonModule,
    // MatToolbarModule,
    ProposalSectionsRoutingModule,
    FormsModule, ReactiveFormsModule,
    MatInputModule,
    MatProgressSpinnerModule,
  ],
  exports:[ProposalSectionsComponent]
})

export class ProposalSectionsModule { }
