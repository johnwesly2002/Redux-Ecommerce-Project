//Action Types
const CARTADDITEM = "cart/Add";
const CARTREMOVEITEM = "cart/Remove";
const CART_INCREASE_QUANTITY = "cart/IncreaseQuantity";
const CART_DECREASE_QUANTITY = "cart/DecreaseQuantity";

//Action Creators
export function addCartItem(productData) {
  return {
    type: CARTADDITEM,
    payload: productData,
  };
}
export function removeCartItem(productData) {
  return {
    type: CARTREMOVEITEM,
    payload: productData,
  };
}
export function increaseQuantity(productId) {
  return {
    type: CART_INCREASE_QUANTITY,
    payload: { productId: productId },
  };
}

export function DecreaseQuantity(productId) {
  return {
    type: CART_DECREASE_QUANTITY,
    payload: { productId: productId },
  };
}

//Reducer
export default function cartReducer(state = [], action) {
  switch (action.type) {
    case CARTADDITEM:
      const existingItem = state.find(
        (cartItem) => cartItem.productId == action.payload.productId
      );
      console.log(existingItem);
      if (existingItem) {
        return state.map((cartItem) =>
          cartItem.productId == existingItem.productId
            ? {
                ...cartItem,
                quantity: cartItem.quantity + 1,
              }
            : cartItem
        );
      }
      return [...state, { ...action.payload, quantity: 1 }];

    case CARTREMOVEITEM:
      return state.filter((itm) => itm.productId != action.payload.productId);
    case CART_INCREASE_QUANTITY:
      return state.map((cartItem) => {
        if (cartItem.productId == action.payload.productId) {
          return {
            ...cartItem,
            quantity: cartItem.quantity + 1,
          };
        }
        return cartItem;
      });
    case CART_DECREASE_QUANTITY:
      return state
        .map((cartItem) => {
          if (cartItem.productId == action.payload.productId) {
            return {
              ...cartItem,
              quantity: cartItem.quantity - 1,
            };
          }
          return cartItem;
        })
        .filter((cartItem) => cartItem.quantity > 0);
    default:
      return state;
  }
}
