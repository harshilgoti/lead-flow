import { create } from "zustand";
import { TUser } from "../db/schema/user";

export type User = {
  full_name: string;
  email: string;
  id: string;
};
export type AuthState = {
  user: TUser | null;
};

export type AuthActions = {
  setAuth: (user: TUser) => void;
};

export type AuthStore = AuthState & AuthActions;

export const defaultInitState: AuthState = {
  user: null,
};

export const useAuthStore = create<AuthStore>((set) => ({
  ...defaultInitState,
  setAuth: (user) => set((state) => ({ ...state, user })),
}));
