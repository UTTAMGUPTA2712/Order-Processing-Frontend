/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { BillingDetails } from "./_components/billing-details/billing-details";
import { PlaceOrder } from "./_components/place-order/place-order";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { checkoutSchema } from "./checkout.schema";
import { ShippingDetails } from "./_components/shipping-details/shipping-details";
import clsx from "clsx";
import { getAccountOptions } from "./getAccountOptions";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getBillingAccountsAction } from "@/features/billings-accounts/get-billing-accounts/get-billing-accounts.action";
import { getBillingPayload, getOrderPayload, getShippingPayload } from "./getPayload";

import styles from "./page.module.scss";
import { useRouter } from "next/navigation";
import { callSnack } from "@/components/snackbar";
import { createOrder } from "@/features/orders/store-order/store-order.action";

const CheckoutPage = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: {},
    resolver: yupResolver(checkoutSchema),
  });

  const router = useRouter();

  const { accounts } = useAppSelector((state) => state.billings);
  const { cartProducts } = useAppSelector((state) => state.products);

  const onSubmit = async (data: any) => {
    const orderPayload = getOrderPayload(cartProducts);
    const billingPayload = getBillingPayload(data);
    const shippingPayload = getShippingPayload(data);

    const payload = { orderPayload, billingPayload, shippingPayload };

    dispatch(createOrder({ data: payload }))
      .unwrap()
      .then((res: any) => {
        callSnack(res?.message, "success");
        router.push("/placed");
      });
  };

  const dispatch = useAppDispatch();

  const totalPrice = cartProducts?.reduce((acc: any, product: any) => {
    return acc + parseFloat(product.price) * product.quantity;
  }, 0);

  useEffect(() => {
    dispatch(getBillingAccountsAction());
  }, []);

  const ACCOUNT_OPTIONS = getAccountOptions(accounts);

  return (
    <Stack gap={4}>
      <Typography variant="titleLg" fontWeight="fontWeightMedium" color="secondary">
        Order Details
      </Typography>
      <Stack gap={2} className="flex flex-row justify-center">
        <Stack gap={2} className={clsx(styles.detailsContainer, "flex flex-col")} flex={1}>
          <BillingDetails control={control} ACCOUNT_OPTIONS={ACCOUNT_OPTIONS} />
          <ShippingDetails control={control} />
        </Stack>
        <PlaceOrder
          handlePlaceOrder={handleSubmit(onSubmit)}
          selectedProducts={cartProducts}
          totalPrice={totalPrice}
        />
      </Stack>
    </Stack>
  );
};

export default CheckoutPage;
