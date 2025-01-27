import { createSlice } from "@reduxjs/toolkit";
import productsList from "../Products.js";
// const initialState = productsList;

// export default function productsReducer(state = productsList, action) {
//   return state;
// }

const slice = createSlice({
  name: "product",
  initialState: {
    loading: false,
    list: [],
    error: "",
  },
  reducers: {
    fetchProducts(state) {
      state.loading = true;
    },
    updateAllProducts(state, action) {
      state.loading = false;
      state.list = action.payload;
    },
    fetchProductsError(state, action) {
      state.loading = false;
      state.error = action.payload || "Something Went Wrong";
    },
  },
});

export const { updateAllProducts, fetchProducts, fetchProductsError } =
  slice.actions;

export default slice.reducer;
