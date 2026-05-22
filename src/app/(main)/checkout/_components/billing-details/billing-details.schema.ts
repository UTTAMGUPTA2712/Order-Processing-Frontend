/* eslint-disable @typescript-eslint/no-explicit-any */
import * as yup from "yup";

export const billingDetailsSchema: yup.ObjectSchema<any> = yup.object().shape({
  billing_address: yup.string().required("Billing address is required").trim(),
  billing_account_id: yup.string().required("Billing account is required")
});
