import React from "react";
import Link from "next/link";
const GoogleLogin: React.FC = () => {
  return (
    <div className="flex justify-center items-center mb-4">
      <Link
        href="http://localhost:1337/api/connect/google"
        className="bg-yellow-600 p-2 rounded-md text-white"
      >
        Login with Google
      </Link>
    </div>
  );
};

export default GoogleLogin;
