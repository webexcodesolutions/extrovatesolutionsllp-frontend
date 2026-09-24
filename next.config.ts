import type { NextConfig } from "next";
import path from "node:path";
const imageHosts = (process.env.IMAGE_HOSTS || "").split(",").map(host => host.trim()).filter(Boolean);
const nextConfig: NextConfig = {
  reactCompiler: true,
  poweredByHeader: false,
  turbopack: { root: path.resolve(process.cwd()) },
  images: { remotePatterns: imageHosts.map(hostname => ({ protocol: "https" as const, hostname, port: "", pathname: "/**" })) },
  async redirects() { return [{ source: "/contact", destination: "/contact-us", permanent: true }, { source: "/privacy", destination: "/privacy-policy", permanent: true }]; },
  async headers() { return [{ source: "/:path*", headers: [
    { key: "X-Content-Type-Options", value: "nosniff" },
    { key: "X-Frame-Options", value: "DENY" },
    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
    { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
    { key: "Content-Security-Policy", value: "object-src 'none'; base-uri 'self'; frame-ancestors 'none'" },
  ] }, { source: "/api/:path*", headers: [{ key: "Cache-Control", value: "no-store" }] }]; },
};
export default nextConfig;
