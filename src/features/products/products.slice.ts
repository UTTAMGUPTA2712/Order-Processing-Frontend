/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAppSlice } from "@/lib/create-app-slice";
import { getProductsAction } from "./get-products/get-products.action";

type initialStateProps = {
  loading: boolean;
  products: any;
  cartProducts: any;
};

const initialState: initialStateProps = {
  loading: false,
  products: [],
  cartProducts: [],
};

export const productsSlice = createAppSlice({
  name: "products",
  initialState: initialState,
  reducers: {
    addToCart: (state, action) => {
      const { product_id, ...productDetails } = action.payload;

      const existingProductIndex = state.cartProducts?.findIndex(
        (product: any) => product.product_id === product_id
      );

      if (existingProductIndex !== -1) {
        state.cartProducts[existingProductIndex].quantity += 1;
      } else {
        state.cartProducts.push({ product_id, ...productDetails, quantity: 1 });
      }
    },

    removeFromCart: (state, action) => {
      const { product_id } = action.payload;

      const existingProductIndex = state.cartProducts?.findIndex(
        (product: any) => product.product_id === product_id
      );

      if (existingProductIndex !== -1) {
        if (state.cartProducts[existingProductIndex].quantity > 1) {
          state.cartProducts[existingProductIndex].quantity -= 1;
        } else {
          state.cartProducts?.splice(existingProductIndex, 1);
        }
      }
    },

    removeAll: (state, action) => {
      const product_id = action.payload;

      const productIndex = state.cartProducts?.findIndex(
        (product: any) => product.product_id === product_id
      );
      if (productIndex !== -1) {
        state.cartProducts?.splice(productIndex, 1);
      }
    },

    manageProducts: (state, action) => {
      state.products = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getProductsAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProductsAction.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(getProductsAction.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { addToCart, removeFromCart, manageProducts, removeAll } = productsSlice.actions;
export default productsSlice.reducer;
