import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type State = {
  errorMessage: null | string;
};

type Action = {
  setErrorMessage: (errorMessage: string | null) => void;
};

const useErrorStore = create<State & Action>()(
  devtools(set => ({
    errorMessage: null,
    setErrorMessage: errorMessage => {
      set({ errorMessage });
    },
  }))
);

export default useErrorStore;
