import { Route } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OrderManagementComponent } from './order-management/order-management.component';
import { OfferManagementComponent } from './offer-management/offer-management.component';
import { RestaurantManagementComponent } from './restaurant-management/restaurant-management.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { ItemManagementComponent } from './item-management/item-management.component';
import { MenuitemsPhotosComponent } from './menuitems-photos/menuitems-photos.component';
import { RestaurantPhotosComponent } from './restaurant-photos/restaurant-photos.component';

export const appRoutes: Route[] = [
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'order-management',
    component: OrderManagementComponent,
  },
  {
    path: 'offer-management',
    component: OfferManagementComponent,
  },
  {
    path: 'restaurant-management',
    component: RestaurantManagementComponent,
  },
  {
    path: 'user-management',
    component: UserManagementComponent,
  },
  {
    path: 'item-management',
    component: ItemManagementComponent,
  },
  {
    path: 'menuitem-photo/:id',
    component: MenuitemsPhotosComponent,
  },
  {
    path: 'restaurant-photo/:id',
    component: RestaurantPhotosComponent,
  },
];
