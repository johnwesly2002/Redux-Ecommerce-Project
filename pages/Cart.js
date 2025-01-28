import React from "react";
import CartItem from "../components/CaartItem";
import { useSelector } from "react-redux";
import {
  getAllCartProducts,
  getCartProductsLoading,
  getCartProductsErrors,
} from "../store/slices/cartSlice";
export default function Cart() {
  const cartItems = useSelector(getAllCartProducts);
  const isLoading = useSelector(getCartProductsLoading);
  const Error = useSelector(getCartProductsErrors);

  return (
    <div className="cart-container">
      <h2>Items in Your Cart</h2>
      <div className="cart-items-container">
        <div className="cart-header cart-item-container">
          <div className="cart-item">Item</div>
          <div className="item-price">Price</div>
          <div className="quantity">Quantity</div>
          <div className="total">Total</div>
        </div>
        {isLoading ? (
          <h1 style={{ textAlign: "center" }}>Loading...</h1>
        ) : Error ? (
          <h1 style={{ textAlign: "center" }}>{Error}</h1>
        ) : (
          cartItems.map(({ id, title, rating, price, image, quantity }) => (
            <CartItem
              key={id}
              productId={id}
              title={title}
              price={price}
              quantity={quantity}
              imageUrl={image}
              rating={rating.rate}
            />
          ))
        )}
        <div className="cart-header cart-item-container">
          <div></div>
          <div></div>
          <div></div>
          {!isLoading && !Error && (
            <div className="total">
              $
              {cartItems.reduce(
                (sum, cartItem) => sum + cartItem.quantity * cartItem.price,
                0
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
