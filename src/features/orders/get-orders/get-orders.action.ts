import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { getOrders } from "./get-orders.service";
import { getOrdersType } from "./get-orders.type";

export const getOrdersAction = createAsyncThunk(getOrdersType, async (_, thunkAPI) => {
  try {
    const response = await getOrders();
    return response.data;
  } catch (err) {
    const error = err as AxiosError;
    console.log("error: ", error);
    return thunkAPI.rejectWithValue(error?.response?.data);
  }
});
