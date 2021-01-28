//import { GrcActionsComponent } from './../../components/grc-actions/grc-actions.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {GrcActionsComponent} from '../../components/component-index'
import {GrcActionsComponentRoutingModule} from './grc-actions.routing.module'
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from "@angular/material/card";
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatDividerModule } from "@angular/material/divider";
import { MatRadioModule } from "@angular/material/radio";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@NgModule({
  declarations: [
    GrcActionsComponent
  ],
  imports: [
    CommonModule,
    GrcActionsComponentRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    MatSortModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    FormsModule,
    ReactiveFormsModule,
    MatChipsModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatSelectModule,
    MatDividerModule,
    MatRadioModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    MatGridListModule,
  ]
})
export class GrcActionsModule { }
