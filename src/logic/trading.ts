import { IGameState, TDailyItem } from '@/types/types';
import { Updater } from 'use-immer';

export const buyItem = ({
  item,
  quantityBought,
  setGameState,
}: {
  item: TDailyItem;
  quantityBought: number;
  setGameState: Updater<IGameState>;
}) =>
  setGameState((draft) => {
    (draft.caps = draft.caps - item.price * quantityBought),
      (draft.inventory.find((inventoryItem) => item.name === inventoryItem.name)!.quantity +=
        quantityBought);
  });
