import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { add_address, get_address } from "./api";
import { toast } from "react-toastify";

export const useAddAddress = () => {
  const queryClient = useQueryClient()
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
