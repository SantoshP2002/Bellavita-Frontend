import { AxiosError } from "axios"
import api from "../axios.instance"
import { apiRoutes } from "../routes"

export const create_product = async (data: FormData) => {
    try {
        const { method, url } = apiRoutes.products.createProduct
        const response = await api.request({ method, url, data })
        return response.data
    } catch (error) {
        if (error instanceof AxiosError) {
              // If it's an Axios error
              throw error?.response?.data?.message || "API Error occurred";
        }
        throw "Something went wrong!"; // For non-Axios errors
    }
}