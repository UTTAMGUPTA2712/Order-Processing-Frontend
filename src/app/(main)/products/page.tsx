/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect } from "react";
import { ProductsList } from "./_components/products-list/products-list";
import { Stack, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getProductsAction } from "@/features/products/get-products/get-products.action";
import { manageProducts } from "@/features/products/products.slice";
import { callSnack } from "@/components/snackbar";

const ProductsPage = () => {
  const dispatch = useAppDispatch();

  const { products } = useAppSelector((state) => state.products);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getProductsAction())
          .unwrap()
          .then((res) => {
            dispatch(manageProducts(res));
          });
      } catch (error: any) {
        callSnack(error?.message, "error");
        console.error("Error occurred:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Stack gap={3} className="flex flex-col">
      <Typography variant="titleLg" fontWeight="fontWeightMedium" color="secondary">
        Products list
      </Typography>
      <ProductsList products={products} />
    </Stack>
  );
};

export default ProductsPage;
