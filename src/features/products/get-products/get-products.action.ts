import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { getProductsType } from "./get-products.type";
import { getProducts } from "./get-products.service";

export const getProductsAction = createAsyncThunk(
  getProductsType,
  async (_, thunkAPI) => {
    try {
      const response = await getProducts();
      return response.data;
    } catch (err) {
      const error = err as AxiosError;
      console.log("error: ", error);
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);
