import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { MenuItem } from '../../../../../../libs/shared/models/MenuItem/MenuItem';

export const CartActions = createActionGroup({
  source: 'Cart',
  events: {
    'Add menuItem': props<{ menuItemInOrder: MenuItem }>(),

    'Add menuItems': props<{ menuItemsInOrder: Array<MenuItem> }>(),
    'Remove menuItem': props<{ menuItemInOrder: MenuItem }>(),
    'Remove all menuItems': emptyProps(),
    'Update quantity': props<{ menuItemInOrder: MenuItem }>(),
  },
});
