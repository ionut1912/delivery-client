import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../../state/app-state.module';
import { getAllProductsInCart } from '../cart/store/getAllMenuItemsInCart';
import { OrderMenuItem } from '../../../../../libs/shared/models/State/OrderMenuItem';
import { InternationalizationConfig } from 'libs/shared/models/InternationalizationConfig';
import { InternationalizationService } from 'libs/shared/services/InternationalizationService';

@Component({
  selector: 'delivery-app-client-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  data!: InternationalizationConfig;
  constructor(
    private router: Router,
    private store: Store<AppState>,
    private internationalizationService: InternationalizationService
  ) {}
  cart$!: Observable<OrderMenuItem[]>;
  ngOnInit() {
    const language = sessionStorage.getItem('LANGUAGE');
    let pageName = 'navbar';
    pageName = pageName + '.' + language?.toLowerCase();
    this.internationalizationService.getConfig(pageName).subscribe((config) => {
      this.data = config;
    });
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
