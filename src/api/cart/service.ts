import { useMutation, useQuery } from "@tanstack/react-query";
import type { TProductCart } from "../../types";
import {
  add_to_cart,
  get_user_cart,
  update_cart_product_quantity,
} from "./api";
import { toast } from "react-toastify";

export const useAddToCart = () => {
  return useMutation({
    mutationFn: (data: TProductCart) => add_to_cart(data),
    onSuccess: (data) => {
      toast.success(data?.message || "Product added to cart successfully!");
    },
    onError: (error) => {
      toast.error(typeof error === "string" ? error : "Something went wrong!");
    },
  });
};

export const useGetUserCart = () => {
  return useQuery({
    queryKey: ["get_user_cart"],
    queryFn: () => get_user_cart(),
    enabled: true,
    refetchOnWindowFocus: false,
  });
};

export const useUpdateQuantityCartProduct = () => {
  return useMutation({
    mutationKey: ["update_quantity_cart_product"],
    mutationFn: ({ _id, quantity }: Pick<TProductCart, "_id" | "quantity">) =>
      update_cart_product_quantity(_id, quantity),

    onError: (error) => {
      toast.error(typeof error === "string" ? error : "Something went wrong!");
    },
  });
};
