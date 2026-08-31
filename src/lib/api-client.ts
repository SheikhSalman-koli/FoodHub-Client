import axios from "axios";
import { headers } from "next/headers";

export const baseUrl = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || "https://food-hub-server-gilt.vercel.app",
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
      console.log(e);
    }
  }
  return config;
});