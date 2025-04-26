"use server";

import { cookies } from "next/headers";

export async function setAccessToken(accessToken: string, expiryDate?: string) {
  console.log("Setting access token (Web)");
  (await cookies()).set("accessToken", accessToken, {
    secure: true,
    httpOnly: true,
    expires: expiryDate ? new Date(expiryDate) : undefined,
    sameSite: "strict",
  });
}

export async function getAccessToken() {
  const token = (await cookies()).get("accessToken")?.value;
  return token;
}

export async function removeAccessToken() {
  (await cookies()).delete("accessToken");
}


// "use client";

// import { Preferences } from "@capacitor/preferences";

// export async function setAccessToken(accessToken: string,expiryDate?: string) {
//   console.log("Setting access token (Mobile)",expiryDate);
//   await Preferences.set({ key: "accessToken", value: accessToken });
// }

// export async function getAccessToken() {
//   const token = await Preferences.get({ key: "accessToken" });
//   return token.value;
// }

// export async function removeAccessToken() {
//   await Preferences.remove({ key: "accessToken" });
// }
