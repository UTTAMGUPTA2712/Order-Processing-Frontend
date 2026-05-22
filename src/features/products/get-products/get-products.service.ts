import axiosInterceptorInstance from "@/config/axios";

export const getProducts = () => axiosInterceptorInstance.get(`/api/v1/products`);
