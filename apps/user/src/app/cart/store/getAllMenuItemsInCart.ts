import { createSelector } from '@ngrx/store';
import { CartState } from './cart-state.model';
import { AppState } from '../../../../state/app-state.module';
import { OrderMenuItem } from '../../../../../../libs/shared/models/State/OrderMenuItem';

const selectCartState = (appState: AppState) => appState.cartState;

export const getAllProductsInCart = createSelector<
  AppState,
  CartState,
  Array<OrderMenuItem>
>(selectCartState, (cartState) => {
  return cartState.menuItems;
});
