import { combineReducers, createStore } from "redux";
import cartReducer, {
  addCartItem,
  DecreaseQuantity,
  increaseQuantity,
  removeCartItem,
} from "./cartReducer";
import productsReducer from "./productsReducer";
import wishlistReducer, {
  addWishListItem,
  removeWishListItem,
} from "./wishlistReducer";

const rootreducer = combineReducers({
  products: productsReducer,
  cartItemList: cartReducer,
  wishlistItem: wishlistReducer,
});
export const store = createStore(
  rootreducer,
  window.__REDUX_DEVTOOLS_EXTENSION__?.()
);
// console.log(store);
// const unsubscribe = store.subscribe(() => {
//   console.log(store.getState());
// });
// store.dispatch(addCartItem({ productId: 1, quantity: 1 }));
// store.dispatch(removeCartItem({ productId: 1, quantity: 1 }));
// store.dispatch(addCartItem({ productId: 1, quantity: 1 }));

// store.dispatch(increaseQuantity(1, 15));
// store.dispatch(DecreaseQuantity(1, 10));

// store.dispatch(addWishListItem({ productId: 1, quantity: 10 }));
// store.dispatch(removeWishListItem({ productId: 1, quantity: 10 }));
// store.dispatch(addWishListItem({ productId: 1, quantity: 10 }));

// store.dispatch(DecreaseQuantity(1, 6));

// store.dispatch(addCartItem({ productId: 1, quantity: 1 }));
