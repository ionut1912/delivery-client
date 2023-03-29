import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { OrderMenuItem } from '../../../../../../libs/shared/models/State/OrderMenuItem';

export const CartActions = createActionGroup({
  source: 'Cart',
  events: {
    'Add menuItem': props<{ menuItemInOrder: OrderMenuItem }>(),

    'Add menuItems': props<{ menuItemsInOrder: Array<OrderMenuItem> }>(),
    'Remove menuItem': props<{ menuItemInOrder: OrderMenuItem }>(),
    'Remove all menuItems': emptyProps(),
    'Update quantity': props<{ menuItemInOrder: OrderMenuItem }>(),
  },
});
