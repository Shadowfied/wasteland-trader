import { MINIMUM_ITEM_PRICE } from '@/config/config';
import { TBaseItem, TDailyItem } from '@/types/types';

export function getDailyItemPrice(basePrice: number, adjustRange: number) {
  const randomAdjustment = Math.floor(Math.random() * (adjustRange * 2 + 1)) - adjustRange; // Random adjustment within the range
  const adjustedPrice = basePrice + randomAdjustment;
  const price = Math.max(MINIMUM_ITEM_PRICE, adjustedPrice); // Ensure the price is at least the minimum

  return price;
}

export function getDailyItems(items: Array<TBaseItem>): Array<TDailyItem> {
  return items.map((item) => ({
    name: item.name,
    price: getDailyItemPrice(item.basePrice, item.adjustRange),
  }));
}
