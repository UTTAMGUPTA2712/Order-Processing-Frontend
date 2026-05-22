/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { Grid } from "@mui/material";
import ProductCard from "../product-card/product-card";

interface ProductsListProps {
  products: any;
}
export const ProductsList = (props: ProductsListProps) => {
  const { products } = props;

  return (
    <Grid container spacing={3}>
      {products?.map((product: any) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={product.product_id}>
          {/* <Link href={`/products/${product.uuid}`}> */}
          <ProductCard product={product} />
          {/* </Link> */}
        </Grid>
      ))}
    </Grid>
  );
};
