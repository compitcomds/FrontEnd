"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { getAccessToken } from "@/_action/action"; // Make sure this works correctly
import axiosInstance from "@/_lib/axiosInstance";

export default function AuthWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  // 🔥 New: `isAuthChecked` ensures NOTHING renders until auth is fully loaded
  const [authState, setAuthState] = useState<{
    isAuthChecked: boolean;
    role: string | null;
  }>({
    isAuthChecked: false,
    role: null,
  });

  const authPages = [
    "/login",
    "/register",
    "/forgotPassword",
    "/resetPassword",
    "/google-login",
  ];
  const rolePaths: Record<string, string> = {
    Patient: "/dashboard/patient",
    Doctor: "/dashboard/doctor",
    Manager: "/dashboard/manager",
  };

  useEffect(() => {
    async function checkAuth() {
      const token = await getAccessToken();

      if (!token) {
        setAuthState({ isAuthChecked: true, role: "Guest" });
        return;
      }

      try {
        const res = await axiosInstance.get("/api/users/me?populate=role");
        const userRole = res.data?.role?.name || "Guest";
        setAuthState({ isAuthChecked: true, role: userRole });
      } catch (error) {
        console.error("Error fetching role:", error);
        setAuthState({ isAuthChecked: true, role: "Guest" });
      }
    }

    checkAuth();
  }, []);
  useEffect(() => {
    console.log("Auth State Updated:", authState);
  }, [authState]);

  useEffect(() => {
    const { isAuthChecked, role } = authState;

    // 🛑 Do nothing until auth check is complete
    if (!isAuthChecked) return;

    // 🚀 Redirect logic
    if (role === "Guest" && pathname.startsWith("/dashboard")) {
      router.replace("/login");
    } else if (role !== "Guest" && authPages.includes(pathname)) {
      router.replace(role ? rolePaths[role] || "/" : "/");
    } else if (role !== "Guest" && pathname.startsWith("/dashboard")) {
      const expectedPath = role ? rolePaths[role] : undefined;
      if (expectedPath && pathname !== expectedPath) {
        router.replace(expectedPath);
      }
    }
  }, [authState, pathname]);

  // 🚀 FIX: Show NOTHING until auth check is done
  if (!authState.isAuthChecked) {
    return (
      <div className="flex h-screen justify-center items-center text-lg">
        Loading...
      </div>
    );
  }

  return <>{children}</>;
}
