/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useCallback, useState } from "react";
import { CartList } from "./_components/cart-list/cart-list";
import { IconButton, Stack, Typography } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { cartListColumns } from "./_components/cart-list/cart-list.columns";
import { Checkout } from "./_components/checkout/checkout";
import clsx from "clsx";

import styles from "./page.module.scss";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { removeAll } from "@/features/products/products.slice";

const Cart = () => {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);

  const dispatch = useAppDispatch();

  const { cartProducts } = useAppSelector((state) => state.products);

  const router = useRouter();

  const handleDelete = (data: any) => {
    dispatch(removeAll(data?.product_id));
  };

  const handleCheckout = () => {
    router.push("/checkout");
  };

  const getTotal = (price: string, quantity: number) => {
    return parseInt(price) * quantity;
  };

  const calculateSerialNumber = (index: number) => page * limit + index + 1;

  const createRowData = useCallback(
    (value: any) =>
      value?.map((data: any, index: any) => ({
        index: calculateSerialNumber(index),
        name: data?.name,
        price: data?.price,
        quantity: data?.quantity,
        total: getTotal(data?.price, data?.quantity),
        actions: (
          <Stack direction="row" alignItems="center" justifyContent="center">
            <IconButton onClick={() => handleDelete(data)}>
              <Delete />
            </IconButton>
          </Stack>
        ),
        archive: !!data?.deletedAt,
      })),
    [page, limit]
  );
  return (
    <Stack gap={3}>
      <Typography variant="titleLg" color="secondary" fontWeight="fontWeightMedium">
        Shopping Cart
      </Typography>
      <Stack gap={4} className={clsx(styles.cartContainer, "flex flex-row flex-wrap")}>
        <CartList
          page={page}
          limit={limit}
          data={createRowData(cartProducts)}
          length={cartProducts?.length}
          columns={cartListColumns}
          setLimit={setLimit}
          setPage={setPage}
          paginationDiff={false}
        />
        <Checkout handleCheckout={handleCheckout} />
      </Stack>
    </Stack>
  );
};

export default Cart;
