import { useMutation } from "@tanstack/react-query";
import { create_blog } from "./api";
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
