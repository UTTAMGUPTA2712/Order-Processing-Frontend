/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Divider, Grid, Stack, Typography } from "@mui/material";
import React, { Fragment } from "react";

import styles from "./place-order.module.scss";
import clsx from "clsx";

interface PlaceOrderProps {
  handlePlaceOrder: () => void;
  selectedProducts: any;
  totalPrice: number;
}
export const PlaceOrder = (props: PlaceOrderProps) => {
  const { handlePlaceOrder, selectedProducts, totalPrice } = props;

  return (
    <Stack gap={2} className={clsx(styles.checkoutContainer, "p-2")}>
      {/* <Typography variant="paragraphLg" fontWeight="fontWeightMedium" color="secondary">
        Cart total
      </Typography> */}
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography variant="paragraphMd" fontWeight="fontWeightMedium" color="secondary">
            Product
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="paragraphMd" fontWeight="fontWeightMedium" color="secondary">
            Subtotal
          </Typography>
        </Grid>
        {selectedProducts?.map((product: any) => (
          <Fragment key={product.product_id}>
            <Grid item xs={6}>
              <Typography variant="paragraphMd" fontWeight="fontWeightMedium" color="secondary">
                {product?.name} * {product?.quantity}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="paragraphMd" fontWeight="fontWeightMedium" color="secondary">
                {product?.price}
              </Typography>
            </Grid>
          </Fragment>
        ))}
        <Divider />
        <Grid item xs={6}>
          <Typography variant="paragraphMd" fontWeight="fontWeightMedium" color="secondary">
            Total
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="paragraphMd" fontWeight="fontWeightMedium" color="secondary">
            {totalPrice}
          </Typography>
        </Grid>
      </Grid>
      <Divider />
      <Typography variant="paragraphMd" color="secondary">
        Your personal data will be used to support your experience throughout this website, to
        manage access to your account, and for other purposes described in our privacy policy.
      </Typography>
      <Button onClick={handlePlaceOrder} variant="contained">
        Place Order
      </Button>
    </Stack>
  );
};
