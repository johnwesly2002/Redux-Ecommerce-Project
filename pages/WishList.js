import React from "react";
import { useSelector } from "react-redux";
import WishlistItem from "../components/wishlistItem";
import { getWishlistProducts } from "../store/slices/wishlistSlice";
export default function WishList() {
  const wishlistItems = useSelector(getWishlistProducts);

  return (
    <div className="cart-container">
      <h2>Items in Your Wishlist</h2>
      <div className="products-container">
        {wishlistItems.map(
          ({ productId, title, rating, price, imageUrl, quantity }) => (
            <WishlistItem
              key={productId}
              title={title}
              rating={rating}
              price={price}
              imageUrl={imageUrl}
            />
          )
        )}
        ;
      </div>
    </div>
  );
}
