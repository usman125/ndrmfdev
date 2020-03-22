import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  LoginComponent,
  SurveysComponent,
  CoffeeElectionComponent,
  RegisterComponent,
  AuthGuard,
  UsersComponent,
  CreateSurveyComponent,
  FipHomeComponent,
  FipEligibilityComponent,
  FipQualificationComponent,
  AccreditationRequestComponent,
  SmeComponent,
  AddSmeComponent,
  AddUserComponent,
  AccreditationCommentsMatrixComponent,
  EligibilityRequestsComponent,
} from "./components/component-index";
import { SiteLayout } from "./components/common/layouts/sitelayout/sitelayout.component";
import { NoHeaderLayoutComponent } from "./components/common/layouts/no-header-layout/no-header-layout.component";
import { Role } from './models/Roles';

const loggedUser = JSON.parse(localStorage.getItem('user'));

// const routes: Routes = [
//   {
//     path: 'test',
//     component: SiteLayout,
//     canActivate: [AuthGuard],
//     children: [
//       {
//         path: 'home',
//         component: FipHomeComponent,
//       },
//       {
//         path: 'users',
//         component: UsersComponent,
//         // canActivate: [AuthGuard],
//         // data: { roles: [Role.Admin] }
//       },
//     ]
//   },
//   {
//     path: 'login',
//     component: LoginComponent,
//   },
//   {
//     path: 'register',
//     component: RegisterComponent
//   },
//   {
//     path: 'surveys',
//     component: SurveysComponent,
//     canActivate: [AuthGuard],
//     data: { roles: [Role.Admin] }
//   },
//   {
//     path: 'coffee',
//     component: CoffeeElectionComponent,
//     canActivate: [AuthGuard]
//   },
//   {
//     path: 'users',
//     component: UsersComponent,
//     canActivate: [AuthGuard],
//     data: { roles: [Role.Admin] }
//   },
//   {
//     path: 'create-survey',
//     component: CreateSurveyComponent,
//     canActivate: [AuthGuard],
//     data: { roles: [Role.Admin] }
//   },
//   {
//     path: 'fip-home',
//     component: FipHomeComponent,
//     canActivate: [AuthGuard],
//     data: { roles: [Role.Fip] }
//   },
//   {
//     path: 'fip-eligibility',
//     component: FipEligibilityComponent,
//     canActivate: [AuthGuard],
//     data: { roles: [Role.Fip] }
//   },
//   {
//     path: 'fip-qualification',
//     component: FipQualificationComponent,
//     canActivate: [AuthGuard],
//     data: { roles: [Role.Fip] }
//   },
//   {
//     path: 'accreditation-requests',
//     component: AccreditationRequestComponent,
//     canActivate: [AuthGuard],
//     data: { 
//       roles: [Role.Admin, Role.Sme] 
//     }
//   },
//   {
//     path: 'smes',
//     component: SmeComponent,
//     canActivate: [AuthGuard],
//     data: { roles: [Role.Admin] }
//   },
//   {
//     path: 'add-sme',
//     component: AddSmeComponent,
//     canActivate: [AuthGuard],
//     data: { roles: [Role.Admin] }
//   },
//   {
//     path: 'add-user',
//     component: AddUserComponent,
//     canActivate: [AuthGuard],
//     data: { roles: [Role.Admin] }
//   },
//   {
//     path: 'request-comments',
//     component: AccreditationCommentsMatrixComponent,
//     canActivate: [AuthGuard],
//     data: { roles: [Role.Admin] }
//   },
//   {
//     path: 'eligibility-requests',
//     component: EligibilityRequestsComponent,
//     canActivate: [AuthGuard],
//     data: { roles: [Role.Admin] }
//   },
//   // {
//   //   path: 'form',
//   //   loadChildren: './form/form.module#FormModule',
//   //   canActivate: [AuthGuard]
//   // },
//   {
//     path: '**',
//     component: LoginComponent,
//   },

// ];
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
    // loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule),
    component: NoHeaderLayoutComponent,
    children: [
      {
        path: '',
        component: LoginComponent
      }
    ]
  },
  {
    path: 'register',
    loadChildren: () => import('./modules/register/register.module').then(m => m.RegisterModule)
  },
  {
    path: 'users',
    loadChildren: () => import('./modules/users/users.module').then(m => m.UsersModule),
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] }
  },
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
    path: 'accreditation-requests',
    loadChildren: () => import('./modules/accreditation-request/accreditation-request.module').then(m => m.AccreditationRequestModule),
    canActivate: [AuthGuard],
    data: {
      roles: [Role.Admin, Role.Sme]
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
    path: 'add-user',
    loadChildren: () => import('./modules/add-user/add-user.module').then(m => m.AddUserModule),
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] }
  },
  {
    path: 'eligibility-requests',
    loadChildren: () => import('./modules/eligibility-requests/eligibility-requests.module').then(m => m.EligibilityRequestsModule),
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] }
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
