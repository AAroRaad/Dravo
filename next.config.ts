import type { NextConfig } from "next";
const config: NextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: __dirname,
  serverExternalPackages: ["prisma", "@prisma/client"],
};
export default config;
