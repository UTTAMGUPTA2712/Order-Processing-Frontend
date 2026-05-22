/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { createOrderType } from "./store-order.type";
import { storeOrder } from "./store-order.service";

export const createOrder = createAsyncThunk(
  createOrderType,
  async ({ data }: { data: any }, thunkAPI) => {
    try {
      const response = await storeOrder(data);
      return response.data;
    } catch (err) {
      const error = err as AxiosError;
      console.log("error: ", error);
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);