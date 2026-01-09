import { AxiosError } from "axios";
import api from "../axios.instance";
import { apiRoutes } from "../routes";
import { getUserToken } from "../../utils";
import type { TQueryParams } from "../../types";

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

export const get_all_products = async (params: TQueryParams) => {
  try {
    const { method, url } = apiRoutes.products.getAllProducts;
    const response = await api.request({ method, url, params });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error?.response?.data?.message || "API Error occurred";
    }
    throw "Something went wrong!";
  }
};

// Get product by ID
export const get_product_by_id = async (id: string) => {
  try {
    const { method, url } = apiRoutes.products.getProductById;
    const response = await api.request({ method, url: `${url}/${id}` });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error?.response?.data?.message || "API Error occurred";
    }
    throw "Something went wrong!";
  }
};

// get My Products
export const get_my_Products = async (
  params: Record<string, number | string>
) => {
  try {
    const token = getUserToken();
    const { method, url } = apiRoutes.products.getMyProducts;
    const response = await api.request({
      method,
      url,
      params,
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

// Update product by ID
export const update_Product = async (id: string, data: FormData) => {
  try {
    const token = getUserToken();
    const { method, url } = apiRoutes.products.updateProductById;
    const response = await api.request({
      method,
      url: `${url}/${id}`,
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

// Delete product by ID
export const delete_Product_By_Id = async (id: string) => {
  try {
    const token = getUserToken();
    const { method, url } = apiRoutes.products.deleteProductById;
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
