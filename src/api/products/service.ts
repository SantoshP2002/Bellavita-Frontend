import { useMutation, useQuery } from "@tanstack/react-query";
import { create_product, getAll_Products } from "./api";
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

export const useGetAllProducts = () => {
  return useQuery({
    queryKey: ["all-products"],
    queryFn: getAll_Products,
  });
}
