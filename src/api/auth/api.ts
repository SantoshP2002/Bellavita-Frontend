import { AxiosError } from "axios";
import { apiRoutes } from "../routes";
import api from "../axios.instance";
import type { TBaseUser } from "../../types";
import { getUserToken } from "../../utils";

export type TChangePasswordPayload = {
  currentPassword: string;
  newPassword: string;
};

export const register_user = async (data: FormData) => {
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

export const login_user = async (
  data: Pick<TBaseUser, "email" | "password">
) => {
  try {
    const { method, url } = apiRoutes.auth.login;
    const response = await api.request({ method, url, data });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      // If it's an Axios error
      throw error?.response?.data?.message || "API Error occurred";
    }
    throw "Something went wrong!";
  }
};

export const update_password = async (data: TChangePasswordPayload) => {
  try {
    const token = getUserToken();
    const { method, url } = apiRoutes.auth.changePassword;
    const response = await api.request({
      method,
      url,
      data,
      headers: { Authorization: token },
    });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error?.response?.data?.message || "API Error occurred";
    }
    throw "Something went wrong!";
  }
};
