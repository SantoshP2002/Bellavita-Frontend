import { useMutation } from "@tanstack/react-query";
import type { TCart } from "../../types";
import { add_to_cart } from "./api";
import { toast } from "react-toastify";

export const useAddToCart = () => {
  return useMutation({
    mutationFn: (data: TCart) => add_to_cart(data),
    onSuccess: (data) => {
      toast.success(data?.message || "Product added to cart successfully!");
    },
    onError: (error) => {
      toast.error(typeof error === "string" ? error : "Something went wrong!");
    },
  });
};
