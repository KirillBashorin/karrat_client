import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { ObjectType } from '@/types';

type State = {
  objectsList: ObjectType[] | null;
};

type Action = {
  getObjectsList: () => Promise<void>;
};

const useObjectsStore = create<State & Action>()(
  devtools((set, get) => ({
    objectsList: null,
    getObjectsList: async () => {
      // if (get().objectsList) return;

      try {
        const response = await fetch('/data/objects.json');

        if (!response.ok) throw new Error('Network response was not ok');

        const data = await response.json();

        set({ objectsList: data });
      } catch (error) {
        console.error('Error fetching objects:', error);
      }
    },
  }))
);

export default useObjectsStore;
