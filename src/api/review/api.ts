import { AxiosError } from "axios";
import { getUserToken } from "../../utils";
import api from "../axios.instance";
import { apiRoutes } from "../routes";

// create Review
export const create_reviews = async (data: FormData, productId: string) => {
  try {
    const token = getUserToken();
    const { method, url } = apiRoutes.reviews.createReview;

    const response = await api.request({
      method,
      data,
      url: `${url}/${productId}`,
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

// get Review

export const get_review_by_product_id = async (
  productId: string,
  page: number = 1,
  limit: number = 10,
  imageOnly: boolean = false
) => {
  try {
    const token = getUserToken();
    const { method, url } = apiRoutes.reviews.getReviewsByProductId;

    const response = await api.request({
      method,
      url: `${url}/${productId}`,
      headers: { Authorization: token },
      params: { page, limit, imageOnly },
    });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error?.response?.data?.message || "API Error occurred";
    }
    throw "Something went wrong!";
  }
};
