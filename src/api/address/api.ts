import { AxiosError } from "axios";
import { getUserToken } from "../../utils";
import { apiRoutes } from "../routes";
import api from "../axios.instance";
import type {  IAddress, IBaseAddress } from "../../types";

// add address
export const add_address = async (addressData: IBaseAddress) => {
  try {
    const token = getUserToken();
    const { method, url } = apiRoutes.address.addAddress;
    const response = await api.request({
      method,
      url,
      data: addressData,
      headers: { Authorization: token },
    });
    console.log("response.data", response.data);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error?.response?.data?.message || "API Error occurred";
    }
    throw "Something went wrong!";
  }
};

// get address
export const get_address = async () => {
  try {
    const token = getUserToken();
    const { method, url } = apiRoutes.address.getAddress;
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

// update address
export const update_address = async (data: Partial<IAddress>) => {
  try {
    const token = getUserToken();
    const { method, url } = apiRoutes.address.updateAddress;
    const response = await api.request({
      method,
      url: `${url}/${data._id}`,
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