import { createSelector } from '@ngrx/store';
import { CartState } from './cart-state.model';
import { AppState } from '../../../../state/app-state.module';
import { MenuItem } from '../../../../../../libs/shared/models/MenuItem/MenuItem';

const selectCartState = (appState: AppState) => appState.cartState;

export const getAllProductsInCart = createSelector<
  AppState,
  CartState,
  Array<MenuItem>
>(selectCartState, (cartState) => {
  return cartState.menuItems;
});
