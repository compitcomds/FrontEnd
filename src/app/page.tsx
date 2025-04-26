"use client";
import axiosInstance from "@/_lib/axiosInstance";
import { useEffect, useState } from "react";
import { toast } from "sonner";
export default function Home() {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axiosInstance.get("/api/users/me"); // Fix the route
        setUserData(res.data);
      } catch {
        toast.error("Error fetching user data:");
        setError("Error fetching data");
      }
    }

    fetchData();
  }, []);

  if (error) return <div>{error}</div>;
  if (!userData) return <div>Loading...</div>;

  return (
    <div>
      <pre>{JSON.stringify(userData, null, 2)}</pre>
    </div>
  );
}
