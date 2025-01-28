import { combineReducers } from "redux";
import ProductSlice from "../store/slices/productsSlice";
import CartSlice from "../store/slices/cartSlice";
import WishlistSlice from "../store/slices/wishlistSlice";
import { configureStore } from "@reduxjs/toolkit";
import { logger } from "./middleware/logger";
import { apiMiddleware } from "./middleware/apiMiddleware";
import { funcMiddleware } from "./middleware/funcMiddleware";
const rootreducer = combineReducers({
  products: ProductSlice,
  cartItemList: CartSlice,
  wishlistItem: WishlistSlice,
});
export const store = configureStore({
  reducer: rootreducer,
});
