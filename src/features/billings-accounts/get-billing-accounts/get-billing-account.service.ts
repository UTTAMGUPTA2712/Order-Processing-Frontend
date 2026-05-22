import axiosInterceptorInstance from "@/config/axios";

export const getBillingAccounts = () => axiosInterceptorInstance.get(`/api/v1/billing-accounts`);
