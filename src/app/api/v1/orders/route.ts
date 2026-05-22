/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";
import { RESPONSE_CODES } from "@/common/status-codes";

export const GET = async (request: Request, context: any) => {
  try {
    const url = new URL(request.url);
    const API_URL = process.env.BACKEND_API_URL;
    const res = await fetch(`${API_URL}/sales/orders${url.search}`, {
      cache: "no-cache",
    });
    if (res.status === RESPONSE_CODES.NO_CONTENT) return NextResponse.json([]);
    const data = await res.json();
    if (!res.ok) {
      return NextResponse.json(data?.error, { status: res?.status });
    }
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(RESPONSE_CODES.INTERNAL_SERVER_ERROR, {
      status: RESPONSE_CODES.INTERNAL_SERVER_ERROR,
    });
  }
};

export const POST = async (request: NextRequest) => {
  try {
    const API_URL = process.env.BACKEND_API_URL;

    const body = await request.json();
    const { orderPayload, billingPayload, shippingPayload } = body;

    const [orderResponse, shippingResponse, billingResponse] = await Promise.all([
      fetch(`${API_URL}/sales/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderPayload),
      }),
      fetch(`${API_URL}/shipping/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(shippingPayload),
      }),
      fetch(`${API_URL}/billing/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(billingPayload),
      }),
    ]);

    const [orderData, shippingData, billingData] = await Promise.all([
      orderResponse.json(),
      shippingResponse.json(),
      billingResponse.json(),
    ]);

    if (!orderResponse.ok || !shippingResponse.ok || !billingResponse.ok) {
      return NextResponse.json(
        {
          error: "Failed to process one or more requests",
          orderError: !orderResponse.ok ? orderData.error : null,
          shippingError: !shippingResponse.ok ? shippingData.error : null,
          billingError: !billingResponse.ok ? billingData.error : null,
        },
        { status: RESPONSE_CODES.BAD_REQUEST }
      );
    }

    const placeOrderResponse = await fetch(`${API_URL}/sales/${orderPayload?.order_id}/place`, {
      method: "PATCH",
      cache: "no-cache",
      headers: {
        "Content-type": "application/json",
      },
    });

    const placeOrderResponseData = await placeOrderResponse.json();

    if (!placeOrderResponse.ok) {
      return NextResponse.json(
        {
          error: "Failed to place the order",
          details: placeOrderResponseData.error,
        },
        { status: RESPONSE_CODES.BAD_REQUEST }
      );
    }

    return NextResponse.json(
      { message: "Order placed successfully", data: placeOrderResponseData },
      { status: RESPONSE_CODES.CREATED }
    );
  } catch (error) {
    console.error("Error in POST handler:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: RESPONSE_CODES.INTERNAL_SERVER_ERROR }
    );
  }
};
