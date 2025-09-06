import { AxiosError } from "axios";
import api from "../axios.instance";
import { apiRoutes } from "../routes";
import { getUserToken } from "../../utils";

export const get_user = async () => {
  try {
    const token = getUserToken();
    const { method, url } = apiRoutes.user.getUser;
    const response = await api.request({
      method,
      url,
      headers: { Authorization: token },
    });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      // If it's an Axios error
      throw error?.response?.data?.message || "API Error occurred";
    }
    throw "Something went wrong!"; // For non-Axios errors
  }
};
