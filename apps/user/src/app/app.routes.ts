import { Route } from '@angular/router';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';

export const appRoutes: Route[] = [
  {
    path: 'dashboard',
    component: UserDashboardComponent,
  },
];
