import { RESPONSE_CODES } from "@/common/status-codes";
import axios from "axios";

const axiosInterceptorInstance = axios.create({});
axiosInterceptorInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const status = error?.response?.status;
    if (status === RESPONSE_CODES.UNAUTHORIZED || status === RESPONSE_CODES.FORBIDDEN) {
      window.location.href = "/";
      window.location.reload();
    }
    return Promise.reject(new Error(error));
  }
);
export default axiosInterceptorInstance;
