"use client";

import useLocalStorage from "@/hooks/useLocalstorage";

type TokenResponse = {
  statusCode: string;
  statusMessage: string;
  id_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
};

const CreateToken = () => {
  const [__, setToken] = useLocalStorage<string | null>("token", null);
  const [_, setRefreshToken] = useLocalStorage<string | null>(
    "refreshToken",
    null
  );
  const handleClick = async () => {
    const response = await fetch("/api/token_create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data: TokenResponse | any = await response.json();
    console.log("bKash token response", data);
    if (response.ok) {
        setToken(data.id_token);
        setRefreshToken(data.refresh_token);
      alert("Token created successfully!");
    } else {
      alert("Failed to create token: " + data.error);
    }
  };
  return (
    <button
      onClick={handleClick}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      Create Token
    </button>
  );
};

export default CreateToken;
