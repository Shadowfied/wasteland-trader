import { cities } from '@/data/cities';

export type TInventoryItem = {
  quantity: number;
  name: string;
  paidPrice: number;
};

export type TDailyItem = {
  name: string;
  price: number;
};

export type TBaseItem = {
  name: string;
  basePrice: number;
  adjustRange: number;
};

export interface IGameState {
  day: number;
  city: cities;
  debt: number;
  caps: number;
  inventory: Array<TInventoryItem>;
  dailyItems: Array<TDailyItem>;
  health: number;
  isGameOver: boolean;
}
