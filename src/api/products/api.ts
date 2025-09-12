import { AxiosError } from "axios";
import api from "../axios.instance";
import { apiRoutes } from "../routes";
import { getUserToken } from "../../utils";

export const create_product = async (data: FormData) => {
  try {
    const token = getUserToken();
    const { method, url } = apiRoutes.products.createProduct;
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

export const getAll_Products = async () => {
  try {
    const { method, url } = apiRoutes.products.getAllProducts;
    const response = await api.request({ method, url });
    return response.data.product;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error?.response?.data?.message || "API Error occurred";
    }
    throw "Something went wrong!";
  }
};
