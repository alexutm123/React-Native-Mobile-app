import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persist, createJSONStorage } from "zustand/middleware";
type userStore = {
 hasFinishedOnBoarded: boolean;
 toggleHadOnBoarded: () => void;
};

export const useUserStore = create(persist<userStore>((set) => ({
  hasFinishedOnBoarded: false,
  toggleHadOnBoarded: () => set((state) => ({
    ...state,
    hasFinishedOnBoarded: !state.hasFinishedOnBoarded
   })),
 }),
 {
name: "plantly-user-store",
storage: createJSONStorage(() => AsyncStorage),
  },
  ),
);
