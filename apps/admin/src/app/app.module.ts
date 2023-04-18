import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './app.routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MaterialModule } from '../../../../libs/shared/material.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { OfferManagementComponent } from './offer-management/offer-management.component';
import { OrderManagementComponent } from './order-management/order-management.component';
import { RestaurantManagementComponent } from './restaurant-management/restaurant-management.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { ItemManagementComponent } from './item-management/item-management.component';
import { EditOfferModalComponent } from './edit-offer-modal/edit-offer-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AddOffersModalComponent } from './add-offers-modal/add-offers-modal.component';
import { DatePipe } from '@angular/common';
import { EditOrderModalComponent } from './edit-order-modal/edit-order-modal.component';
import { EditRestaurantsModalComponent } from './edit-restaurants-modal/edit-restaurants-modal.component';
import { AddRestaurantsModalComponent } from './add-restaurants-modal/add-restaurants-modal.component';
import { TokenInterceptor } from '../../../../libs/shared/Http/TokenInterceptor';
import { GenericDeleteModalModule } from '@delivery-app-client/generic-delete-modal';
import { StoreModule } from '@ngrx/store';
import { foodShopActionReducerMap } from '../../../user/state/app-state.module';
import { getStorageMetaReducers } from '../../../../libs/util/meta-reducer.util';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { RestaurantPhotosComponent } from './restaurant-photos/restaurant-photos.component';
import { MenuitemsPhotosComponent } from './menuitems-photos/menuitems-photos.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { UserPhotosComponent } from './user-photos/user-photos.component';

@NgModule({
  declarations: [
    AppComponent,
    NxWelcomeComponent,
    NavbarComponent,
    DashboardComponent,
    OfferManagementComponent,
    OrderManagementComponent,
    RestaurantManagementComponent,
    UserManagementComponent,
    ItemManagementComponent,
    EditOfferModalComponent,
    AddOffersModalComponent,
    EditOrderModalComponent,
    EditRestaurantsModalComponent,
    AddRestaurantsModalComponent,
    RestaurantPhotosComponent,
    MenuitemsPhotosComponent,
    UserPhotosComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),
    MaterialModule,
    StoreModule.forRoot(foodShopActionReducerMap, {
      //un fel aspect ca in java(se ruleaza inainte si dupa exectuarea actiunilor)
      metaReducers: [getStorageMetaReducers('food_shop', ['cartState'])],
    }),

    StoreDevtoolsModule.instrument({
      maxAge: 25,
    }),
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    GenericDeleteModalModule,
    CarouselModule,
  ],
  providers: [
    DatePipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
