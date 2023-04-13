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
import { HttpClientModule } from '@angular/common/http';
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
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),
    MaterialModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
