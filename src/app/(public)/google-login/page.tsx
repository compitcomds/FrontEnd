"use client";

import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
// import { getAccessToken, setAccessToken } from "@/app/_action/action";
import React from "react";
import { getAccessToken,setAccessToken } from "@/_action/action";

async function loginUserGoogle(queryString: string) {
  try {
    const baseUrl = "http://localhost:1337/api/auth/google/callback";
    const fullUrl = `${baseUrl}?${queryString}`;
    const response = await axios.get(fullUrl);
    console.log("Login response:", response);
    const { jwt, user } = response.data;
    await setAccessToken(jwt, "3600"); // Store token

    return user;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
}

export default function GoogleLoginPage() {
  const searchParams = useSearchParams();
  const queryString = searchParams ? searchParams.toString() : "";
  const router = useRouter();

  const {
    data: user,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["googleLogin"], // Unique query key
    queryFn: () =>
      queryString ? loginUserGoogle(queryString) : Promise.resolve(null),
    enabled: !!queryString, // Ensures query runs only if params exist
  });

  React.useEffect(() => {
    const handleRedirect = async () => {
      if (!queryString) {
        router.push("/login");
        return;
      }
      if (user) {
        const token = await getAccessToken();
        if (token) {
          router.push("/dashboard"); // Redirect to dashboard instead of login
        }
      }
    };

    handleRedirect();
  }, [queryString, user, router]); // ✅ Added dependencies

  return (
    <div>
      <h1>Login with Google....</h1>
      {isLoading && <p>Logging in...</p>}
      {isError && <p>Error logging in. Please try again.</p>}
      {user && (
        <div>
          <p>
            Welcome, <strong>{user.username}</strong>!
          </p>
          <p>Email: {user.email}</p>
          <p>Google ID: {user.documentId}</p>
        </div>
      )}
    </div>
  );
}
