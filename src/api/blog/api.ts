import { AxiosError } from "axios";
import { getUserToken } from "../../utils";
import { apiRoutes } from "../routes";
import api from "../axios.instance";

export const create_blog = async (data: FormData) => {
  try {
    const token = getUserToken();
    const { method, url } = apiRoutes.blog.createBlog;
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

// get Blog
export const get_blog = async () => {
  try {
    const { method, url } = apiRoutes.blog.getBlog;
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

// get blog by Id
export const get_blog_By_Id = async (id: string) => {
  try {
    const { method, url } = apiRoutes.blog.getBlogById;
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

// Update Blog
export const update_blog = async (id: string, data: FormData) => {
  try {
    const token = getUserToken();
    const { method, url } = apiRoutes.blog.updateBlog;
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

// delete Blog
export const delete_blog_By_Id = async (id: string) => {
  try {
    const token = getUserToken();
    const { method, url } = apiRoutes.blog.deleteBlog;
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
