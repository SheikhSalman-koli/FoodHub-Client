import FoodLoader from "@/myComponents/common/Loader";
import VerifyEmail from "@/myComponents/others/VerifyEmail";
import { Suspense } from "react";


export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<FoodLoader/>}>
      <VerifyEmail />
    </Suspense>
  );
}