/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Grid, Stack, Typography } from "@mui/material";
import clsx from "clsx";
import React from "react";

import styles from "./checkout.module.scss";
import { useAppSelector } from "@/lib/hooks";

interface CheckoutProps {
  handleCheckout: () => void;
}
export const Checkout = (props: CheckoutProps) => {
  const { handleCheckout } = props;

  const { cartProducts } = useAppSelector((state) => state.products);
  const totalPrice = cartProducts?.reduce((acc: any, product: any) => {
    return acc + parseFloat(product.price) * product.quantity;
  }, 0);
  
  return (
    <Stack gap={2} className={clsx(styles.checkoutContainer, "p-2")}>
      <Typography variant="paragraphLg" fontWeight="fontWeightMedium" color="secondary">
        Cart total
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography variant="paragraphMd" fontWeight="fontWeightMedium" color="secondary">
            Subtotal:
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="paragraphMd" fontWeight="fontWeightMedium" color="secondary">
            {totalPrice}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="paragraphMd" fontWeight="fontWeightMedium" color="secondary">
            Shipping:
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="paragraphMd" fontWeight="fontWeightMedium" color="secondary">
            free
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="paragraphMd" fontWeight="fontWeightMedium" color="secondary">
            Total:
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="paragraphMd" fontWeight="fontWeightMedium" color="secondary">
            {totalPrice}
          </Typography>
        </Grid>
      </Grid>
      <Button onClick={handleCheckout} variant="contained">
        Checkout
      </Button>
    </Stack>
  );
};
