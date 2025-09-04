import axios from "axios";
import { VITE_BACKEND_URI } from "../env";

const api = axios.create({ baseURL: `${VITE_BACKEND_URI}/api` });

export default api;
