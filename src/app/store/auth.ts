import { create } from "zustand";

export type User = {
  full_name: string;
  email: string;
  id: string;
};
export type AuthState = {
  user: User | null;
};

export type AuthActions = {
  setAuth: (user: User) => void;
};

export type AuthStore = AuthState & AuthActions;

export const defaultInitState: AuthState = {
  user: null,
};

export const useAuthStore = create<AuthStore>((set) => ({
  ...defaultInitState,
  setAuth: (user) => set((state) => ({ ...state, user })),
}));
