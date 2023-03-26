import { MenuItem } from '../../../../../../libs/shared/models/MenuItem/MenuItem';

export const updateMenuItemWithImageInOrderQuantity = (
  allMenuItemsInOrder: Array<MenuItem>,
  menuItemInOrder: MenuItem
): Array<MenuItem> => {
  if (allMenuItemsInOrder.length === 0) {
    return [menuItemInOrder];
  } else {
    if (allMenuItemsInOrder.find((po) => po.id === menuItemInOrder.id)) {
      return allMenuItemsInOrder.map((po) =>
        po.id === menuItemInOrder.id
          ? { ...po, quantity: po.quantity + menuItemInOrder.quantity }
          : { ...po }
      );
    } else {
      return allMenuItemsInOrder.concat(menuItemInOrder);
    }
  }
};
