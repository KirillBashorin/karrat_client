import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { Address } from 'viem';

type State = {
  isPurchaseModalOpen: boolean;
};

type Action = {
  openPurchaseModal: (contractAddress: Address) => void;
  purchaseModalObjectAddress: Address | null;
  closePurchaseModal: () => void;
};

const useModalStore = create<State & Action>()(
  devtools(set => ({
    isPurchaseModalOpen: false,
    purchaseModalObjectAddress: null,
    openPurchaseModal: (contractAddress: Address) => {
      set({ purchaseModalObjectAddress: contractAddress });
      set({ isPurchaseModalOpen: true });
    },
    closePurchaseModal: () => set({ isPurchaseModalOpen: false }),
  }))
);

export default useModalStore;
