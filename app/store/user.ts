import { create } from "zustand";
import { User, subscribeToUser } from "@/lib/firebase/user";

interface UserStoreState {
  user: User | null;
  setUser: (user: User) => void;
  updateUserFromDB: (email: string) => () => void;
}
const useUserStore = create<UserStoreState>((set) => ({
  user: null,
  setUser: (user: User) => set({ user }),
  updateUserFromDB: (email: string) => {
    // Call subscribeToUser and return its unsubscribe function
    return subscribeToUser(email, (user) => {
      if (user) {
        set({ user });
      }
    });
  },
}));

export default useUserStore;
