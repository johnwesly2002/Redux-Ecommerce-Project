import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";

// export const fetchCartProductsData = () => (dispatch) => {
//   dispatch(fetchCartItems());
//   fetch("https://fakestoreapi.com/carts/5")
//     .then((res) => res.json())
//     .then((data) => {
//       dispatch(loadCartItems(data));
//     })
//     .catch((error) => {
//       dispatch(fetchCartItemsError());
//     });
// };

export const fetchCartProductsData = createAsyncThunk(
  "cart/fetchCartItems",
  async () => {
    try {
      const response = await fetch("https://fakestoreapi.com/carts/5");
      return response.json();
    } catch (err) {
      throw err;
    }
  }
);

const findItemIndex = (state, action) =>
  state.list.findIndex(
    (cartItem) => cartItem.productId == action.payload.productId
  );

const slice = createSlice({
  name: "cart",
  initialState: {
    loading: false,
    list: [],
    error: "",
  },
  reducers: {
    addCartItem(state, action) {
      const existingItem = findItemIndex(state, action);
      if (existingItem != -1) {
        state.list[existingItem].quantity += 1;
      } else {
        state.list.push({ ...action.payload, quantity: 1 });
      }
    },
    removeCartItem(state, action) {
      const existingItem = findItemIndex(state, action);
      state.list.splice(existingItem, 1);
    },
    increaseQuantity(state, action) {
      const existingItem = findItemIndex(state, action);
      if (existingItem != -1) {
        state.list[existingItem].quantity += 1;
      }
    },
    DecreaseQuantity(state, action) {
      const existingItem = findItemIndex(state, action);
      console.log(existingItem);
      state.list[existingItem].quantity -= 1;
      if (state.list[existingItem].quantity == 0) {
        state.list.splice(existingItem, 1);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartProductsData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCartProductsData.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.products;
      })
      .addCase(fetchCartProductsData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went Wrong!";
      });
  },
});
export const getCartProducts = ({ products, cartItemList }) => {
  return cartItemList.list
    .map(({ productId, quantity }) => {
      const productsData = products.list.find(
        (product) => product.id === productId
      );
      return { ...productsData, quantity };
    })
    .filter(({ title }) => title);
};
export const getAllCartProducts = createSelector(
  getCartProducts,
  (state) => state
);
export const getCartProductsLoading = (state) => state.cartItemList.loading;
export const getCartProductsErrors = (state) => state.cartItemList.error;

export const {
  addCartItem,
  removeCartItem,
  increaseQuantity,
  DecreaseQuantity,
} = slice.actions;

export default slice.reducer;
