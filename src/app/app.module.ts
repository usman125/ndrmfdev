import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
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
// import { MatTableModule } from '@angular/material/table';
// import { MatPaginatorModule } from '@angular/material/paginator';
// import { MatSortModule } from '@angular/material/sort';
import { MatSliderModule } from '@angular/material/slider';
// import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';
// import { MatSnackBarModule } from '@angular/material/snack-bar';
// import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatGridListModule } from '@angular/material/grid-list';
import { BarRatingModule } from "ngx-bar-rating";
// import { FormioModule } from 'angular-formio';
// import { FormioAuthService, FormioAuthConfig } from 'angular-formio/auth';
import { AppConfig } from './config';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HeaderComponent } from './components/common/header/header.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { MatBadgeModule } from '@angular/material/badge';
import { SiteLayout } from "./components/common/layouts/sitelayout/sitelayout.component";
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import {
  AuthGuard,
  LoginComponent,
  // SurveysComponent,
  CoffeeElectionComponent,
  // RegisterComponent,
  // UsersComponent,
  // CreateSurveyComponent,
  // FipHomeComponent,
  // FipEligibilityComponent,
  // FipQualificationComponent,
  // AccreditationRequestComponent,
  // SmeComponent,
  // AddSmeComponent,
  // AddUserComponent,
  AssignTask,
  IntimateFip,
  // AccreditationCommentsMatrixComponent,
  // EligibilityRequestsComponent,
} from './components/component-index';

// import { AuthGuard } from "./components/component-index";

import { AccreditationRequestStore } from './stores/accreditation-requests/accreditation-requests-store';
import { SingleAccreditationRequestStore } from './stores/single-accreditation-requests/single-accreditation-requests-store';
import { SurveysStore } from './stores/surveys/surveys-store';
import { UsersStore } from './stores/users/users-store';
import { AuthStore } from './stores/auth/auth-store';
import { CoffeeElectionStore } from "./stores/coffee-election/coffee-election.store";
import { SmeStore } from "./stores/sme/sme-store";
import { DepartmentsStore } from "./stores/departments/departments-store";
import { AccreditationReviewStore } from "./stores/accreditation-reviews/accreditation-reviews-store";
import { AccreditationCommentsMatrixStore } from './stores/accreditation-comments-matrix/accreditation-comments-matrix-store';
import { fipIntimationsStore } from './stores/fip-intimations/fip-intimations-store';
// import { SectionSelectorComponent } from './components/section-selector/section-selector.component';
import { SectionSelectorStore } from './stores/section-selector/section-selector-store';
import { IntimateFipModule } from './modules/fip-intimations/fip-intimations.module';
import { AssigntaskModule } from './modules/assigntask/assigntask.module';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CoffeeElectionComponent,
    // AssignTask,
    SiteLayout,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
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
    // MatProgressSpinnerModule,
    // MatTableModule,
    // MatPaginatorModule,
    // MatSortModule,
    // FormioModule,
    MatSidenavModule,
    MatListModule,
    // MatSnackBarModule,
    // MatButtonToggleModule,
    MatGridListModule,
    MatSliderModule,
    BarRatingModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    // MatSlideToggleModule,
    MatMenuModule,
    MatRadioModule,
    MatBadgeModule,
    MatExpansionModule,
    LayoutModule,
    IntimateFipModule,
    AssigntaskModule,
  ],
  providers: [
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
  ],
  bootstrap: [AppComponent],
  exports: [],
  entryComponents: [IntimateFip, AssignTask]
})
export class AppModule { }
