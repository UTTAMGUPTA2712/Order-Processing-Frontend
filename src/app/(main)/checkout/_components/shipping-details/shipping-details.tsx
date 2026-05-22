import { Stack, Typography } from "@mui/material";
import clsx from "clsx";
import React from "react";

import styles from "./shipping-details.module.scss";
import TextField from "../form/textfield";
import { Control } from "react-hook-form";

interface ShippingDetailsProps {
  control: Control;
}

export const ShippingDetails = (props: ShippingDetailsProps) => {
  const { control } = props;

  return (
    <Stack gap={2} className={clsx(styles.shippingDetailsContainer, "p-3")}>
      <Typography variant="titleLg" fontWeight="fontWeightMedium" color="secondary">
        Shipping Details
      </Typography>
      <Stack>
        <TextField name="shipping_address" label="Shipping Address" control={control} type="text" />
      </Stack>
    </Stack>
  );
};
