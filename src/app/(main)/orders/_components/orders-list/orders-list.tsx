/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";

import { Grid } from "@mui/material";
import OrderCard from "../order-card/order-card";
import NoDataFound from "@/components/no-data/no-data.component";

interface OrdersListProps {
  orders: any;
}

export const OrdersList = (props: OrdersListProps) => {
  const { orders } = props;

  return (
    <Grid container spacing={3}>
      {orders?.length === 0 ? (
        <NoDataFound />
      ) : (
        orders?.map((order: any) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={order.order_id}>
            <OrderCard order={order} />
          </Grid>
        ))
      )}
    </Grid>
  );
};
