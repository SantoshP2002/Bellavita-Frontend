import { useMutation, useQuery } from "@tanstack/react-query";
import { get_user, update_user } from "./api";
import { toast } from "react-toastify";

export const useGetUser = () => {
  return useQuery({
    queryKey: ["get_user"],
    queryFn: () => get_user(),
    enabled: true,
    refetchOnWindowFocus: false,
    retry: false,
  });
};

export const useUpdateUser = () => {
  return useMutation({
    mutationKey: ["update_user"],
    mutationFn: update_user,
    onSuccess: (data) => {
      toast.success(data?.message || "Product updated successfully!");
    },
    onError: (error) => {
      toast.error(typeof error === "string" ? error : "Something went wrong!");
    },
  });
};
