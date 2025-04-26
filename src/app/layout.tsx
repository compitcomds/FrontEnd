import "./globals.css"; // Import Tailwind styles
import Link from "next/link";
import { Providers } from "./Providers"; // Import the client-side Providers
import { removeAccessToken } from "@/_action/action";
import { Toaster } from "sonner";
import { ClientWrapper } from "./ClientWrapper";
import { Button } from "@/components/ui/button";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-500">
        <ClientWrapper>
          <div className="z-50 flex gap-3">
            <Link className="bg-amber-300 px-2 m-1 rounded" href="/register">
              register
            </Link>
            <Link className="bg-amber-300 px-2 m-1 rounded" href="/">
              home
            </Link>
            <Link className="bg-amber-300 px-2 m-1 rounded" href="/login">
              login
            </Link>
            <Link
              className="bg-amber-300 px-2 m-1 rounded"
              href="/dashboard/patient"
            >
              p dashboard
            </Link>
            <Link
              className="bg-amber-300 px-2 m-1 rounded"
              href="/dashboard/doctor"
            >
              Doc dashboard
            </Link>
            <Button onClick={removeAccessToken}>Logout</Button>
          </div>
          <Providers>{children}</Providers>
          <Toaster />
        </ClientWrapper>
      </body>
    </html>
  );
}
