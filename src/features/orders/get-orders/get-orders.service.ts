import axiosInterceptorInstance from "@/config/axios";

export const getOrders = () => axiosInterceptorInstance.get(`/api/v1/orders`);

