export async function POST(request: Request) {
  const url = process.env.BKASH_GRANT_TOKEN_URL;
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
    username: username,
    password: password,
  };
  const body = JSON.stringify({
    app_key: appkey,
    app_secret: appsecret,
  });
  try {
    const response = await fetch(url as string, {
      method: "POST",
      headers: headers,
      body: body,
    });
    const data = await response.json();
    console.log("bKash token response", data);
    
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
