/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAppSlice } from "@/lib/create-app-slice";
import { createOrder } from "./store-order/store-order.action";
import { getOrdersAction } from "./get-orders/get-orders.action";

type initialStateProps = {
  loading: boolean;
  orders: any;
};

const initialState: initialStateProps = {
  loading: false,
  orders: null,
};

export const ordersSlice = createAppSlice({
  name: "orders",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(createOrder.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createOrder.rejected, (state) => {
        state.loading = false;
      })

      .addCase(getOrdersAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOrdersAction.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(getOrdersAction.rejected, (state) => {
        state.loading = false;
      });
  },
});
export default ordersSlice.reducer;
