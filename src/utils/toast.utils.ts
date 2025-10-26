import { toast } from "react-toastify";


export const toastCatchErrorMessage = (error: unknown, message?: string) => {
  if (error instanceof Error) {
    toast.error(error.message);
  }
  toast.error(message || "Something went wrong!");
};
export const toastErrorMessage = (message: string) => {
  toast.error(message || "Something went wrong!");
};

export const toastSuccessMessage = (message: string) => {
  toast.success(message || "Success!");
};
