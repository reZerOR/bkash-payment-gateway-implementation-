"use client";

import useLocalStorage from "@/hooks/useLocalstorage";

type PaymentCreateResponse = {
  paymentID: string;
  paymentCreateTime: string;
  transactionStatus: string;
  amount: string;
  currency: string;
  intent: string;
  merchantInvoiceNumber: string;
  bkashURL: string;
  callbackURl: string;
  successCallbackURL: string;
  failureCallbackURL: string;
  cancelledCallbackURL: string;
  statusCode: string;
  statusMessage: string;
};

const PayButton = () => {
  const [token, setToken] = useLocalStorage<string | null>("token", null);
  const [bkashURL, setBkashURL] = useLocalStorage<string | null>(
    "bkashURL",
    null
  );

  const handleClick = async () => {
    if (!token) {
      alert("Please create a token first!");
      return;
    }
    const response = await fetch("/api/pay", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    });
    const data: PaymentCreateResponse | any = await response.json();
    console.log("bKash payment response", data);
    if (response.ok) {
      alert("Payment created successfully!");
    } else {
      alert("Failed to create payment: " + data.error);
    }
  };

  return (
    <button
      disabled={!token}
      onClick={handleClick}
      className="bg-pink-500 disabled:cursor-not-allowed disabled:bg-gray-400 text-white font-bold py-2 px-4 rounded hover:bg-pink-700 transition duration-300 ease-in-out"
    >
      Pay with bKash
    </button>
  );
};

export default PayButton;
