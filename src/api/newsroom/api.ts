import { AxiosError } from "axios";
import { getUserToken } from "../../utils";
import { apiRoutes } from "../routes";
import api from "../axios.instance";

// Upload Newsroom API
export const upload_newsroom = async (data: FormData) => {
  try {
    const token = getUserToken();
    const { method, url } = apiRoutes.newsroom.uploadNewsroom;
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

// Get All Newsroom API
export const get_all_newsroom = async () => {
  try {
    const { method, url } = apiRoutes.newsroom.getNewsroom;
    const response = await api.request({
      method,
      url,
    });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error?.response?.data?.message || "API Error occurred";
    }
    throw "Something went wrong!";
  }
};

// Get Newsroom By Id API
export const get_newsroom_by_id = async (id: string) => {
  try {
    const { method, url } = apiRoutes.newsroom.getNewsroomById;
    const response = await api.request({
      method,
      url: `${url}/${id}`,
    });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error?.response?.data?.message || "API Error occurred";
    }
    throw "Something went wrong!";
  }
};

// update Newsroom API
export const update_newsroom = async (id: string, data: FormData) => {
  try {
    const token = getUserToken();
    const { method, url } = apiRoutes.newsroom.updateNewsroom;
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

// delete Newsroom API
export const delete_newsroom_by_id = async (id: string) => {
  try {
    const token = getUserToken();
    const { method, url } = apiRoutes.newsroom.deleteNewsroom;
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
