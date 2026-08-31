import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/:path*`, // আপনার ব্যাকএন্ড Vercel URL
      },
    ];
  },
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com', 
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',  
      },
      {
        protocol: 'https',
        hostname: 'i.ibb.co', 
      },
      {
        protocol: 'https',
        hostname: 'i.ibb.co.com', 
      },
      {
        protocol: 'https',
        hostname: 'i.imgur.com',         
      },
      {
        protocol: 'https',
        hostname: '*.supabase.co',     
      },
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
      },
    ],
  },
};

export default nextConfig;
