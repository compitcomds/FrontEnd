// this layout have a default role that is Authenticated and that is provided by strapi  

"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getAccessToken } from "@/_action/action";
import axiosInstance from "@/_lib/axiosInstance";
import Home from "@/app/page";
export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  // ✅ Fetch user role with caching
  const { data: role, isLoading } = useQuery({
    queryKey: ["userRole"],
    queryFn: async () => {
      const token = await getAccessToken();
      if (!token) return "Guest"; 

      try {
        const res = await axiosInstance.get("/api/users/me?populate=role");
        return res.data?.role?.name || "Guest";
      } catch (error) {
        console.error("Error fetching role:", error);
        return "Guest";
      }
    },
    // staleTime: 5 * 60 * 1000, // Cache role for 5 minutes
  });

  useEffect(() => {
    if (!isLoading && role !== "Authenticated") {
      router.replace("/login");
    }
  }, [role, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex h-screen justify-center items-center text-lg">
        Loading...
      </div>
    );
  }

  if (role === "Authenticated") {
    return (
      <div className="dashboard-container">
        <aside className="sidebar">
          <h2>Doctor Dashboard</h2>
          <ul>
          <Home/>
          </ul>
        </aside>
        <main className="content">{children}</main>
      </div>
    );
  }
}
