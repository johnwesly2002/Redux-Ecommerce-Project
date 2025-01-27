//Action Types
const CARTADDITEM = "cart/Add";
const CARTREMOVEITEM = "cart/Remove";
const CART_INCREASE_QUANTITY = "cart/IncreaseQuantity";
const CART_DECREASE_QUANTITY = "cart/DecreaseQuantity";

//Action Creators
export function addCartItem(item) {
  return {
    type: CARTADDITEM,
    payload: item,
  };
}
export function removeCartItem(item) {
  return {
    type: CARTREMOVEITEM,
    payload: item,
  };
}
export function increaseQuantity(productId, quantity) {
  return {
    type: CART_INCREASE_QUANTITY,
    payload: { productId: productId, quantity: quantity },
  };
}

export function DecreaseQuantity(productId, quantity) {
  return {
    type: CART_DECREASE_QUANTITY,
    payload: { productId: productId, quantity: quantity },
  };
}

//Reducer
export default function cartReducer(state = [], action) {
  switch (action.type) {
    case CARTADDITEM:
      return [...state, action.payload];
    case CARTREMOVEITEM:
      return state.filter((itm) => itm.productId != action.payload.productId);
    case CART_INCREASE_QUANTITY:
      return state.map((cartItem) => {
        if (cartItem.productId == action.payload.productId) {
          return {
            ...cartItem,
            quantity: cartItem.quantity + action.payload.quantity,
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
              quantity: cartItem.quantity - action.payload.quantity,
            };
          }
          return cartItem;
        })
        .filter((cartItem) => cartItem.quantity > 0);
    default:
      return state;
  }
}
