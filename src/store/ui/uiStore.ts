import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface IUiStore {
  isOpen: boolean;
  showConfetti: boolean;
  toggle: () => void;
  setConfettiActive: (active: boolean) => void;
}

export const useUiStore = create<IUiStore>()(
  devtools((set) => ({
    isOpen: true,
    showConfetti: false,
    setConfettiActive: (active: boolean) => {
      set({ showConfetti: active });
    },
    toggle: () => {
      set((state) => ({ isOpen: !state.isOpen }));
    },
  }))
);
