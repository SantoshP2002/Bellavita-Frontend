import type { TBaseUser } from "../../types";
import { useMutation } from "@tanstack/react-query";
import { login_user, register_user } from "./api";
import { toast } from "react-toastify";

export const useRegisterUser = () => {
  return useMutation({
    mutationFn: (bodyData: FormData) => register_user(bodyData),
    onSuccess: (data) => {
      toast.success(data?.message || "Registration successful!");
    },
    onError: (error) => {
      toast.error(typeof error === "string" ? error : "Something went wrong!");
    },
  });
};

export const useLoginUser = () => {
  return useMutation({
    mutationFn: (bodyData: Pick<TBaseUser, "email" | "password">) =>
      login_user(bodyData),
    onSuccess: (data) => {
      toast.success(data?.message || "Login successful!");
    },
    onError: (error) => {
      toast.error(typeof error === "string" ? error : "Something went wrong!");
    },
  });
};
