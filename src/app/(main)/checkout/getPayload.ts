/* eslint-disable @typescript-eslint/no-explicit-any */
import { v4 as uuidv4 } from "uuid";

const orderId = uuidv4();
const customerId = uuidv4();

export const getBillingPayload = (data: any) => ({
  order_id: orderId,
  billing_account_id: data.billing_account_id,
  billing_address: data.billing_address,
});


export const getShippingPayload = (data: any) => ({
  order_id: orderId,
  shipping_address: data.shipping_address,
});

export const getOrderPayload = (data: any) => {
  const orderPayload = data?.map(
    ({ product_id, quantity }: { product_id: string; quantity: string }) => ({
      id: product_id,
      quantity,
    })
  );

  return { products_id: orderPayload, customer_id: customerId, order_id: orderId };
};
