import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { Address } from 'viem';

import { Tokens } from '@/contracts';

type State = {
  transactionsToken: Address;
};

type Action = {
  setTransactionsToken: (token: Address) => void;
};

const useObjectsStore = create<State & Action>()(
  devtools((set, get) => ({
    transactionsToken: Tokens.USDT,
    setTransactionsToken: tokenAddress => set({ transactionsToken: tokenAddress }),
  }))
);

export default useObjectsStore;
