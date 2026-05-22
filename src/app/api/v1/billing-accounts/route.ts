/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { RESPONSE_CODES } from "@/common/status-codes";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: Request, context: any) => {
  try {
    const url = new URL(request.url);
    const API_URL = process.env.BACKEND_API_URL;
    const res = await fetch(`${API_URL}/billing/accounts${url.search}`, {
      cache: "no-cache",
    });
      if (res.status === RESPONSE_CODES.NO_CONTENT)
        return NextResponse.json([]);
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