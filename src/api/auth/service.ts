import type { TBaseUser } from "../../types";
import { useMutation } from "@tanstack/react-query";
import { login_user, register_user } from "./api";
import { toast } from "react-toastify";
import { useUserStore } from "../../store/user";
import { saveLocalToken } from "../../utils";

export const useRegisterUser = () => {
  const { setUser } = useUserStore();
  return useMutation({
    mutationFn: (bodyData: FormData) => register_user(bodyData),
    onSuccess: (data) => {
      setUser(data?.user);
      saveLocalToken(data?.token);
      toast.success(data?.message || "Registration successful!");
    },
    onError: (error) => {
      toast.error(typeof error === "string" ? error : "Something went wrong!");
    },
  });
};

export const useLoginUser = () => {
  const { setUser } = useUserStore();
  return useMutation({
    mutationFn: (bodyData: Pick<TBaseUser, "email" | "password">) =>
      login_user(bodyData),
    onSuccess: (data) => {
      setUser(data?.user);
      saveLocalToken(data?.token);
      toast.success(data?.message || "Login successful!");
    },
    onError: (error) => {
      toast.error(typeof error === "string" ? error : "Something went wrong!");
    },
  });
};
