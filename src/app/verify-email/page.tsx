import VerifyEmail from "@/myComponents/others/VerifyEmail";
import { Suspense } from "react";


export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyEmail />
    </Suspense>
  );
}