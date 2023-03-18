import { Component, OnInit } from '@angular/core';
import { Users } from '../../../../../libs/shared/models/User/Users';
import { Restaurant } from '../../../../../libs/shared/models/Restaurant/Restaurant';
import { Router } from '@angular/router';
import { AccountService } from '../../../../../libs/shared/services/AccountService';
import { RestaurantService } from '../../../../../libs/shared/services/RestaurantService';

@Component({
  selector: 'delivery-client-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss'],
})
export class UserDashboardComponent implements OnInit {
  user!: Users;
  restaurants!: Restaurant[];
  constructor(
    private accountService: AccountService,
    private restaurantService: RestaurantService,
    private router: Router
  ) {}

  ngOnInit() {
    this.accountService.getCurrentUser().subscribe((response) => {
      this.user = response;
      this.restaurantService
        .getRestaurantByCity(this.user.address.city)
        .subscribe((restaurantResponse: Restaurant[]) => {
          this.restaurants = restaurantResponse;
        });
    });
  }

  goToRestaurant(id: string) {
    this.router.navigate(['/restaurants', id]);
  }
}
