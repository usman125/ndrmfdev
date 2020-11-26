import { MatRadioModule } from '@angular/material/radio';
import { NgModule, Pipe, PipeTransform } from '@angular/core';
import { SignaturePadModule } from 'angular2-signaturepad';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginService } from './services/login.service';
import {ConfirmModelService} from './services/confirm-model.service'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { LayoutModule } from '@angular/cdk/layout';
import { BarRatingModule } from "ngx-bar-rating";
// import { MatSliderModule } from '@angular/material/slider';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HeaderComponent } from './components/common/header/header.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
// import { MatRadioModule } from '@angular/material/radio';
// import { MatBadgeModule } from '@angular/material/badge';
import { SiteLayout } from "./components/common/layouts/sitelayout/sitelayout.component";
import { MatExpansionModule } from '@angular/material/expansion';
import { AppConfig } from './services/config';
import { FormioAppConfig } from 'angular-formio';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HttpClientModule } from "@angular/common/http";
import { FormioModule } from 'angular-formio';
import {
  AuthGuard,
  LoginComponent,
  AssignTask,
  IntimateFip,
  CoffeeElectionComponent,
  AddProjectComponent,
  // DataFilterPipe
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
import { SubProjectDocStore } from "./stores/sub-proj-doc/sub-proj-doc-store";
import { SubProjectDocSectionsStore } from "./stores/sub-proj-doc-sections/sub-proj-doc-sections-store";
import { QprSectionsStore } from './stores/qpr-sections/qpr-sections-store';
import { QprStore } from './stores/qpr/qpr-store';
import { CostDetailsStore } from './stores/cost-details/cost-details-store';

import { IntimateFipModule } from './modules/fip-intimations/fip-intimations.module';
import { AssigntaskModule } from './modules/assigntask/assigntask.module';
import { ConfirmDialogModule } from './modules/confirm-dialog/confirm-dialog.module';
// import { ProjectPlanModule } from './modules/project-plan/project-plan.module';
import { AddProjectDialogModule } from './modules/add-project-dialog/add-project-dialog.module';
import { NoHeaderLayoutComponent } from './components/common/layouts/no-header-layout/no-header-layout.component';


// import { MatInputModule } from "@angular/material/input";
// import { MatSelectModule } from "@angular/material/select";
// import { MatButtonModule } from "@angular/material/button";
// import { MatCardModule } from "@angular/material/card";
// import { MatIconModule } from "@angular/material/icon";
// import { MatDividerModule } from "@angular/material/divider";
// import { MatTreeModule } from "@angular/material/tree";
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
// import { PipComponent } from './components/pip/pip.component';
// import { ActivitiesGroupControlComponent } from './components/activities-group-control/activities-group-control.component';
import { ActivityDetailsComponent } from './components/activity-details/activity-details.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { GrievanceRegistrationComponent } from './grievance-registration/grievance-registration.component';
import { ConcernedPersonDialogComponent } from './components/concerned-person-dialog/concerned-person-dialog.component';
//import { UpdateComplaintComponent } from './components/update-complaint/update-complaint.component';
//import { UpdateComplaintStatusComponent } from './components/update-complaint-status/update-complaint-status.component';
//import { GRCComponent } from './components/grc/grc.component';
//import { EmailToConcernPersonComponent } from './components/email-to-concern-person/email-to-concern-person.component';
//import { AssignToConcernPersonComponent } from './components/assign-to-concern-person/assign-to-concern-person.component';
//import { AssignComplainComponent } from './components/assign-complain/assign-complain.component';

//import { ListOfAllComplainsComponent } from './components/list-of-all-complains/list-of-all-complains.component';
// import { CostDetailsComponent } from './components/cost-details/cost-details.component';
// import { ProjectImpPlanComponent } from './components/project-imp-plan/project-imp-plan.component';
// import { ApproverHomeComponent } from './components/approver-home/approver-home.component';
// import { FillProposalReportsComponent } from './components/fill-proposal-reports/fill-proposal-reports.component';
// import { AddSubProcessComponent } from './components/add-sub-process/add-sub-process.component';

// import { ProjectWorkPlanComponent } from './components/project-work-plan/project-work-plan.component';
// import { QprSectionsComponent } from './components/qpr-sections/qpr-sections.component';
// import { QprComponent } from './components/qpr/qpr.component';
// import { ViewQprComponent } from './components/view-qpr/view-qpr.component';
// import { FillQprComponent } from './components/fill-qpr/fill-qpr.component';
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
// import { NoRightClickDirective } from './services/no-right-click.directive';
// import { GiaCommentsMatrixComponent } from './components/gia-comments-matrix/gia-comments-matrix.component';
// import { ProposalFileMatrixComponent } from './components/proposal-file-matrix/proposal-file-matrix.component';
// import { SubProjectDocumentSectionsComponent } from './components/sub-project-document-sections/sub-project-document-sections.component';
// import { FillSubProjectDocumentSectionsComponent } from './components/fill-sub-project-document-sections/fill-sub-project-document-sections.component';
// import { ViewSubProjectDocumentSectionsComponent } from './components/view-sub-project-document-sections/view-sub-project-document-sections.component';
// import { SubProjectDocumentComponent } from './components/sub-project-document/sub-project-document.component';
// import { GiaChecklistComponent } from './components/gia-checklist/gia-checklist.component';
// import { ViewGiaChecklistComponent } from './components/view-gia-checklist/view-gia-checklist.component';
// import { SubmitGiaReviewsComponent } from './components/submit-gia-reviews/submit-gia-reviews.component';
// import { GiaReviewProjectsComponent } from './components/gia-review-projects/gia-review-projects.component';
// import { DepartmentsComponent } from './components/departments/departments.component';
// import { ProjectsComponent, DataFilterPipe } from "../../components/component-index";
// import { NgxPrintModule } from 'ngx-print';

export function tokenGetter() {
  let user = JSON.parse(localStorage.getItem('user'));
  return user?.authToken;
}

// @Pipe({ name: 'keys' })
// export class KeysPipe implements PipeTransform {
//   transform(value): any {
//     return Object.keys(value)
//   }
// }

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CoffeeElectionComponent,
    SiteLayout,
    LoginComponent,
    NoHeaderLayoutComponent,
    AddProjectComponent,
    // PipComponent,
    // ActivitiesGroupControlComponent,
    ActivityDetailsComponent,
    GrievanceRegistrationComponent,
    ConcernedPersonDialogComponent,
    //UpdateComplaintComponent,
    //UpdateComplaintStatusComponent,
    //GRCComponent,
    //EmailToConcernPersonComponent,
   // ComplainantScreenComponent,
    //AssignToConcernPersonComponent,
    //AssignComplainComponent,

    //ListOfAllComplainsComponent,
    // CostDetailsComponent,
    // ProjectImpPlanComponent,
    // ApproverHomeComponent,
    // FillProposalReportsComponent,
    // AddSubProcessComponent,
    // ProjectWorkPlanComponent,
    // QprSectionsComponent,
    // QprComponent,
    // ViewQprComponent,
    // FillQprComponent,
    // NoRightClickDirective,
    // GiaCommentsMatrixComponent,
    // ProposalFileMatrixComponent,
    // SubProjectDocumentSectionsComponent,
    // FillSubProjectDocumentSectionsComponent,
    // ViewSubProjectDocumentSectionsComponent,
    // SubProjectDocumentComponent,
    // GiaChecklistComponent,
    // ViewGiaChecklistComponent,
    // SubmitGiaReviewsComponent,
    // DataFilterPipe
    // GiaReviewProjectsComponent,
    // DepartmentsComponent
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
    // KeysPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    SignaturePadModule ,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    // NgxPrintModule,
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
    MatRadioModule,
    // MatSliderModule,
    BarRatingModule,
    MatDialogModule,
    MatMenuModule,
    // MatRadioModule,
    // MatBadgeModule,
    MatExpansionModule,
    LayoutModule,
    // ProjectPlanModule,
    IntimateFipModule,
    AssigntaskModule,
    ConfirmDialogModule,
    AddProjectDialogModule,
    MatProgressSpinnerModule,

    // GiaProjectsModule,

    // MatDividerModule,
    // MatTreeModule,
    MatCheckboxModule,
    MatTabsModule,
    MatDatepickerModule,

    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ["attendance.tallymarkscloud.com:8080"]
      }
    }),
    FormioModule,
  ],
  providers: [
    ConfirmModelService,
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
    SubProjectDocStore,
    SubProjectDocSectionsStore,
    QprSectionsStore,
    QprStore,
    CostDetailsStore,
  ],
  bootstrap: [AppComponent],
  exports: [
    // TreeComponent,
    FlexLayoutModule
    // ProjectPlanComponent
    // ProjectPlanModule
    // DataFilterPipe
    // PipComponent
  ],
  entryComponents: [
    IntimateFip,
    AssignTask,
    ActivityDetailsComponent,ConcernedPersonDialogComponent
    // ProjectPlanComponent,
  ]
})
export class AppModule { }
