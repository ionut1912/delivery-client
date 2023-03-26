import { CartState } from './cart-state.model';
import { createReducer, on } from '@ngrx/store';
import { CartActions } from './cart.actions';
import { updateMenuItemWithImageInOrderQuantity } from './cart.util';

const cartInitialState: CartState = {
  menuItems: [],
};
export const cartReducer = createReducer<CartState>(
  cartInitialState,
  on(CartActions.addMenuitem, (state, { menuItemInOrder }) => {
    return {
      ...state,
      menuItems: updateMenuItemWithImageInOrderQuantity(
        [...state.menuItems],
        menuItemInOrder
      ),
    };
  }),

  on(CartActions.addMenuitems, (state, { menuItemsInOrder }) => {
    let allMenuItems = [...state.menuItems];
    menuItemsInOrder.forEach((menuItem) => {
      allMenuItems = updateMenuItemWithImageInOrderQuantity(
        allMenuItems,
        menuItem
      );
    });
    return { ...state, menuItems: allMenuItems };
  }),
  on(CartActions.updateQuantity, (state, { menuItemInOrder }) => ({
    ...state,
    menuItems: state.menuItems.map((mo) =>
      mo.id === menuItemInOrder.id
        ? { ...mo, quantity: menuItemInOrder.quantity }
        : { ...mo }
    ),
  })),
  on(CartActions.removeMenuitem, (state, { menuItemInOrder }) => ({
    ...state,
    menuItems: state.menuItems.filter(
      (menuItem) => menuItem.id != menuItemInOrder.id
    ),
  })),
  on(CartActions.removeAllMenuitems, (state) => {
    return {
      ...state,
      menuItems: [],
    };
  })
);
