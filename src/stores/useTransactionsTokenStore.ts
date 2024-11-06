import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { Abi, Address } from 'viem';

interface IToken {
  address: Address;
  symbol: string;
  icon: string;
  abi: Abi;
  decimals: number | undefined;
}

type State = {
  transactionsTokensList: IToken[] | null;
  transactionsToken: IToken | null;
};

type Action = {
  getTokensList: () => Promise<void>;
  setTransactionsToken: (token: IToken) => void;
  setDecimalsForTransactionsToken: (decimals: number) => void;
};

const useTransactionsTokenStore = create<State & Action>()(
  devtools((set, get) => ({
    transactionsTokensList: null,
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

        set({ transactionsTokensList: data });
        const firstToken = data[Object.keys(data)[0]];

        get().setTransactionsToken(firstToken);
      } catch (error) {
        console.error('Error fetching objects:', error);
      }
    },
    setDecimalsForTransactionsToken: decimals => {
      const transactionsToken = get().transactionsToken;

      if (!transactionsToken) return;

      get().setTransactionsToken({ ...transactionsToken, decimals });
    },
  }))
);

export default useTransactionsTokenStore;
