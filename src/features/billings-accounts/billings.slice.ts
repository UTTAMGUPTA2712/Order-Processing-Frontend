/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAppSlice } from "@/lib/create-app-slice";
import { getBillingAccountsAction } from "./get-billing-accounts/get-billing-accounts.action";

type initialStateProps = {
  loading: boolean;
  accounts: any;
};

const initialState: initialStateProps = {
  loading: false,
  accounts: null
};

export const billingsSlice = createAppSlice({
  name: "billings",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBillingAccountsAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBillingAccountsAction.fulfilled, (state, action) => {
        state.loading = false;
        state.accounts = action.payload;
      })
      .addCase(getBillingAccountsAction.rejected, (state) => {
        state.loading = false;
      })
  },
});
export default billingsSlice.reducer;
