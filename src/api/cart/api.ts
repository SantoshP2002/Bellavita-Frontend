import { AxiosError } from "axios";
import type { TCart } from "../../types";
import { getUserToken } from "../../utils";
import { apiRoutes } from "../routes";
import api from "../axios.instance";

export const add_to_cart = async (data: TCart) => {
  try {
    const token = getUserToken();
    const { method, url } = apiRoutes.cart.addToCart;
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

export const get_user_cart = async () => {
  try {
    const token = getUserToken();
    const { method, url } = apiRoutes.cart.getUserCart;
    const response = await api.request({
      method,
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
