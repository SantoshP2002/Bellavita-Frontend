import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  add_address,
  delete_address,
  get_address,
  update_address,
} from "./api";
import toast from "react-hot-toast";

export const useAddAddress = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["add_address"],
    mutationFn: add_address,

    onSuccess: (data) => {
      console.log(data, "data");
      toast.success(data?.message || "Address added successfully!");
      queryClient.invalidateQueries({ queryKey: ["get_address"] });
    },
  });
};

export const useGetAddress = () => {
  return useQuery({
    queryKey: ["get_address"],
    queryFn: get_address,
    enabled: true,
    refetchOnWindowFocus: false,
  });
};

export const useUpdateAddress = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["update_address"],
    mutationFn: update_address,
    onSuccess: (data) => {
      toast.success(data?.message || "Address updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["get_address"] });
    },
    onError: (error) => {
      toast.error(typeof error === "string" ? error : "Something went wrong!");
    },
  });
};

export const useDeleteAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["delete_address"],
    mutationFn: delete_address,
    onSuccess: (data) => {
      toast.success(data?.message || "Address updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["get_address"] });

    },
    onError: (error) => {
      toast.error(typeof error === "string" ? error : "Something went wrong!");
    },
  });
};
