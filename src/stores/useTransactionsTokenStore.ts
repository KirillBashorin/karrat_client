import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { Abi, Address } from 'viem';

import { ObjectType } from '@/types';

interface IToken {
  address: Address;
  symbol: string;
  image: string;
  abi: Abi;
}

type State = {
  tokensList: IToken[] | null;
  transactionsToken: IToken | null;
};

type Action = {
  getTokensList: () => Promise<void>;
  setTransactionsToken: (token: IToken) => void;
};

const useTransactionsTokenStore = create<State & Action>()(
  devtools((set, get) => ({
    tokensList: null,
    transactionsToken: null,
    setTransactionsToken: token => {
      set({ transactionsToken: token });
    },
    getTokensList: async () => {
      if (get().transactionsToken) return;

      try {
        const response = await fetch('/data/transactionTokens.json');

        if (!response.ok) throw new Error('Network response was not ok');

        const data = await response.json();

        set({ tokensList: data });
        const firstToken = data[Object.keys(data)[0]];

        get().setTransactionsToken(firstToken);
      } catch (error) {
        console.error('Error fetching objects:', error);
      }
    },
  }))
);

export default useTransactionsTokenStore;
