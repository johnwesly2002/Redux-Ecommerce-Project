import { createSlice } from "@reduxjs/toolkit";

// //Action Types
// const WISHLIST_ADD_ITEM = "cart/addWishlistItem";
// const WISHLIST_REMOVE_ITEM = "cart/removeWishlistItem";

// //Action Creator
// export function addWishListItem(item) {
//   return {
//     type: WISHLIST_ADD_ITEM,
//     payload: item,
//   };
// }
// export function removeWishListItem(item) {
//   return {
//     type: WISHLIST_REMOVE_ITEM,
//     payload: item,
//   };
// }

// //reducer
// export default function wishlistReducer(state = [], action) {
//   switch (action.type) {
//     case WISHLIST_ADD_ITEM:
//       return [...state, action.payload];
//     case WISHLIST_REMOVE_ITEM:
//       return state.filter(
//         (wishItem) => wishItem.productId != action.payload.productId
//       );
//     default:
//       return state;
//   }
// }

const findItemIndex = (state, action) =>
  state.findIndex(
    (wishlistItem) => wishlistItem.productId == action.payload.productId
  );

const slice = createSlice({
  name: "wishlist",
  initialState: [],
  reducers: {
    addWishListItem(state, action) {
      const existingItem = findItemIndex(state, action);
      if (existingItem == -1) {
        state.push(action.payload);
      }
    },
    removeWishListItem(state, action) {
      const existingItem = findItemIndex(state, action);
      state.splice(existingItem, 1);
    },
  },
});

export const { addWishListItem, removeWishListItem } = slice.actions;

export default slice.reducer;
