import { useMutation } from "@tanstack/react-query";
import { create_product } from "./api";
import { toast } from "react-toastify";

export const useUploadProduct = () => {
  return useMutation({
    mutationFn: (bodyData: FormData) => create_product(bodyData),
    onSuccess: (data) => {
      toast.success(data?.message || "Product uploaded successfully!");
    },
    onError: (error) => {
      toast.error(typeof error === "string" ? error : "Something went wrong!");
    },
  });
};
