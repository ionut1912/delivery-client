import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestaurantService } from '../../../../../libs/shared/services/RestaurantService';
import { Restaurant } from '../../../../../libs/shared/models/Restaurant/Restaurant';

@Component({
  selector: 'delivery-client-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.scss'],
})
export class RestaurantsComponent implements OnInit {
  restaurant!: Restaurant;
  constructor(
    private router: ActivatedRoute,
    private redirect: Router,
    private restaurantService: RestaurantService
  ) {}
  ngOnInit() {
    this.router.params.subscribe((params) => {
      const id = params['id'];
      this.restaurantService
        .getRestaurantById(id)
        .subscribe((restaurantsResponse) => {
          this.restaurant = restaurantsResponse;
          console.log(this.restaurant);
        });
    });
  }
  viewItemDetails(id: string) {
    this.redirect.navigate(['/menuItems', id]);
  }
}
