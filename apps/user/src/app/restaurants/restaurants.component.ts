import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestaurantService } from '../../../../../libs/shared/services/RestaurantService';
import { MenuItem } from '../../../../../libs/shared/models/MenuItem/MenuItem';
import { AppState } from '../../../state/app-state.module';
import { Store } from '@ngrx/store';

import { Restaurant } from '../../../../../libs/shared/models/Restaurant/Restaurant';
import { OrderMenuItem } from '../../../../../libs/shared/models/State/OrderMenuItem';
import { CartActions } from '../cart/store/cart.actions';
import { InternationalizationConfig } from 'libs/shared/models/InternationalizationConfig';
@Component({
  selector: 'delivery-app-client-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.scss'],
})
export class RestaurantsComponent implements OnInit {
  restaurant!: Restaurant;
  mainImage!: string;
  data!: InternationalizationConfig;
  constructor(
    private router: ActivatedRoute,
    private redirect: Router,
    private restaurantService: RestaurantService,
    private store: Store<AppState>,
    private route: ActivatedRoute
  ) {}
  ngOnInit() {
    this.data = this.route.snapshot.data[0];
    this.router.params.subscribe((params) => {
      const id = params['id'];
      this.restaurantService
        .getRestaurantById(id)
        .subscribe((restaurantsResponse) => {
          this.restaurant = restaurantsResponse;
        });
    });
  }
  viewItemDetails(id: string | undefined) {
    this.redirect.navigate(['/menuItems', id]);
  }
  getMainPhoto(item: MenuItem) {
    return item.photos.find((photo) => photo.isMain)?.url;
  }
  getImagesUrls(restaurant: Restaurant) {
    return restaurant.restaurantPhotos.map((item) => item.url);
  }
  addToCart(item: MenuItem) {
    const menuItemInOrder: OrderMenuItem = {
      restaurantName: '',
      menuItem: {
        id: '',
        itemName: '',
        category: '',
        ingredients: '',
        price: 0,
        offerMenuItems: [
          {
            offerId: '',
            menuItemId: '',
          },
        ],
        quantity: 0,
        active: false,
        photos: [
          {
            id: '',
            url: '',
            isMain: false,
            menuItemId: '',
          },
        ],
        menuItemsRestaurants: [
          {
            menuItemsId: '',
            restaurantsId: '',
            menuItems: {
              id: '',
              itemName: '',
              category: '',
              ingredients: '',
              price: 0,
              offerMenuItems: [],
              quantity: 0,
              active: false,
              photos: [],
              menuItemsRestaurants: [],
            },
            restaurants: {
              id: '',
              name: '',
              restaurantPhotos: [],
              address: {
                addressId: '',
                restaurantId: '',
                street: '',
                city: '',
                number: '',
                postalCode: '',
              },
              reviews: [],
              menuItemsRestaurants: [],
            },
          },
        ],
      },
    };
    menuItemInOrder.restaurantName = this.restaurant.name;
    menuItemInOrder.menuItem = item;
    this.store.dispatch(
      CartActions.addMenuitem({
        menuItemInOrder: menuItemInOrder,
      })
    );
  }
}
