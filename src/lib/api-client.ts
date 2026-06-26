import axios from "axios";
import { headers } from "next/headers";

export const baseUrl = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true
})

baseUrl.interceptors.request.use(async (config) => {
  // চেক করা হচ্ছে কোডটি সার্ভার সাইডে রান করছে কি না
  if (typeof window === "undefined") {
    try {
      const nextHeaders = await headers();
      const cookie = nextHeaders.get("cookie");
      if (cookie) {
        config.headers["Cookie"] = cookie;
      }
    } catch (e) {
      // সাইলেন্ট এরর (যেমন স্ট্যাটিক বিল্ডের সময় headers() কল হলে)
    }
  }
  return config;
});