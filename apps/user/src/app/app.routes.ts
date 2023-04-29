import { PageConfigurationResolver } from './../../../../libs/shared/resolvers/PageConfigurationResolver';
import { Route } from '@angular/router';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { CartComponent } from './cart/cart.component';
import { OrdersComponent } from './orders/orders.component';
import { ViewMenuitemComponent } from './view-menuitem/view-menuitem.component';
import { UserConfigComponent } from './user-config/user-config.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { RestaurantReviewsComponent } from './restaurant-reviews/restaurant-reviews.component';
import { ItemsReviewsComponent } from './items-reviews/items-reviews.component';

export const appRoutes: Route[] = [
  {
    path: 'dashboard',
    component: UserDashboardComponent,
    resolve: [PageConfigurationResolver],
  },
  {
    path: 'profile',
    component: UserProfileComponent,
    resolve: [PageConfigurationResolver],
  },
  {
    path: 'restaurants/:id',
    component: RestaurantsComponent,
    resolve: [PageConfigurationResolver],
  },
  {
    path: 'cart',
    component: CartComponent,
    resolve: [PageConfigurationResolver],
  },
  {
    path: 'orders',
    component: OrdersComponent,
    resolve: [PageConfigurationResolver],
  },
  {
    path: 'config',
    component: UserConfigComponent,
    resolve: [PageConfigurationResolver],
  },
  {
    path: 'restaurants-reviews',
    component: RestaurantReviewsComponent,
    resolve: [PageConfigurationResolver],
  },
  {
    path: 'items-reviews',
    component: ItemsReviewsComponent,
    resolve: [PageConfigurationResolver],
  },
  {
    path: 'menuItems/:id',
    component: ViewMenuitemComponent,
    resolve: [PageConfigurationResolver],
  },
];
