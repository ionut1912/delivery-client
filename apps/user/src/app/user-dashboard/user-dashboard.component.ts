import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Users } from '../../../../../libs/shared/models/User/Users';

@Component({
  selector: 'delivery-client-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss'],
})
export class UserDashboardComponent implements OnInit {
  public constructor(private httpClient: HttpClient) {}
  ngOnInit() {
    this.httpClient.get<Users>('/Accounts/current').subscribe((response) => {
      console.log(response);
    });
  }
}
