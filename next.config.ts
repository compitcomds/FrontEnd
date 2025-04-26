// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;


 /** @type {import('next').NextConfig} */
 const nextConfig = {
  output: 'export',  // Enables static export mode
  trailingSlash: true, // Optional: creates an index.html per route
};

module.exports = nextConfig;
