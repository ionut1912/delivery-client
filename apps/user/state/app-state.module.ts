import { CartState } from '../src/app/cart/store/cart-state.model';
import { ActionReducerMap } from '@ngrx/store';
import { cartReducer } from '../src/app/cart/store/cart.reducer';

export interface AppState {
  cartState: CartState;
}
export const foodShopActionReducerMap: ActionReducerMap<AppState> = {
  cartState: cartReducer,
};
