/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org",
        port: "",
      },
      {
        protocol: "https",
        hostname: "dtizryknjwfpgsxnenqs.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/**", // optional: restrict path
      },
    ],
  },
};

export default nextConfig;
