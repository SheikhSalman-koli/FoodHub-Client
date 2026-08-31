
// import { createAuthClient } from "better-auth/react";

// export const authClient = createAuthClient({
//   baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || "https://food-hub-server-gilt.vercel.app",
//   fetchOptions: {
//     credentials: "include",
//   },
// });
 

import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL:"https://shei-shad-client.vercel.app",
  fetchOptions: {
    credentials: "include",
  },
});