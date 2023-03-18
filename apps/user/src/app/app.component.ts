import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../../../libs/shared/services/AccountService';

@Component({
  selector: 'delivery-app-client-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'user';
  constructor(private loginService: AccountService) {}
  ngOnInit() {
    this.loginService.handleResponseFromState();
  }
}
