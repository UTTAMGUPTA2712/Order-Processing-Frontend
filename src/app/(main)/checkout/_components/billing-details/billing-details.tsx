/* eslint-disable @typescript-eslint/no-explicit-any */
import { Stack, Typography } from "@mui/material";
import React from "react";

import styles from "./billing-details.module.scss";
import clsx from "clsx";
import TextField from "../form/textfield";
import { Control } from "react-hook-form";
import Radio from "../form/radio-group";

interface BillingDetailsProps {
  control: Control;
  ACCOUNT_OPTIONS: any;
}

export const BillingDetails = (props: BillingDetailsProps) => {
  const { control, ACCOUNT_OPTIONS } = props;
  return (
    <Stack gap={2} className={clsx(styles.billingDetailsContainer, "p-3")}>
      <Typography variant="titleLg" fontWeight="fontWeightMedium" color="secondary">
        Billing Details
      </Typography>
      <Stack gap={2}>
        <Stack gap={2} className={clsx(styles.accountDetailsContainer, "p-2")}>
          <Typography variant="paragraphMd" color="secondary.600">Select Billing Account</Typography>
          <Radio
            name="billing_account_id"
            control={control}
            options={ACCOUNT_OPTIONS}
            isBoolean={false}
            typographyProps={{ fontSize: 14 }}
            optionGap={2}
          />
        </Stack>
        <TextField name="billing_address" label="Billing Address" control={control} type="text" />
      </Stack>
    </Stack>
  );
};
