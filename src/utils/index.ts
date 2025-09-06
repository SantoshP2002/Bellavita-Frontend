import CryptoJS from "crypto-js";
import { VITE_ENCRYPTION_SECRET_KEY, VITE_TOKEN_KEY } from "../env";

export const encryptData = (data: object | string) => {
  const stringData = typeof data === "string" ? data : JSON.stringify(data);
  const encrypted = CryptoJS.AES.encrypt(
    stringData,
    VITE_ENCRYPTION_SECRET_KEY
  );
  return encrypted.toString();
};

export const decryptData = (
  encryptedData: string | null
): object | string | null => {
  if (!encryptedData) return null;

  const bytes = CryptoJS.AES.decrypt(encryptedData, VITE_ENCRYPTION_SECRET_KEY);
  const decrypted = bytes.toString(CryptoJS.enc.Utf8);

  if (decrypted) {
    try {
      return JSON.parse(decrypted);
    } catch {
      return decrypted;
    }
  }
  return null;
};

export const removeLocalToken = () => localStorage.removeItem(VITE_TOKEN_KEY);

export const saveLocalToken = (token: string) => {
  const encryptedToken = encryptData(token);
  localStorage.setItem(VITE_TOKEN_KEY, encryptedToken);
};

export const getUserToken = () => {
  const raw_token = localStorage.getItem(VITE_TOKEN_KEY);
  if (!raw_token) {
    throw new Error("No Token found");
  }

  const token = decryptData(raw_token);
  if (!token) {
    throw new Error("No Token found");
  }
  return token as string;
};
