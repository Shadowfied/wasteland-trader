import { IGameState } from '@/types/types';
import { Updater } from 'use-immer';

export const payDebt = ({ setGameState }: { setGameState: Updater<IGameState> }) => {
  setGameState((draft) => {
    (draft.caps = draft.caps - draft.debt), (draft.debt = 0);
  });
};
