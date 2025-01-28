import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Product from "../components/Product";
import {
  getAllProducts,
  getAllProductsLoading,
  getAllProductsErrors,
} from "../store/slices/productsSlice";
export default function Home() {
  const products = useSelector(getAllProducts);
  const isLoading = useSelector(getAllProductsLoading);
  const Error = useSelector(getAllProductsErrors);

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
