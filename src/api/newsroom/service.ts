import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  delete_newsroom_by_id,
  get_all_newsroom,
  get_newsroom_by_id,
  update_newsroom,
  upload_newsroom,
} from "./api";
import { toast } from "react-hot-toast";

// Upload Newsroom Service
export const useUploadNewsroom = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (bodyData: FormData) => upload_newsroom(bodyData),
    onSuccess: (data) => {
      toast.success(data?.message || "newsroom uploaded successfully!");
    },
    onError: (error) => {
      toast.error(typeof error === "string" ? error : "Something went wrong!");
      queryClient.invalidateQueries({ queryKey: ["get_all_newsroom"] });
    },
  });
};

// get all newsroom service
export const useGetAllNewsroom = () => {
  return useQuery({
    queryKey: ["get_all_newsroom"],
    queryFn: get_all_newsroom,
  });
};

// get newsroom by Id Service
export const useGetNewsroomById = (id: string) => {
  return useQuery({
    queryKey: ["get_newsroom_by_id", id],
    queryFn: () => get_newsroom_by_id(id!),
    enabled: !!id,
    select: (data) => data.newsroom,
  });
};

// Update Newsroom Service
export const useUpdateNewsroom = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["update_newsroom", id],
    mutationFn: (data: FormData) => update_newsroom(id, data),
    onSuccess: (data) => {
      toast.success(data?.message || "Newsroom updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["get_all_newsroom"] });
    },
    onError: (error) => {
      toast.error(typeof error === "string" ? error : "Something went wrong!");
    },
  });
};

// Delete Newsroom Service
export const useDeleteNewsroomById = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["delete_newsroom_by_id"],
    mutationFn: (id: string) => delete_newsroom_by_id(id),
    onSuccess: (data) => {
      toast.success(data?.message || "Newsroom deleted successfully!");
      queryClient.invalidateQueries({
        queryKey: ["get_all_newsroom"],
      });
    },
    onError: (error) => {
      toast.error(typeof error === "string" ? error : "Something went wrong!");
    },
  });
};
