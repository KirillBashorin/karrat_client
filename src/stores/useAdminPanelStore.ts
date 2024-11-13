import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type State = {
  isSigner: boolean | null;
  isAdmin: boolean | null;
};

type Action = {
  setIsSigner: (isSigner: boolean) => void;
  setIsAdmin: (isAdmin: boolean) => void;
};

const useAdminPanelStore = create<State & Action>()(
  devtools(set => ({
    isSigner: null,
    isAdmin: null,
    setIsSigner: (isSigner: boolean) => set({ isSigner: isSigner }),
    setIsAdmin: (isAdmin: boolean) => set({ isAdmin: isAdmin }),
  }))
);

export default useAdminPanelStore;
