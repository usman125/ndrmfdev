import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginService } from './services/login.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { LayoutModule } from '@angular/cdk/layout';
import { BarRatingModule } from "ngx-bar-rating";
import { MatSliderModule } from '@angular/material/slider';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HeaderComponent } from './components/common/header/header.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { MatBadgeModule } from '@angular/material/badge';
import { SiteLayout } from "./components/common/layouts/sitelayout/sitelayout.component";
import { MatExpansionModule } from '@angular/material/expansion';
import { AppConfig } from './services/config';
import { FormioAppConfig } from 'angular-formio';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HttpClientModule } from "@angular/common/http";
import {
  AuthGuard,
  LoginComponent,
  AssignTask,
  IntimateFip,
  CoffeeElectionComponent,
  AddProjectComponent,
  ProjectPlanComponent,
} from './components/component-index';

import { AccreditationRequestStore } from './stores/accreditation-requests/accreditation-requests-store';
import { SingleAccreditationRequestStore } from './stores/single-accreditation-requests/single-accreditation-requests-store';
import { SurveysStore } from './stores/surveys/surveys-store';
import { UsersStore } from './stores/users/users-store';
import { AuthStore } from './stores/auth/auth-store';
import { CoffeeElectionStore } from "./stores/coffee-election/coffee-election.store";
import { SmeStore } from "./stores/sme/sme-store";
import { DepartmentsStore } from "./stores/departments/departments-store";
import { ProjectsStore } from "./stores/projects/projects-store";
import { AccreditationReviewStore } from "./stores/accreditation-reviews/accreditation-reviews-store";
import { AccreditationCommentsMatrixStore } from './stores/accreditation-comments-matrix/accreditation-comments-matrix-store';
import { fipIntimationsStore } from './stores/fip-intimations/fip-intimations-store';
import { SectionSelectorStore } from './stores/section-selector/section-selector-store';
import { ProposalSectionsStore } from './stores/proposal-sections/proposal-sections-store';
import { ProposalFormsStore } from './stores/proposal-forms/proposal-forms-store';
import { IntimateFipModule } from './modules/fip-intimations/fip-intimations.module';
import { AssigntaskModule } from './modules/assigntask/assigntask.module';
import { ConfirmDialogModule } from './modules/confirm-dialog/confirm-dialog.module';
// import { ProjectPlanModule } from './modules/project-plan/project-plan.module';
import { AddProjectDialogModule } from './modules/add-project-dialog/add-project-dialog.module';
import { NoHeaderLayoutComponent } from './components/common/layouts/no-header-layout/no-header-layout.component';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CoffeeElectionComponent,
    SiteLayout,
    LoginComponent,
    NoHeaderLayoutComponent,
    AddProjectComponent,
    // ProjectPlanComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatSelectModule,
    MatButtonModule,
    MatInputModule,
    MatTooltipModule,
    MatSidenavModule,
    MatListModule,
    MatGridListModule,
    MatSliderModule,
    BarRatingModule,
    MatDialogModule,
    MatMenuModule,
    MatRadioModule,
    MatBadgeModule,
    MatExpansionModule,
    LayoutModule,
    IntimateFipModule,
    AssigntaskModule,
    ConfirmDialogModule,
    AddProjectDialogModule,
    // ProjectPlanModule,
    MatProgressSpinnerModule,
  ],
  providers: [

    // FormManagerService,
    // {
    //   provide: FormManagerConfig,
    //   useValue: {
    //     tag: 'common'
    //   }
    // },

    // FormioResourceService,
    // {
    //   provide: FormioResourceConfig, useValue: {
    //     name: 'form1',
    //     form: 'form1'
    //   }
    // },

    {
      provide: FormioAppConfig,
      useValue: AppConfig
    },

    AuthGuard,
    LoginService,
    AuthStore,
    SurveysStore,
    AccreditationRequestStore,
    SingleAccreditationRequestStore,
    UsersStore,
    CoffeeElectionStore,
    SmeStore,
    DepartmentsStore,
    AccreditationReviewStore,
    AccreditationCommentsMatrixStore,
    fipIntimationsStore,
    SectionSelectorStore,
    ProposalSectionsStore,
    ProposalFormsStore,
    ProjectsStore,
  ],
  bootstrap: [AppComponent],
  exports: [
    // TreeComponent,
    ProjectPlanComponent
  ],
  entryComponents: [IntimateFip, AssignTask]
})
export class AppModule { }
