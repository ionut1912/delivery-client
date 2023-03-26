import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestaurantService } from '../../../../../libs/shared/services/RestaurantService';
import { MenuItem } from '../../../../../libs/shared/models/MenuItem/MenuItem';
import { AppState } from '../../../state/app-state.module';
import { Store } from '@ngrx/store';
import { CartActions } from '../cart/store/cart.actions';
import { Restaurant } from '../../../../../libs/shared/models/Restaurant/Restaurant';
@Component({
  selector: 'delivery-client-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.scss'],
})
export class RestaurantsComponent implements OnInit {
  restaurant!: Restaurant;
  mainImage!: string;
  constructor(
    private router: ActivatedRoute,
    private redirect: Router,
    private restaurantService: RestaurantService,
    private store: Store<AppState>
  ) {}
  ngOnInit() {
    this.router.params.subscribe((params) => {
      const id = params['id'];
      this.restaurantService
        .getRestaurantById(id)
        .subscribe((restaurantsResponse) => {
          this.restaurant = restaurantsResponse;
        });
    });
  }
  viewItemDetails(id: string) {
    this.redirect.navigate(['/menuItems', id]);
  }
  getMainPhoto(item: MenuItem) {
    return item.photos.find((photo) => photo.isMain)?.url;
  }
  getImagesUrls(restaurant: Restaurant) {
    return restaurant.restaurantPhotos.map((item) => item.url);
  }
  addToCart(item: MenuItem) {
    this.store.dispatch(
      CartActions.addMenuitem({
        menuItemInOrder: item,
      })
    );
  }
}
