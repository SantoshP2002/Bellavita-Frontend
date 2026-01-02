import { AxiosError } from "axios";
import api from "../axios.instance";
import { apiRoutes } from "../routes";
import { getUserToken } from "../../utils";
import type { IUser } from "../../types";

export const get_user = async () => {
  try {
    const token = getUserToken();
    const { method, url } = apiRoutes.user.getUser;
    const response = await api.request({
      method,
      url,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error?.response?.data?.message || "API Error occurred";
    }
    throw "Something went wrong!";
  }
};

export const update_user = async (data: IUser) => {
  try {
    const token = getUserToken();
    const { method, url } = apiRoutes.user.updateUser;
    const response = await api.request({
      method,
      data,
      url,
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
