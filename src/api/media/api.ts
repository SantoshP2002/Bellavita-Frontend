import { AxiosError } from "axios";
import { getUserToken } from "../../utils";
import { apiRoutes } from "../routes";
import api from "../axios.instance";

export const upload_single_image = async (data: FormData) => {
  try {
    const token = getUserToken();
    const { method, url } = apiRoutes.media.uploadSingleImage;

    const response = await api.request({
      method,
      url,
      data,
      headers: { Authorization: token },
    });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      // If it's an Axios error
      throw error?.response?.data?.message || "API Error occurred";
    }
    throw "Something went wrong!";
  }
};
