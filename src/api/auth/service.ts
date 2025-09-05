import type { TBaseUser } from "../../types";
import { useMutation } from "@tanstack/react-query";
import { register_user } from "./api";
import { toast } from "react-toastify";

export const useRegisterUser = () => {
  return useMutation({
    mutationFn: (bodyData: TBaseUser) => register_user(bodyData),
    onSuccess: (data) => {
      toast.success(data?.message || "Registration successful!");
    },
    onError: (error: unknown) => {
      toast.error(typeof error === "string" ? error : "Something went wrong!");
    },
  });
};
