/* eslint-disable @typescript-eslint/no-explicit-any */
import * as yup from "yup";

export const shippingDetailsSchema: yup.ObjectSchema<any> = yup.object().shape({
  shipping_address: yup
    .string()
    .required("Shipping address is required")
    .trim(),
});
