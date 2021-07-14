import { NgModule } from '@angular/core';
import { SignaturePadModule } from 'angular2-signaturepad';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginService } from './services/login.service';
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
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HeaderComponent } from './components/common/header/header.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
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
import { GrantDisbursmentsStore } from './stores/grant-disbursments/grant-disbursments-store';
import { IntimateFipModule } from './modules/fip-intimations/fip-intimations.module';
import { AssigntaskModule } from './modules/assigntask/assigntask.module';
import { ConfirmDialogModule } from './modules/confirm-dialog/confirm-dialog.module';
import { AddProjectDialogModule } from './modules/add-project-dialog/add-project-dialog.module';
import { NoHeaderLayoutComponent } from './components/common/layouts/no-header-layout/no-header-layout.component';
import { MatCheckboxModule } from "@angular/material/checkbox";
import { JwtModule } from "@auth0/angular-jwt";
import { ActivityDetailsComponent } from './components/activity-details/activity-details.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { SingleGrantDisbursmentsStore } from './stores/single-grant-disbursment/single-grant-disbursment-store';
import { DesignationsStore } from './stores/designations/designations-store';
import { MatRadioModule } from '@angular/material/radio';
import { AccreditationRequestReplayStore } from './stores/accreditation-requests/AccreditationRequestReplayStore';
import { GrievanceRegistrationComponent } from './grievance-registration/grievance-registration.component';
import { ConcernedPersonDialogComponent } from './components/concerned-person-dialog/concerned-person-dialog.component';
import { QprSingleRequestStore } from './stores/qpr-single-request/qpr-single-request-store';
import { AdvanceLiquidationItemStore } from './stores/advance-liquidation-item/advance-liquidation-item-store';
import { QprToDonorRequestStore } from './stores/qpr-to-donor-request/qpr-to-donor-request-store';
// import { TpvComponent } from './components/tpv/tpv.component';
// import { ProjectClosureRequestComponent } from './components/project-closure-request/project-closure-request.component';
// import { SubProjectDocumentCommentsMatrixComponent } from './components/sub-project-document-comments-matrix/sub-project-document-comments-matrix.component';
// import { SubProjectDocumentDmpamTasksComponent } from './components/sub-project-document-dmpam-tasks/sub-project-document-dmpam-tasks.component';
// import { SubProjectDocumentTasksComponent } from './components/sub-project-document-tasks/sub-project-document-tasks.component';
// import { QprToDonorRequestComponent } from './components/qpr-to-donor-request/qpr-to-donor-request.component';
// import { QprToDonorComponent } from './components/qpr-to-donor/qpr-to-donor.component';
// import { SumPipe } from './pipes/sum-columns.pipe';
// import { AmountToWordPipe } from './pipes/amount-to-word.pipe';


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
    ActivityDetailsComponent,
    GrievanceRegistrationComponent,
    ConcernedPersonDialogComponent,
    // TpvComponent,
    // ProjectClosureRequestComponent,
    // SubProjectDocumentCommentsMatrixComponent,
    // SubProjectDocumentDmpamTasksComponent,
    // SubProjectDocumentTasksComponent,
    // QprToDonorRequestComponent,
    // QprToDonorComponent,
    // SumPipe,
    // AmountToWordPipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    SignaturePadModule,
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
    BarRatingModule,
    MatDialogModule,
    MatMenuModule,
    MatExpansionModule,
    LayoutModule,
    IntimateFipModule,
    AssigntaskModule,
    ConfirmDialogModule,
    AddProjectDialogModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatTabsModule,
    MatDatepickerModule,
    MatRadioModule,


    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        // whitelistedDomains: ["attendance.tallymarkscloud.com:8080"]
        allowedDomains: ["localhost:8080", "attendance.tallymarkscloud.com:8080", "ndrmf.tallymarkscloud.com:8443"]
      }
    }),
    FormioModule,
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
    DesignationsStore,
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
    GrantDisbursmentsStore,
    SingleGrantDisbursmentsStore,
    AccreditationRequestReplayStore,
    QprSingleRequestStore,
    AdvanceLiquidationItemStore,
    QprToDonorRequestStore,
  ],
  bootstrap: [AppComponent],
  exports: [FlexLayoutModule],
  entryComponents: [
    IntimateFip,
    AssignTask,
    ActivityDetailsComponent,
    ConcernedPersonDialogComponent,
  ]
})
export class AppModule { }
