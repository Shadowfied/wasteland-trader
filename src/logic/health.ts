import { HEALTH_CURE_COST, HEALTH_FULL } from '@/config/config';
import { IGameState } from '@/types/types';
import { Updater } from 'use-immer';

export const cureHealth = ({ setGameState }: { setGameState: Updater<IGameState> }) => {
  setGameState((draft) => {
    (draft.health = HEALTH_FULL), (draft.caps = draft.caps - HEALTH_CURE_COST);
  });
};
