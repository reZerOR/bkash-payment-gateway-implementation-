import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const { token } = await request.json();
  const url = process.env.BKASH_CREATE_PAYMENT_URL;
  const username = process.env.BKASH_USERNAME;
  const password = process.env.BKASH_PASSWORD;
  const appkey = process.env.BKASH_API_KEY;
  const appsecret = process.env.BKASH_SECRET_KEY;
  if (!username || !password || !appkey || !appsecret) {
    return (
      Response.json({
        error: "Missing environment variables for bKash credentials",
      }),
      {
        status: 500,
      }
    );
  }
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: token,
    "X-APP-Key": appkey,
  };
  const body = {
    mode: "0011",
    payerReference: "sale90",
    callbackURL: "http://localhost/",
    amount: "100",
    currency: "BDT",
    intent: "sale",
    merchantInvoiceNumber: "1234567890",
  };
  try {
    const response = await fetch(url as string, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    });
    const data = await response.json();
    console.log("bKash payment create response", data);
    if (response.ok) {
      return Response.json(data, { status: 200 });
    }
    return Response.json(data, { status: response.status });
  } catch (error) {
    console.log(error);
    return Response.json(
      { error: "Failed to fetch bKash token" },
      { status: 500 }
    );
  }
}
