import { OrderMenuItem } from '../../../../../../libs/shared/models/State/OrderMenuItem';

export const updateMenuItemWithImageInOrderQuantity = (
  allMenuItemsInOrder: Array<OrderMenuItem>,
  menuItemInOrder: OrderMenuItem
): Array<OrderMenuItem> => {
  if (allMenuItemsInOrder.length === 0) {
    return [menuItemInOrder];
  } else {
    if (
      allMenuItemsInOrder.find(
        (po) => po.menuItem.id === menuItemInOrder.menuItem.id
      )
    ) {
      return allMenuItemsInOrder.map((po) =>
        po.menuItem.id === menuItemInOrder.menuItem.id
          ? {
              ...po,
              quantity:
                po.menuItem.quantity + menuItemInOrder.menuItem.quantity,
            }
          : { ...po }
      );
    } else {
      return allMenuItemsInOrder.concat(menuItemInOrder);
    }
  }
};
