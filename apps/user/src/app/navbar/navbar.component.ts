import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../../state/app-state.module';
import { getAllProductsInCart } from '../cart/store/getAllMenuItemsInCart';
import { OrderMenuItem } from '../../../../../libs/shared/models/State/OrderMenuItem';

@Component({
  selector: 'delivery-client-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(private router: Router, private store: Store<AppState>) {}
  cart$!: Observable<OrderMenuItem[]>;
  ngOnInit() {
    this.cart$ = this.store.select(getAllProductsInCart);
  }

  logout() {
    sessionStorage.clear();
    window.location.href = ' http://localhost:4202/ ';
  }

  goToPage(url: string) {
    this.router.navigateByUrl(url);
  }
}
