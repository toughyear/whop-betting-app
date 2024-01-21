import { create } from "zustand";
import { User } from "@/lib/firebase/user";

interface UserStoreState {
  user: User | null;
  setUser: (user: User) => void;
}

const useUserStore = create<UserStoreState>((set) => ({
  user: null,
  setUser: (user: User) => set({ user }),
}));

export default useUserStore;
