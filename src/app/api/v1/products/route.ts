/* eslint-disable @typescript-eslint/no-explicit-any */
import { RESPONSE_CODES } from "@/common/status-codes";
import { getQueryParams } from "@/lib/get-query-params";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  try {
    const API_URL = process.env.BACKEND_API_URL;

    // Parse query parameters from the incoming request
    const url = new URL(request.url);
    const searchParams = url.search;

    const productsRes = await fetch(`${API_URL}/products-catalog/products${searchParams}`, {
      cache: "no-cache",
    });
    const products = await productsRes.json();
    const productsId = products?.map((product: any) => product.product_id);

    const queryParams = getQueryParams(productsId);
    // Fetch data from all endpoints in parallel
    const [shippingRes, salesRes] = await Promise.all([
      fetch(`${API_URL}/shipping/products?${queryParams}`, { cache: "no-cache" }),
      fetch(`${API_URL}/sales/products?${queryParams}`, { cache: "no-cache" }),
    ]);

    // Parse responses
    const [shippingData, salesData] = await Promise.all([
      shippingRes.status === RESPONSE_CODES.NO_CONTENT ? [] : shippingRes.json(),
      salesRes.status === RESPONSE_CODES.NO_CONTENT ? [] : salesRes.json(),
    ]);

    // Check if any request failed
    if (!shippingRes.ok || !salesRes.ok) {
      return NextResponse.json(
        {
          shippingError: !shippingRes.ok ? shippingData.error : null,
          salesError: !salesRes.ok ? salesData.error : null,
        },
        { status: RESPONSE_CODES.BAD_REQUEST }
      );
    }

    // Combine data or perform additional processing
    const formattedProducts = products?.map((product: any) => {
      const priceInfo = salesData?.find((item: any) => item.product_id === product.product_id);
      const stockInfo = shippingData?.find((item: any) => item.product_id === product.product_id);

      return {
        ...product,
        price: priceInfo?.price || null,
        quantity: stockInfo?.quantity_on_hand || null,
      };
    });

    // Return the combined result
    return NextResponse.json(formattedProducts, { status: 200 });
  } catch (error) {
    console.error("Error in GET handler:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: RESPONSE_CODES.INTERNAL_SERVER_ERROR }
    );
  }
};
