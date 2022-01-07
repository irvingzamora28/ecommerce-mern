import axios from "axios";
import React, { useContext, useEffect } from "react";
import { GlobalState } from "../../../GlobalState";
import Loading from "../utils/loading/Loading";
import ProductItem from "./ProductItem";

function Products() {
  const state = useContext(GlobalState);
  const [products, setProducts] = state.productsAPI.products;
  const [isAdmin] = state.userAPI.isAdmin

  const getProducts = async () => {
    const res = await axios.get('/api/products')
    setProducts(res.data.products);

  }

  useEffect(() => {
      getProducts()
  }, [])

  console.log(products);

  return (
    <>
      <div className="products">
        {products.map((product) => {
          return <ProductItem key={product._id} product={product} />;
        })}
      </div>
      {products.length === 0 && <Loading />}
    </>
  );
}

export default Products;
