import React from "react";
import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartIcon from "../assets/cart-icon.svg";
import WishlistIcon from "../assets/wishlist-icon.svg";
import { useSelector } from "react-redux";
import {
  fetchProducts,
  fetchProductsError,
  updateAllProducts,
} from "../store/slices/productsSlice";
import {
  fetchCartItems,
  loadCartItems,
  fetchCartItemsError,
} from "../store/slices/cartSlice";
export default function Header() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        dispatch(updateAllProducts(data));
      })
      .catch((error) => {
        dispatch(fetchProductsError());
      });

    dispatch(fetchCartItems());
    fetch("https://fakestoreapi.com/carts/5")
      .then((res) => res.json())
      .then((data) => {
        dispatch(loadCartItems(data));
      })
      .catch((error) => {
        dispatch(fetchCartItemsError());
      });
  }, []);
  const cartItemLength = useSelector((state) => state.cartItemList.list);
  const wislistItems = useSelector((state) => state.wishlistItem.length);
  return (
    <header>
      <div className="header-contents">
        <h1>
          <Link to="/">Shopee</Link>
        </h1>
        <div>
          <Link className="cart-icon" to="/wishlist">
            <img src={WishlistIcon} alt="wishlist-icon" />
            <div className="cart-items-count">{wislistItems}</div>
          </Link>
          <Link className="cart-icon" to="/cart">
            <img src={CartIcon} alt="cart-icon" />
            <div className="cart-items-count">
              {cartItemLength.reduce(
                (sum, cartItem) => sum + cartItem.quantity,
                0
              )}
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
}
