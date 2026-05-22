/* eslint-disable @typescript-eslint/no-explicit-any */
import * as yup from "yup";
import { billingDetailsSchema } from "./_components/billing-details/billing-details.schema";
import { shippingDetailsSchema } from "./_components/shipping-details/shipping-details.schema";

export const checkoutSchema: yup.ObjectSchema<any> = billingDetailsSchema.concat(shippingDetailsSchema);