import { create } from "zustand";
import type { IUser, IUserStore } from "../types";
import { decryptData, encryptData, removeLocalToken } from "../utils";

const SESSION_KEY = "user";
export const useUserStore = create<IUserStore>((set) => {
  const encrypted = sessionStorage.getItem(SESSION_KEY);

  let user: IUser | null = null;

  const decrypted = decryptData(encrypted ?? "");
  if (decrypted && typeof decrypted === "object") {
    user = decrypted as IUser;
  }

  return {
    user,
    isLoggedIn: !!user,
    setUser: (userData) => {
      const encryptedUser = encryptData(userData);
      sessionStorage.setItem(SESSION_KEY, encryptedUser);
      set({ user: userData, isLoggedIn: true });
    },
    logout: () => {
      sessionStorage.removeItem(SESSION_KEY);
      removeLocalToken();
      set({ user: null, isLoggedIn: false });
    },
  };
});
