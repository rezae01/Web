import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './_GURD/auth.guard';

export const AppRoutes: Routes = [{
  path: '',
  redirectTo: 'home',
  pathMatch: 'full',
}, {
  path: '',
  component: AdminLayoutComponent,
  canActivate: [AuthGuard],
  children: [{
    path: 'home',
    loadChildren: './dashboard/dashboard.module#DashboardModule',
    data: { preload: true }
  }, {
    path: 'apps',
    loadChildren: './apps/apps.module#AppsModule',
    data: { preload: true }
  }, {
    path: 'forms',
    loadChildren: './forms/forms.module#FormModule',
    data: { preload: true }
  }]
}, {
  path: '',
  component: AuthLayoutComponent,
  children: [{
    path: 'session',
    loadChildren: './session/session.module#SessionModule'
  }]
},
 {
  path: 'login',
  component: LoginComponent
},
 {
  path: '**',
  redirectTo: 'session/404'
}];
