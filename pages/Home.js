import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Product from "../components/Product";
import {
  fetchProducts,
  fetchProductsError,
  updateAllProducts,
} from "../store/slices/productsSlice";
export default function Home() {
  const products = useSelector((state) => state.products.list);
  const isLoading = useSelector((state) => state.products.loading);
  const Error = useSelector((state) => state.products.error);

  return isLoading ? (
    <h1
      style={{
        textAlign: "center",
      }}
    >
      Loading...
    </h1>
  ) : Error ? (
    <h2 style={{ textAlign: "center" }}>{Error}</h2>
  ) : (
    <div className="products-container">
      {products.map(({ id, title, rating, price, image }) => (
        <Product
          key={id}
          productId={id}
          title={title}
          rating={rating.rate}
          price={price}
          imageUrl={image}
        />
      ))}
    </div>
  );
}
