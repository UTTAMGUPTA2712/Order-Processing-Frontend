/* eslint-disable @typescript-eslint/no-explicit-any */

import axiosInterceptorInstance from "@/config/axios";

export const storeOrder = (data: any) =>
  axiosInterceptorInstance.post(
    `/api/v1/orders`,
    data
  );
