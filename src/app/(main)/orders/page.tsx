"use client";

import { Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { OrdersList } from "./_components/orders-list/orders-list";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getOrdersAction } from "@/features/orders/get-orders/get-orders.action";

const OrderPage = () => {
  const dispatch = useAppDispatch();

  const orders = useAppSelector((state) => state.orders.orders);

  useEffect(() => {
    dispatch(getOrdersAction());
  }, []);

  return (
    <Stack gap={3} className="flex flex-col">
      {/* <Image src="/home-banner.jpg" alt="Home banner" height={300} width={500} /> */}
      <Typography variant="titleLg" fontWeight="fontWeightMedium" color="secondary">
        Orders list
      </Typography>
      <OrdersList orders={orders} />
    </Stack>
  );
};

export default OrderPage;
