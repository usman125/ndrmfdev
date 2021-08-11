import { GrievanceRegistrationComponent } from './grievance-registration/grievance-registration.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  LoginComponent,
  AuthGuard,
  UsersComponent,
  FipHomeComponent,
} from "./components/component-index";
import { SiteLayout } from "./components/common/layouts/sitelayout/sitelayout.component";
import { NoHeaderLayoutComponent } from "./components/common/layouts/no-header-layout/no-header-layout.component";
import { Role } from './models/Roles';
// import { PipComponent } from "./components/pip/pip.component";
// import { ProjectWorkPlanComponent } from "./components/component-index";

const loggedUser = JSON.parse(localStorage.getItem('user'));

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'test',
    component: SiteLayout,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'home',
        component: FipHomeComponent,
      },
      {
        path: 'users',
        component: UsersComponent,
      },
    ]
  },
  {
    path: 'login',
    component: NoHeaderLayoutComponent,
    children: [
      {
        path: '',
        component: LoginComponent
      }
    ]
  },
  {
    path: 'Grievanceregistration',
    // loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule),
    component: GrievanceRegistrationComponent,
    children: [
      {
        path: '',
        component: GrievanceRegistrationComponent,
        data: { roles: [Role.Fip] }
      }
    ],
  },
  {
    path: 'updateComplaint',
    // component: SiteLayout,
    loadChildren: () => import('./modules/update-complaint/update-complaint.module').then(m => m.UpdateComplaintModule)
  },
  {
    path: 'allcomplains',
    loadChildren: () => import('./modules/list-of-all-complains/list-of-all-complains.module').then(m => m.ListOfAllComplainsModule),
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin, Role.Fp] }
  },
  {
    path: 'AssignToConcernedPerson/:userId',
    loadChildren: () => import('./modules/assign-to-concerned-person/assign-to-concerned-person.module').then(m => m.AssignToConcernedPersonModule),
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin, Role.Fp] }
  },
  {
    path: 'grcActions/:userId',
    loadChildren: () => import('./modules/grc-actions/grc-actions.module').then(m => m.GrcActionsModule),
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] }
  },
  {
    path: 'showAttachments/:userId',
    loadChildren: () => import('./modules/show-attachments/show-attachments.module').then(m => m.ShowAttachmentsModule),
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin, Role.Fp] }
  },
  {
    path: 'UpdateStatus/:userId',
    loadChildren: () => import('./modules/update-complaint-status/update-complaint-status.module').then(m => m.UpdateComplaintStatusModule),
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin, Role.Fp] }
  },
  {
    path: 'emailtoConcernPerson/:userId',
    loadChildren: () => import('./modules/email-to-concern-person/email-to-concern-person.module').then(m => m.EmailToConcernPersonModule),
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] }
  },
  {
    path: 'assignComplains',
    loadChildren: () => import('./modules/assign-complain/assign-complain.module').then(m => m.AssignComplainModule),
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] }
  },
  {
    path: 'complainant',
    loadChildren: () => import('./modules/complainant-screen/complainant-screen.module').then(m => m.ComplainantScreenModule),
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin, Role.Fip, Role.Cp, Role.Po, Role.Sme, Role.Gm, Role.Ceo, Role.Dm] }
  },
  {
    path: 'evidenceAndReviews/:userId',
    loadChildren: () => import('./modules/evidence-and-reviews/evidence-and-reviews.module').then(m => m.EvidenceAndReviewsModule),
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin, Role.Fip, Role.Cp, Role.Po, Role.Sme, Role.Gm, Role.Ceo, Role.Dm] }
  },
  {
    path: 'grc',
    loadChildren: () => import('./modules/grc/grc.module').then(m => m.GRCModule),
    canActivate: [AuthGuard],
    data: { roles: [Role.Grc] }
  },
  {
    path: 'ceo',
    loadChildren: () => import('./modules/ceo/ceo.module').then(m => m.CEOModule),
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin, Role.Ceo] }
  },
  {
    path: 'ceoActions/:userId',
    loadChildren: () => import('./modules/ceo-actions/ceo-actions.module').then(m => m.CeoActionsModule),
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin, Role.Ceo] }
  },
  {
    path: 'edit-complain/:userId',
    loadChildren: () => import('./modules/edit-complain/edit-complain.module').then(m => m.EditComplainModule),
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin, Role.Fp] }
  },
  {
    path: 'register',
    // component: SiteLayout,
    loadChildren: () => import('./modules/register/register.module').then(m => m.RegisterModule)
  },
  {
    path: 'pending-signups',
    // component: SiteLayout,
    loadChildren: () => import('./modules/pending-signups/pending-signups.module').then(m => m.PendingSignupsModule),
    canActivate: [AuthGuard],
    data: { roles: [Role.Approver] }
  },
  {
    path: 'assign-sections-process',
    // component: SiteLayout,
    loadChildren: () => import('./modules/assign-sections-process/assign-sections-process.module').then(m => m.AssignSectionsProcessModule)
  },
  {
    path: 'users',
    loadChildren: () => import('./modules/users/users.module').then(m => m.UsersModule),
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] }
  },
  // OTHER APP ROUTES
  {
    path: 'surveys',
    loadChildren: () => import('./modules/surveys/surveys.module').then(m => m.SurveysModule),
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] },
  },
  {
    path: 'create-survey',
    loadChildren: () => import('./modules/create-survey/create-survey.module').then(m => m.CreateSurveyModule),
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] }
  },
  {
    path: 'fip-home',
    loadChildren: () => import('./modules/fip-home/fip-home.module').then(m => m.FipHomeModule),
    canActivate: [AuthGuard],
    data: { roles: [Role.Fip] }
  },
  {
    path: 'fip-eligibility',
    loadChildren: () => import('./modules/fip-eligibility/fip-eligibility.module').then(m => m.FipEligibilityModule),
    canActivate: [AuthGuard],
    data: { roles: [Role.Fip] }
  },
  {
    path: 'fip-qualification',
    loadChildren: () => import('./modules/fip-qualification/fip-qualification.module').then(m => m.FipQualificationModule),
    canActivate: [AuthGuard],
    data: { roles: [Role.Fip] }
  },
  {
    path: 'accreditation-requests/:requestId/:sectionId',
    loadChildren: () => import('./modules/accreditation-request/accreditation-request.module').then(m => m.AccreditationRequestModule),
    canActivate: [AuthGuard],
    data: {
      roles: [Role.Po, Role.Sme]
    }
  },
  {
    path: 'smes',
    loadChildren: () => import('./modules/smes/smes.module').then(m => m.SmesModule),
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] }
  },
  {
    path: 'add-sme',
    loadChildren: () => import('./modules/add-sme/add-sme.module').then(m => m.AddSmeModule),
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] }
  },
  {
    path: 'edit-sme',
    loadChildren: () => import('./modules/edit-sme/edit-sme.module').then(m => m.EditSmeModule),
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] }
  },
  {
    path: 'add-user',
    loadChildren: () => import('./modules/add-user/add-user.module').then(m => m.AddUserModule),
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] }
  },
  {
    path: 'edit-user/:userId',
    loadChildren: () => import('./modules/edit-user/edit-user.module').then(m => m.EditUserModule),
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] }
  },
  {
    path: 'eligibility-requests/:requestId',
    loadChildren: () => import('./modules/eligibility-requests/eligibility-requests.module').then(m => m.EligibilityRequestsModule),
    canActivate: [AuthGuard],
    data: { roles: [Role.Po] }
  },
  {
    path: 'proposal-sections',
    loadChildren: () => import('./modules/proposal-sections/proposal-sections.module').then(m => m.ProposalSectionsModule),
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] }
  },
  {
    path: 'add-proposal-section',
    loadChildren: () => import('./modules/add-proposal-section/add-proposal-section.module').then(m => m.AddProposalSectionModule),
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] }
  },
  {
    path: 'create-proposal-form',
    loadChildren: () => import('./modules/create-proposal-form/create-proposal-form.module').then(m => m.CreateProposalFormModule),
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] }
  },
  {
    path: 'proposal-forms',
    loadChildren: () => import('./modules/proposal-forms/proposal-forms.module').then(m => m.ProposalFormsModule),
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] }
  },
  {
    path: 'project-plan',
    loadChildren: () => import('./modules/admin-pip/admin-pip.module').then(m => m.AdminPipModule),
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] }
  },
  {
    path: 'user-projects',
    loadChildren: () => import('./modules/user-projects/user-projects.module').then(m => m.UserProjectsModule),
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin, Role.Fip] }
  },
  {
    path: 'prepare-gia',
    loadChildren: () => import('./modules/prepare-gia/prepare-gia.module').then(m => m.PrepareGiaModule),
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin, Role.Po] }
  },
  {
    path: 'gia-appraisal/:projectId',
    loadChildren: () => import('./modules/gia-projects/gia-projects.module').then(m => m.GiaProjectsModule),
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin, Role.Po] }
  },
  {
    path: 'primary-appraisal',
    loadChildren: () => import('./modules/primary-appraisal/primary-appraisal.module').then(m => m.PrimaryAppraisalModule),
    canActivate: [AuthGuard],
    data: { roles: [Role.Po] }
  },
  {
    path: 'primary-appraisal-projects',
    loadChildren: () => import('./modules/primary-appraisal-projects/primary-appraisal-projects.module').then(m => m.PrimaryAppraisalProjectsModule),
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin, Role.Dm] }
  },
  {
    path: 'create-primary-appraisal/:projectId',
    loadChildren: () => import('./modules/create-primary-appraisal/create-primary-appraisal.module').then(m => m.CreatePrimaryAppraisalModule),
    canActivate: [AuthGuard],
    data: { roles: [Role.Po] }
  },
  {
    path: 'fill-primary-appraisal/:projectId',
    loadChildren: () => import('./modules/fill-primary-appraisal/fill-primary-appraisal.module').then(m => m.FillPrimaryAppraisalModule),
    canActivate: [AuthGuard],
    data: { roles: [Role.Po, Role.Dm] }
  },
  {
    path: 'view-primary-appraisal/:projectId',
    loadChildren: () => import('./modules/view-primary-appraisal/view-primary-appraisal.module').then(m => m.ViewPrimaryAppraisalModule),
    canActivate: [AuthGuard],
    data: { roles: [Role.Po, Role.Dm, Role.Gm, Role.Ceo] }
  },
  {
    path: 'primary-appraisal-forms',
    loadChildren: () => import('./modules/primary-appraisal-forms/primary-appraisal-forms.module').then(m => m.PrimaryAppraisalFormsModule),
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin, Role.Dm, Role.Sme] }
  },
  {
    path: 'add-primary-appraisal-form/:projectId',
    loadChildren: () => import('./modules/add-primary-appraisal-form/add-primary-appraisal-form.module').then(m => m.AddPrimaryAppraisalFormModule),
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin, Role.Dm, Role.Sme] }
  },
  {
    path: 'extended-appraisals',
    loadChildren: () => import('./modules/extended-appraisal/extended-appraisal.module').then(m => m.ExtendedAppraisalModule),
    canActivate: [AuthGuard],
    data: { roles: [Role.Dm, Role.Sme] }
  },
  {
    path: 'extended-appraisal-forms',
    loadChildren: () => import('./modules/extended-appraisal-forms/extended-appraisal-forms.module').then(m => m.ExtendedAppraisalFormsModule),
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] }
  },
  {
    path: 'add-sub-process',
    loadChildren: () => import('./modules/add-sub-process/add-sub-process.module').then(m => m.AddSubProcessModule),
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] }
  },
  {
    path: 'departments',
    loadChildren: () => import('./modules/departments/departments.module').then(m => m.DepartmentsModule),
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] }
  },
  {
    path: 'designations',
    loadChildren: () => import('./modules/designations/designations.module').then(m => m.DesignationsModule),
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] }
  },
  {
    path: 'add-extended-appraisal-form/:projectId',
    loadChildren: () => import('./modules/add-extended-appraisal-form/add-extended-appraisal-form.module').then(m => m.AddExtendedAppraisalFormModule),
    canActivate: [AuthGuard],
    data: { roles: [Role.Dm, Role.Sme, Role.Po, Role.Gm, Role.Ceo] }
  },
  {
    path: 'extended-appraisal-smes/:projectId',
    loadChildren: () => import('./modules/extended-appraisal-smes/extended-appraisal-smes.module').then(m => m.ExtendedAppraisalSmesModule),
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin, Role.Dm, Role.Po] }
  },
  {
    path: 'add-extended-appraisal-sme',
    loadChildren: () => import('./modules/add-extended-appraisal-sme/add-extended-appraisal-sme.module').then(m => m.AddExtendedAppraisalSmeModule),
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] }
  },
  {
    path: 'project-details/:projectId',
    loadChildren: () => import('./modules/project-details/project-details.module').then(m => m.ProjectDetailsModule),
    canActivate: [AuthGuard],
    data: { roles: [Role.Fip, Role.Gm, Role.Ceo] }
  },
  {
    path: 'pohome',
    loadChildren: () => import('./modules/po-home/po-home.module').then(m => m.PoHomeModule),
    canActivate: [AuthGuard],
    data: { roles: [Role.Po] }
  },
  {
    path: 'smehome',
    loadChildren: () => import('./modules/sme-home/sme-home.module').then(m => m.SmeHomeModule),
    canActivate: [AuthGuard],
    data: { roles: [Role.Sme] }
  },
  {
    path: 'adminhome',
    loadChildren: () => import('./modules/admin-home/admin-home.module').then(m => m.AdminHomeModule),
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] }
  },
  {
    path: 'gmhome',
    loadChildren: () => import('./modules/gm-home/gm-home.module').then(m => m.GmHomeModule),
    canActivate: [AuthGuard],
    data: { roles: [Role.Gm] }
  },
  {
    path: 'gmproposals',
    loadChildren: () => import('./modules/gm-proposals/gm-proposals.module').then(m => m.GmProposalsModule),
    canActivate: [AuthGuard],
    data: { roles: [Role.Gm] }
  },
  {
    path: 'ceohome',
    loadChildren: () => import('./modules/ceo-home/ceo-home.module').then(m => m.CeoHomeModule),
    canActivate: [AuthGuard],
    data: { roles: [Role.Ceo] }
  },
  {
    path: 'dmpamhome',
    loadChildren: () => import('./modules/dmpam-home/dmpam-home.module').then(m => m.DmpamHomeModule),
    canActivate: [AuthGuard],
    data: { roles: [Role.Dm] }
  },
  {
    path: 'ceoproposals',
    loadChildren: () => import('./modules/ceo-proposals/ceo-proposals.module').then(m => m.CeoProposalsModule),
    canActivate: [AuthGuard],
    data: { roles: [Role.Ceo] }
  },
  {
    path: 'govt-accredit-requests',
    loadChildren: () => import('./modules/govt-accredit-requests/govt-accredit-requests.module').then(m => m.GovtAccreditRequestsModule),
    canActivate: [AuthGuard],
    data: { roles: [Role.Po] }
  },
  {
    path: 'govt-agency-home',
    loadChildren: () => import('./modules/govt-agency-home/govt-agency-home.module').then(m => m.GovtAgencyHomeModule),
    canActivate: [AuthGuard],
    data: { roles: [Role.Fip] }
  },
  {
    path: 'gia-review-projects',
    loadChildren: () => import('./modules/gia-review-projects/gia-review-projects.module').then(m => m.GiaReviewProjectsModule),
    canActivate: [AuthGuard],
    data: { roles: [Role.Ceo, Role.Gm, Role.Sme, Role.Po] }
  },
  {
    path: 'submit-gia-reviews/:projectId',
    loadChildren: () => import('./modules/submit-gia-reviews/submit-gia-reviews.module').then(m => m.SubmitGiaReviewsModule),
    canActivate: [AuthGuard],
    data: { roles: [Role.Ceo, Role.Gm, Role.Sme, Role.Po, Role.Fip] }
  },
  {
    path: 'view-gia-checklist/:projectId',
    loadChildren: () => import('./modules/view-gia-checklist/view-gia-checklist.module').then(m => m.ViewGiaChecklistModule),
    canActivate: [AuthGuard],
    data: { roles: [Role.Ceo, Role.Gm, Role.Sme, Role.Po, Role.Fip] }
  },
  {
    path: 'sub-project-document',
    loadChildren: () => import('./modules/sub-project-document/sub-project-document.module').then(m => m.SubProjectDocumentModule),
    canActivate: [AuthGuard],
    data: { roles: [Role.Ceo, Role.Gm, Role.Sme, Role.Po, Role.Fip] }
  },
  {
    path: 'sub-project-document-dmpam-tasks',
    loadChildren: () => import('./modules/sub-project-document-dmpam-tasks/sub-project-document-dmpam-tasks.module').then(m => m.SubProjectDocumentDmpamTasksModule),
    canActivate: [AuthGuard],
    data: { roles: [Role.Ceo, Role.Gm, Role.Sme, Role.Po, Role.Fip, Role.Dm] }
  },
  {
    path: 'sub-project-document-tasks',
    loadChildren: () => import('./modules/sub-project-document-tasks/sub-project-document-tasks.module').then(m => m.SubProjectDocumentTasksModule),
    canActivate: [AuthGuard],
    data: { roles: [Role.Ceo, Role.Gm, Role.Sme, Role.Po, Role.Fip, Role.Dm] }
  },
  {
    path: 'gia-comments-matrix/:projectId',
    loadChildren: () => import('./modules/gia-comments-matrix/gia-comments-matrix.module').then(m => m.GiaCommentsMatrixModule),
    canActivate: [AuthGuard],
    data: { roles: [Role.Ceo, Role.Gm, Role.Po, Role.Fip] }
  },
  {
    path: 'proposal-file-matrix/:projectId',
    loadChildren: () => import('./modules/proposal-file-matrix/proposal-file-matrix.module').then(m => m.ProposalFileMatrixModule),
    canActivate: [AuthGuard],
    data: { roles: [Role.Ceo, Role.Gm, Role.Po, Role.Fip] }
  },
  {
    path: 'fill-sub-project-document/:requestId',
    loadChildren: () => import('./modules/fill-sub-project-document-sections/fill-sub-project-document-sections.module').then(m => m.FillSubProjectDocumentSectionsModule),
    canActivate: [AuthGuard],
    data: { roles: [Role.Fip] }
  },
  {
    path: 'view-sub-project-document/:requestId',
    loadChildren: () => import('./modules/view-sub-project-document-sections/view-sub-project-document-sections.module').then(m => m.ViewSubProjectDocumentSectionsModule),
    canActivate: [AuthGuard],
    data: { roles: [Role.Po, Role.Sme, Role.Dm] }
  },
  {
    path: 'fill-qpr/:requestId',
    loadChildren: () => import('./modules/fill-qpr/fill-qpr.module').then(m => m.FillQprModule),
    canActivate: [AuthGuard],
    data: { roles: [Role.Po, Role.Sme, Role.Fip, Role.Gm, Role.Ceo] }
  },
  {
    path: 'fill-proposal-reports/:requestId',
    loadChildren: () => import('./modules/fill-proposal-reports/fill-proposal-reports.module').then(m => m.FillProposalReportsModule),
    canActivate: [AuthGuard],
    data: { roles: [Role.Po, Role.Sme] }
  },
  {
    path: 'view-qpr/:requestId',
    loadChildren: () => import('./modules/view-qpr/view-qpr.module').then(m => m.ViewQprModule),
    canActivate: [AuthGuard],
    data: { roles: [Role.Po, Role.Sme, Role.Fip] }
  },
  {
    path: 'qpr',
    loadChildren: () => import('./modules/qpr/qpr.module').then(m => m.QprModule),
    canActivate: [AuthGuard],
    data: { roles: [Role.Po, Role.Sme, Role.Fip] }
  },
  {
    path: 'approverhome',
    loadChildren: () => import('./modules/approver-home/approver-home.module').then(m => m.ApproverHomeModule),
    canActivate: [AuthGuard],
    data: { roles: [Role.Approver] }
  },
  {
    // path: 'view-govt-agency-request/:requestId',
    path: 'view-govt-agency-request',
    loadChildren: () => import('./modules/view-govt-agency-request/view-govt-agency-request.module').then(m => m.ViewGovtAgencyRequestModule),
    canActivate: [AuthGuard],
    data: { roles: [Role.Po] }
  },
  {
    path: 'pip',
    loadChildren: () => import('./modules/pip/pip.module').then(m => m.PipModule),
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin, Role.Po, Role.Fip, Role.Dm, Role.Ceo] }
    // component: PipComponent
  },
  {
    path: 'all-eligibility-requests',
    loadChildren: () => import('./modules/all-eligibility-requests/all-eligibility-requests.module').then(m => m.AllEligibilityRequestsModule),
    canActivate: [AuthGuard],
    data: { roles: [Role.Po, Role.Sme] }
    // component: PipComponent
  },
  {
    path: 'all-qualification-requests',
    loadChildren: () => import('./modules/all-qualification-requests/all-qualification-requests.module').then(m => m.AllQualificationRequestsModule),
    canActivate: [AuthGuard],
    data: { roles: [Role.Po, Role.Sme] }
    // component: PipComponent
  },
  {
    path: 'eligibility-view/:requestId',
    loadChildren: () => import('./modules/eligibility-request-view/eligibility-request-view.module').then(m => m.EligibilityRequestViewModule),
    canActivate: [AuthGuard],
    data: { roles: [Role.Po, Role.Sme] }
    // component: PipComponent
  },
  {
    path: 'plan',
    loadChildren: () => import('./modules/project-imp-plan/project-imp-plan.module').then(m => m.ProjectImpPlanModule),
    canActivate: [AuthGuard],
    // component: ProjectWorkPlanComponent
  },
  {
    path: 'plan-report',
    loadChildren: () => import('./modules/qualification-report/qualification-report.module').then(m => m.QualificationReportModule),
    canActivate: [AuthGuard],
    // component: ProjectWorkPlanComponent
  },
  {
    path: 'grant-disbursments',
    loadChildren: () => import('./modules/grant-disbursments/grant-disbursments.module').then(m => m.GrantDisbursmentsModule),
    canActivate: [AuthGuard],
    // component: ProjectWorkPlanComponent
  },
  {
    path: 'view-grant-disbursment/:requestId',
    loadChildren: () => import('./modules/view-grant-disbursment/view-grant-disbursment.module').then(m => m.ViewGrantDisbursmentModule),
    canActivate: [AuthGuard],
    // component: ProjectWorkPlanComponent
  },
  {
    path: 'sme-qpr-requests',
    loadChildren: () => import('./modules/sme-qpr-requests/sme-qpr-requests.module').then(m => m.SmeQprRequestsModule),
    canActivate: [AuthGuard],
    data: { roles: [Role.Sme, Role.Po, Role.Ceo, Role.Gm] }
    // component: ProjectWorkPlanComponent
  },
  {
    path: 'qpr-to-donor',
    loadChildren: () => import('./modules/qpr-to-donor/qpr-to-donor.module').then(m => m.QprToDonorModule),
    canActivate: [AuthGuard],
    data: { roles: [Role.Sme, Role.Po, Role.Ceo, Role.Gm] }
    // component: ProjectWorkPlanComponent
  },
  {
    path: 'qpr-to-donor/:requestId',
    loadChildren: () => import('./modules/qpr-to-donor-request/qpr-to-donor-request.module').then(m => m.QprToDonorRequestModule),
    canActivate: [AuthGuard],
    data: { roles: [Role.Sme, Role.Po, Role.Ceo, Role.Gm] }
    // component: ProjectWorkPlanComponent
  },
  {
    path: 'sub-project-document-comments-matrix/:requestId',
    loadChildren: () => import('./modules/sub-project-document-comments-matrix/sub-project-document-comments-matrix.module').then(m => m.SubProjectDocumentCommentsMatrixModule),
    canActivate: [AuthGuard],
    data: { roles: [Role.Sme, Role.Po, Role.Ceo, Role.Gm, Role.Dm] }
    // component: ProjectWorkPlanComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
