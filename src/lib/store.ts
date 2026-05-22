import type { Action, ThunkAction } from "@reduxjs/toolkit";
import { combineSlices, configureStore } from "@reduxjs/toolkit";

import productSlice from "@/features/products/products.slice";
import billingsSlice from "@/features/billings-accounts/billings.slice";
import ordersSlice from '@/features/orders/orders.slice';

const rootReducer = combineSlices({
  orders: ordersSlice,
  products: productSlice,
  billings: billingsSlice,
});

export type RootState = ReturnType<typeof rootReducer>;

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type AppStore = ReturnType<typeof makeStore>;

export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>;
