import { Route } from '@angular/router';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { CartComponent } from './cart/cart.component';
import { OrdersComponent } from './orders/orders.component';
import { ViewMenuitemComponent } from './view-menuitem/view-menuitem.component';

export const appRoutes: Route[] = [
  {
    path: 'dashboard',
    component: UserDashboardComponent,
  },
  {
    path: 'profile',
    component: UserProfileComponent,
  },
  {
    path: 'restaurants/:id',
    component: RestaurantsComponent,
  },
  {
    path: 'cart',
    component: CartComponent,
  },
  {
    path: 'orders',
    component: OrdersComponent,
  },
  {
    path: 'menuItems/:id',
    component: ViewMenuitemComponent,
  },
];
