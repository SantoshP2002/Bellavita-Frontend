import type { TBaseUser } from "../../types";
import { useMutation } from "@tanstack/react-query";
import {
  login_user,
  register_user,
  update_password,
  type TChangePasswordPayload,
} from "./api";
import { toast } from "react-toastify";
import { useUserStore } from "../../store/user";
import { saveLocalToken } from "../../utils";
import { useNavigate } from "react-router-dom";

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

export const useUpdatePassword = () => {
  const { logout } = useUserStore();
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ["update_password"],
    mutationFn: (data: TChangePasswordPayload) => update_password(data),

    onSuccess: (data) => {
      toast.success(data?.message || "Login successful!");
      logout();
      navigate("/login");
    },

    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};
