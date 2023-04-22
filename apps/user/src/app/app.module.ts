import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './app.routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { MaterialModule } from '../../../../libs/shared/material.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from '../../../../libs/shared/Http/TokenInterceptor';
import { NavbarComponent } from './navbar/navbar.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { CartComponent } from './cart/cart.component';
import { OrdersComponent } from './orders/orders.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ViewMenuitemComponent } from './view-menuitem/view-menuitem.component';
import { GenericReviewsModule } from '@delivery-app-client/generic-reviews';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { StoreModule } from '@ngrx/store';
import { foodShopActionReducerMap } from '../../state/app-state.module';
import { getStorageMetaReducers } from '../../../../libs/util/meta-reducer.util';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { GenericTableModule } from '@delivery-app-client/generic-table';
import { UserConfigComponent } from './user-config/user-config.component';
import { GenericDeleteModalModule } from '@delivery-app-client/generic-delete-modal';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CarouselComponent } from './carousel/carousel.component';

@NgModule({
  declarations: [
    AppComponent,
    NxWelcomeComponent,
    UserDashboardComponent,
    NavbarComponent,
    UserProfileComponent,
    RestaurantsComponent,
    CartComponent,
    OrdersComponent,
    ViewMenuitemComponent,
    CarouselComponent,
    UserConfigComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),
    MaterialModule,
    HttpClientModule,
    StoreModule.forRoot(foodShopActionReducerMap, {
      metaReducers: [getStorageMetaReducers('food_shop', ['cartState'])],
    }),

    StoreDevtoolsModule.instrument({
      maxAge: 25,
    }),
    ReactiveFormsModule,
    GenericReviewsModule,
   CarouselModule,
    GenericTableModule,
    GenericDeleteModalModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],

  bootstrap: [AppComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA],
  exports: [NavbarComponent],
})
export class AppModule {}
