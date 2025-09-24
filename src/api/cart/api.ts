import { AxiosError } from "axios";
import { getUserToken } from "../../utils";
import { apiRoutes } from "../routes";
import api from "../axios.instance";

export const add_to_cart = async (id: string) => {
  try {
    const token = getUserToken();
    const { method, url } = apiRoutes.cart.addToCart
    const response = await api.request({
      method,
      url:`${url}/${id}`,
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

export const update_cart_product_quantity = async (
  id: string,
  quantity: number
) => {
  try {
    const token = getUserToken();
    const { method, url } = apiRoutes.cart.updateCartProductQuantity;
    const response = await api.request({
      method,
      url: `${url}/${id}`,
      data: { quantity },
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

export const delete_cart_Product = async (id: string) => {
  try {
    const token = getUserToken();
    const { method, url } = apiRoutes.cart.deleteCartProduct;
    const response = await api.request({
      method,
      url: `${url}/${id}`,
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
