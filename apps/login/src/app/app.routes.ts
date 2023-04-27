import { PageConfigurationResolver } from './../../../../libs/shared/resolvers/PageConfigurationResolver';
import { Route } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

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
];
