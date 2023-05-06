import { PageConfigurationResolver } from './../../../../libs/shared/resolvers/PageConfigurationResolver';
import { Route } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SendCodeComponent } from './send-code/send-code.component';
import { InsertCodeComponent } from './insert-code/insert-code.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

export const appRoutes: Route[] = [
  {
    path: '',
    resolve: [PageConfigurationResolver],
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    resolve: [PageConfigurationResolver],
  },
  {
    path: 'register',
    component: RegisterComponent,
    resolve: [PageConfigurationResolver],
  },
  {
    path: 'send-code',
    component: SendCodeComponent,
    resolve: [PageConfigurationResolver],
  },
  {
    path: 'insert-code',
    component: InsertCodeComponent,
    resolve: [PageConfigurationResolver],
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent,
    resolve: [PageConfigurationResolver],
  },
];
