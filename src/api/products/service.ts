import { useInfiniteQuery } from "@tanstack/react-query";

import { useMutation, useQuery } from "@tanstack/react-query";
import {
  create_product,
  delete_Product_By_Id,
  get_all_products,
  get_product_by_id,
  update_Product,
} from "./api";
import { toast } from "react-toastify";

// upload product
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

// get all products
export const useGetAllProducts = () => {
  return useQuery({
    queryKey: ["get_all_products"],
    queryFn: () => get_all_products({}),
    enabled: true,
    refetchOnWindowFocus: false,
    select: (data) => data?.products,
  });
};

export const useGetAllProductsInfinite = (
  params: Record<string, number | string>
) => {
  return useInfiniteQuery({
    queryKey: ["get_all_products_infinite"],
    initialPageParam: 1,
    queryFn: ({ pageParam }) =>
      get_all_products({ page: pageParam, ...params }),

    getNextPageParam: (lastPage) => {
      if (lastPage?.currentPage < lastPage?.totalPages) {
        return lastPage?.currentPage + 1;
      }
      return undefined;
    },
  });
};

// get product by ID
export const useGetProductById = (id: string) => {
  return useQuery({
    queryKey: ["get_product_by_id", id],
    queryFn: () => get_product_by_id(id),
    enabled: !!id,
    refetchOnWindowFocus: false,
    select: (data) => data.product,
  });
};

// update product by ID
export const useUpdateProduct = (id: string) => {
  return useMutation({
    mutationKey: ["update_product", id],
    mutationFn: (data: FormData) => update_Product(id, data),
    onSuccess: (data) => {
      toast.success(data?.message || "Product updated successfully!");
    },
    onError: (error) => {
      toast.error(typeof error === "string" ? error : "Something went wrong!");
    },
  });
};

// delete product by ID
export const useDeleteProductById = () => {
  return useMutation({
    mutationFn: (id: string) => delete_Product_By_Id(id),
    onSuccess: (data) => {
      toast.success(data?.message || "Product deleted successfully!");
    },
    onError: (error) => {
      toast.error(typeof error === "string" ? error : "Something went wrong!");
    },
  });
};
