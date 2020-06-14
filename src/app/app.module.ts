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
  // ProjectPlanComponent,
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
import { ProposalRequestsStore } from './stores/proposal-requests/proposal-requests-store';
import { PrimaryAppraisalFormsStore } from './stores/primary-appraisal-forms/primary-appraisal-forms-store';
import { PrimaryAppraisalRequestsStore } from './stores/primary-appraisal-requests/primary-appraisal-requests-store';
import { PendingSignupsStore } from './stores/pending-signups/pending-signups-store';
import { ExtendedAppraisalSmesStore } from "./stores/extended-appraisal-smes/extended-appraisal-smes-store";
import { ExtendedAppraisalFormsStore } from "./stores/extended-appraisal-forms/extended-appraisal-forms-store";


import { IntimateFipModule } from './modules/fip-intimations/fip-intimations.module';
import { AssigntaskModule } from './modules/assigntask/assigntask.module';
import { ConfirmDialogModule } from './modules/confirm-dialog/confirm-dialog.module';
import { ProjectPlanModule } from './modules/project-plan/project-plan.module';
import { AddProjectDialogModule } from './modules/add-project-dialog/add-project-dialog.module';
import { NoHeaderLayoutComponent } from './components/common/layouts/no-header-layout/no-header-layout.component';


// import { MatInputModule } from "@angular/material/input";
// import { MatSelectModule } from "@angular/material/select";
// import { MatButtonModule } from "@angular/material/button";
// import { MatCardModule } from "@angular/material/card";
// import { MatIconModule } from "@angular/material/icon";
import { MatDividerModule } from "@angular/material/divider";
import { MatTreeModule } from "@angular/material/tree";
// import { MatToolbarModule } from "@angular/material/toolbar";
import { MatCheckboxModule } from "@angular/material/checkbox";
// import { EditUserComponent } from './components/edit-user/edit-user.component';
// import { EditSmeComponent } from './components/edit-sme/edit-sme.component';
// import { ViewPrimaryAppraisalComponent } from './components/view-primary-appraisal/view-primary-appraisal.component';
// import { PrimaryAppraisalProjectsComponent } from './components/primary-appraisal-projects/primary-appraisal-projects.component';
// import { CreatePrimaryAppraisalComponent } from './components/create-primary-appraisal/create-primary-appraisal.component';
// import { FillPrimaryAppraisalComponent } from './components/fill-primary-appraisal/fill-primary-appraisal.component';
// import { PrimaryAppraisalComponent } from './components/primary-appraisal/primary-appraisal.component';
// import { ExtendedAppraisalComponent } from './components/extended-appraisal/extended-appraisal.component';
// import { ExtendedAppraisalSmesComponent } from './components/extended-appraisal-smes/extended-appraisal-smes.component';
// import { ExtendedAppraisalFormsComponent } from './components/extended-appraisal-forms/extended-appraisal-forms.component';
// import { AddExtendedAppraisalSmeComponent } from './components/add-extended-appraisal-sme/add-extended-appraisal-sme.component';
// import { AddExtendedAppraisalFormComponent } from './components/add-extended-appraisal-form/add-extended-appraisal-form.component';
// import { AddPrimaryAppraisalFormComponent } from './components/add-primary-appraisal-form/add-primary-appraisal-form.component';
// import { PrimaryAppraisalFormsComponent } from './components/primary-appraisal-forms/primary-appraisal-forms.component';
// import { GiaProjectsComponent } from './components/gia-projects/gia-projects.component';
// import { UserProjectsComponent } from './components/user-projects/user-projects.component';
// import { PrepareGiaComponent } from './components/prepare-gia/prepare-gia.component';
// import { AdminPipComponent } from './components/admin-pip/admin-pip.component';
// import { MatGridListModule } from "@angular/material/grid-list";
// import { GiaProjectsModule } from "./modules/gia-projects/gia-projects.module";
import { JwtModule } from "@auth0/angular-jwt";
// import { ViewGovtAgencyRequestComponent } from './components/view-govt-agency-request/view-govt-agency-request.component';
// import { GovtAgencyHomeComponent } from './components/govt-agency-home/govt-agency-home.component';
// import { GovtAccreditRequestsComponent } from './components/govt-accredit-requests/govt-accredit-requests.component';
// import { DmpamHomeComponent } from './components/dmpam-home/dmpam-home.component';
// import { CeoHomeComponent } from './components/ceo-home/ceo-home.component';
// import { CeoProposalComponent } from './components/ceo-proposal/ceo-proposal.component';
// import { GmProposalComponent } from './components/gm-proposal/gm-proposal.component';
// import { GmHomeComponent } from './components/gm-home/gm-home.component';
// import { AssignThematicAreaComponent } from './components/assign-thematic-area/assign-thematic-area.component';
// import { AdminHomeComponent } from './components/admin-home/admin-home.component';
// import { SmeHomeComponent } from './components/sme-home/sme-home.component';
// import { PoHomeComponent } from './components/po-home/po-home.component';
// import { AssignSectionsProcessComponent } from './components/assign-sections-process/assign-sections-process.component';
// import { PendingSignupsComponent } from './components/pending-signups/pending-signups.component';
import { NoRightClickDirective } from './services/no-right-click.directive';

