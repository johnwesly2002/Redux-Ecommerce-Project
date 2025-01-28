import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productsList from "../Products.js";

export const fetchProductsData = createAsyncThunk(
  "products/fetchData",
  async () => {
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      return response.json();
    } catch (err) {
      throw err;
    }
  }
);

const slice = createSlice({
  name: "product",
  initialState: {
    loading: false,
    list: [],
    error: "",
  },
  reducers: {
    // fetchProducts(state) {
    //   state.loading = true;
    // },
    // updateAllProducts(state, action) {
    //   state.loading = false;
    //   state.list = action.payload;
    // },
    // fetchProductsError(state, action) {
    //   state.loading = false;
    //   state.error = action.payload || "Something Went Wrong";
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductsData.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchProductsData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something Went Wrong";
      });
  },
});
export const getAllProducts = (state) => state.products.list;
export const getAllProductsLoading = (state) => state.products.loading;
export const getAllProductsErrors = (state) => state.products.error;
// export const { updateAllProducts, fetchProducts, fetchProductsError } =
//   slice.actions;

export default slice.reducer;
