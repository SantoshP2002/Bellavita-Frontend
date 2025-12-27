import {  useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  create_blog,
  delete_blog_By_Id,
  get_blog,
  get_blog_By_Id,
  update_blog,
} from "./api";
import { toast } from "react-toastify";

export const useUploadBlog = () => {
  return useMutation({
    mutationFn: (bodyData: FormData) => create_blog(bodyData),
    onSuccess: (data) => {
      toast.success(data?.message || "Blog uploaded successfully!");
    },

    onError: (error) => {
      toast.error(typeof error === "string" ? error : "Something went wrong!");
    },
  });
};

// get blog service
export const useGetBlog = () => {
  return useQuery({
    queryKey: ["get_blog"],
    queryFn: get_blog,
    // enabled: enabled ?? true,
    // refetchOnWindowFocus: false,
    // select: (data) => data?.blogs,
  });
};

// get blog by Id Service
export const useGetBlogById = (id: string) => {
  return useQuery({
    queryKey: ["get_blog_By_Id", id],
    queryFn: () => get_blog_By_Id(id!),
    enabled: !!id,
    // refetchOnWindowFocus: false,
    select: (data) => data.blog,
  });
};

// Update Blog
export const useUpdateBlog = (id: string) => {
  return useMutation({
    mutationKey: ["update_blog", id],
    mutationFn: (data: FormData) => update_blog(id, data),
    onSuccess: (data) => {
      toast.success(data?.message || "Blog updated successfully!");
    },

    onError: (error) => {
      toast.error(typeof error === "string" ? error : "Something went wrong!");
    },
  });
};

// delete blog
export const useDeleteBlogById = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["delete_blog_By_Id"],
    mutationFn: (id: string) => delete_blog_By_Id(id),
    onSuccess: (data) => {
      toast.success(data?.message || "Blog deleted successfully!");
      queryClient.invalidateQueries({
        queryKey: ["get_blog"],
      });
    },
    onError: (error) => {
      toast.error(typeof error === "string" ? error : "Something went wrong!");
    },
  });
};