export function tokenGetter() {
  let user = JSON.parse(localStorage.getItem('user'));
  return user?.authToken;
}


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CoffeeElectionComponent,
    SiteLayout,
    LoginComponent,
    NoHeaderLayoutComponent,
    AddProjectComponent,
    NoRightClickDirective
    // ViewGovtAgencyRequestComponent,
    // GovtAgencyHomeComponent,
    // GovtAccreditRequestsComponent,
    // DmpamHomeComponent,
    // CeoHomeComponent,
    // CeoProposalComponent,
    // GmProposalComponent,
    // GmHomeComponent,
    // AssignThematicAreaComponent,
    // AdminHomeComponent,
    // EditUserComponent,
    // EditSmeComponent,
    // SmeHomeComponent,
    // PoHomeComponent,
    // AssignSectionsProcessComponent,
    // PendingSignupsComponent,
    // ViewPrimaryAppraisalComponent,
    // PrimaryAppraisalProjectsComponent,
    // CreatePrimaryAppraisalComponent,
    // FillPrimaryAppraisalComponent,
    // PrimaryAppraisalComponent,
    // ExtendedAppraisalComponent,
    // ExtendedAppraisalSmesComponent,
    // ExtendedAppraisalFormsComponent,
    // AddExtendedAppraisalSmeComponent,
    // AddExtendedAppraisalFormComponent,
    // AddPrimaryAppraisalFormComponent,
    // PrimaryAppraisalFormsComponent,
    // GiaProjectsComponent,
    // UserProjectsComponent,
    // PrepareGiaComponent,
    // AdminPipComponent,
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
    ProjectPlanModule,
    IntimateFipModule,
    AssigntaskModule,
    ConfirmDialogModule,
    AddProjectDialogModule,
    MatProgressSpinnerModule,

    // GiaProjectsModule,

    MatDividerModule,
    MatTreeModule,
    MatCheckboxModule,


    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ["ndrmfdev-backend.herokuapp.com"]
      }
    })
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
    ProposalRequestsStore,
    PrimaryAppraisalFormsStore,
    PrimaryAppraisalRequestsStore,
    PendingSignupsStore,
    ExtendedAppraisalSmesStore,
    ExtendedAppraisalFormsStore,
  ],
  bootstrap: [AppComponent],
  exports: [
    // TreeComponent,
    // ProjectPlanComponent
    // ProjectPlanModule
  ],
  entryComponents: [
    IntimateFip,
    AssignTask,
    // ProjectPlanComponent,
  ]
})
export class AppModule { }
