import { DAILY_BASE_DEBT, MAX_DAYS } from '@/config/config';
import { IGameState } from '@/types/types';
import { Updater } from 'use-immer';
import { getDailyItems } from './items';
import { items } from '@/data/items';
import { cities } from '@/data/cities';

export const progressDay = ({
  gameState,
  setGameState,
  city,
}: {
  gameState: IGameState;
  setGameState: Updater<IGameState>;
  city: cities;
}) => {
  if (gameState.day + 1 === MAX_DAYS) {
    return setGameState((draft) => {
      draft.isGameOver = true;
    });
  }

  setGameState((draft) => {
    (draft.day = draft.day + 1),
      (draft.dailyItems = getDailyItems(items)),
      (draft.debt = draft.debt + DAILY_BASE_DEBT),
      (draft.city = city);
  });
};
