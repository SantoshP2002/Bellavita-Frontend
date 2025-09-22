import { useMutation, useQuery } from "@tanstack/react-query";
import type { TCart } from "../../types";
import { add_to_cart, get_user_cart } from "./api";
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

export const useGetUserCart = () => {
  return useQuery({
    queryKey: ["get_user_cart"],
    queryFn: () => get_user_cart(),
    enabled: true,
    refetchOnWindowFocus: false,
  });
};
