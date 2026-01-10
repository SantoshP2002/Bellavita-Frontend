import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { TProductCart } from "../../types";
import {
  add_to_cart,
  delete_cart_Product,
  get_user_cart,
  update_cart_product_quantity,
} from "./api";
import toast from "react-hot-toast";
import { useUserStore } from "../../store/user";

export const useAddToCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => add_to_cart(id),
    onSuccess: (data) => {
      toast.success(data?.message || "Product added to cart successfully!");

      queryClient.invalidateQueries({ queryKey: ["get_user_cart"] });
    },
    onError: (error) => {
      toast.error(typeof error === "string" ? error : "Something went wrong!");
    },
  });
};

export const useGetUserCart = () => {
  const { isLoggedIn } = useUserStore();
  return useQuery({
    queryKey: ["get_user_cart"],
    queryFn: () => get_user_cart(),
    enabled: isLoggedIn,
    refetchOnWindowFocus: false,
    staleTime: 0,
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

export const useDeleteCartProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => delete_cart_Product(id),

    onSuccess: (data) => {
      toast.success(data?.message || "Product deleted to cart successfully!");

      queryClient.invalidateQueries({ queryKey: ["get_user_cart"] });
    },
    onError: (error) => {
      toast.error(typeof error === "string" ? error : "Something went wrong!");
    },
  });
};
