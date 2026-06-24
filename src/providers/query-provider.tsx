// 📂 src/providers/query-provider.tsx
"use client"; // 👈 এটি অবশ্যই ক্লায়েন্ট কম্পোনেন্ট হতে হবে

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, ReactNode } from "react";

export default function QueryProvider({ children }: { children: ReactNode }) {
  // 🧠 Next.js-এ প্রতি রিকোয়েস্টে যেন আলাদা ক্যাশ থাকে, তাই useState দিয়ে ইনস্ট্যান্স তৈরি করা বেস্ট প্র্যাকটিস
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5, // ডিফল্ট ৫ মিনিট ক্যাশ টাইম
            refetchOnWindowFocus: false, // উইন্ডো ফোকাস হলে অটো রি-ফেচ বন্ধ রাখা
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}