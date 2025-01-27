import { createSlice } from "@reduxjs/toolkit";
// import { produce } from "immer";

// //Action Types
// const CARTADDITEM = "cart/Add";
// const CARTREMOVEITEM = "cart/Remove";
// const CART_INCREASE_QUANTITY = "cart/IncreaseQuantity";
// const CART_DECREASE_QUANTITY = "cart/DecreaseQuantity";

// //Action Creators
// export function addCartItem(productData) {
//   return {
//     type: CARTADDITEM,
//     payload: productData,
//   };
// }
// export function removeCartItem(productId) {
//   return {
//     type: CARTREMOVEITEM,
//     payload: productId,
//   };
// }
// export function increaseQuantity(productId) {
//   return {
//     type: CART_INCREASE_QUANTITY,
//     payload: { productId: productId },
//   };
// }

// export function DecreaseQuantity(productId) {
//   return {
//     type: CART_DECREASE_QUANTITY,
//     payload: { productId: productId },
//   };
// }

// //Reducer
// export default function cartReducer(Originalstate = [], action) {
//   return produce(Originalstate, (state) => {
//     const existingItem = state.findIndex(
//       (cartItem) => cartItem.productId == action.payload.productId
//     );
//     switch (action.type) {
//       case CARTADDITEM:
//         if (existingItem != -1) {
//           state[existingItem].quantity += 1;
//           break;
//         }
//         state.push({ ...action.payload, quantity: 1 });
//         break;

//       case CARTREMOVEITEM:
//         state.splice(existingItem, 1);
//         break;
//       case CART_INCREASE_QUANTITY:
//         state[existingItem].quantity += 1;
//         break;
//       case CART_DECREASE_QUANTITY:
//         state[existingItem].quantity -= 1;
//         if (state[existingItem].quantity === 0) {
//           state.splice(existingItem, 1);
//         }
//         break;
//       default:
//         break;
//     }
//     return state;
//   });
// }

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
    fetchCartItems(state) {
      state.loading = true;
    },
    loadCartItems(state, action) {
      state.loading = false;
      state.list = action.payload.products;
    },
    addCartItem(state, action) {
      const existingItem = findItemIndex(state, action);
      if (existingItem != -1) {
        state[existingItem].quantity += 1;
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
    fetchCartItemsError(state, action) {
      state.loading = false;
      state.error = action.payload || "Something went Wrong!";
    },
  },
});
console.log(slice);
export const {
  fetchCartItems,
  loadCartItems,
  addCartItem,
  removeCartItem,
  increaseQuantity,
  DecreaseQuantity,
  fetchCartItemsError,
} = slice.actions;

export default slice.reducer;
