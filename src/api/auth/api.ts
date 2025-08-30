
import { AxiosError } from "axios";
import { apiRoutes } from "../routes";
import api from "../axios.instance";
import type { IUser } from "../../types";

export const register_user = async (data: Omit<IUser, "_id" | "role">) => {
  try {
    const { method, url } = apiRoutes.auth.register;
    const response = await api.request({ method, url, data });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      // If it's an Axios error
      throw error?.response?.data?.message || "API Error occurred";
    }
    throw "Something went wrong!"; // For non-Axios errors
  }
};
