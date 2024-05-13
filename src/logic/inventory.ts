import { TInventoryItem } from '../types/types';

export const getInventorySlotsUsed = ({ inventory }: { inventory: Array<TInventoryItem> }) => {
  return inventory.reduce((total, item) => total + item.quantity, 0);
};
