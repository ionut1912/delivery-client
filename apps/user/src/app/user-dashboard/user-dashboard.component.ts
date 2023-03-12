import {Component, OnInit} from '@angular/core';
import {Users} from "../../../../../libs/shared/models/User/Users";
import {HttpClient} from "@angular/common/http";
import {Restaurant} from "../../../../../libs/shared/models/Restaurant/Restaurant";
import {Router} from "@angular/router";

@Component({
  selector: 'delivery-client-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss'],
})
export class UserDashboardComponent implements  OnInit{
  user!:Users;
  restaurants!:Restaurant[];
  constructor(private httpClient:HttpClient,private router:Router) {}

  ngOnInit() {
this.httpClient.get<Users>('Accounts/current').subscribe((response)=>{

  this.user=response;
  this.httpClient.get<Restaurant[]>(`Restaurants/getByCity/${this.user.address.city}`).subscribe((restaurantResponse)=>{
    this.restaurants=restaurantResponse;
  });
})

  }

  goToRestaurant(id: string) {
    this.router.navigate(['/restaurants', id]);
  }
}
