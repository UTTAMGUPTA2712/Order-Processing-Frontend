import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { getBillingAccounts } from "./get-billing-account.service";
import { getBillingAccountsType } from "./get-billing-accounts.type";

export const getBillingAccountsAction = createAsyncThunk(
  getBillingAccountsType,
  async (_, thunkAPI) => {
    try {
      const response = await getBillingAccounts();
      return response.data;
    } catch (err) {
      const error = err as AxiosError;
      console.log("error: ", error);
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);
