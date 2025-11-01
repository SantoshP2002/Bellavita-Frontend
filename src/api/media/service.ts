import { useMutation } from "@tanstack/react-query";
import { upload_single_image } from "./api";
import {
  toastErrorMessage,
  toastSuccessMessage,
} from "../../utils/toast.utils";

export const useUploadSingleImage = () => {
  return useMutation({
    mutationKey: ["upload_single_image"],
    mutationFn: (bodyData: FormData) => upload_single_image(bodyData),
    onSuccess: (data) => {
      toastSuccessMessage(data?.message || "Image uploaded successfully!");
    },
    onError: (error: unknown) => {
      toastErrorMessage(
        typeof error === "string" ? error : "Failed to upload image!"
      );
    },
  });
};
