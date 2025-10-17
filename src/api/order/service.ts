import { useMutation, useQuery } from "@tanstack/react-query";
import { create_order, get_order, get_order_By_Id } from "./api";
import { toast } from "react-toastify";

export const useCreateOrder = () => {
  return useMutation({
    mutationKey: ["create_order"],
    mutationFn: create_order,
    onSuccess: (data) => {
      toast.success(data?.message || "Order Created Successfully");
    },
    onError: (error) => {
      toast.error(typeof error === "string" ? error : "Something went wrong!");
    },
  });
};

export const useGetOrder = () => {
  return useQuery({
    queryKey: ["get_order"],
    queryFn: get_order,
  });
};

export const useGetOrderById = (orderId: string) => {
  return useQuery({
    queryKey: ["get_order_By_Id"],
    queryFn: () => get_order_By_Id(orderId),
  });
};
