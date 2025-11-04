import { AxiosError } from "axios";
import { getUserToken } from "../../utils";
import { apiRoutes } from "../routes";
import api from "../axios.instance";

// create Order
export const create_order = async (addressId: string) => {
  try {
    const token = getUserToken();
    const { method, url } = apiRoutes.order.createOrder;
    const response = await api.request({
      method,
      url,
      params: { addressId },
      headers: { Authorization: token },
    });
    console.log("RESPONSE", response.data);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error?.response?.data?.message || "API Error occurred";
    }
    throw "Something went wrong!";
  }
};

// get All Orders
export const get_order = async () => {
  try {
    const token = getUserToken();
    const { method, url } = apiRoutes.order.getOrder;
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

// Get Order By ID
export const get_order_By_Id = async (orderId: string) => {
  try {
    const token = getUserToken();
    const { method, url } = apiRoutes.order.getOrderById;
    const response = await api.request({
      method,
      url: `${url}/${orderId}`,
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

// Get Admin Order
export const get_admin_order = async () => {
  try {
    const token = getUserToken();
    const { method, url } = apiRoutes.order.getAdminOrder;
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
