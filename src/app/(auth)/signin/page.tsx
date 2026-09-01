import FoodLoader from "@/myComponents/common/Loader";
import SignInForm from "@/myComponents/root/auth/SignInForm";
import { Suspense } from "react";

export default function SignInPage() {
  return (
    <Suspense fallback={<FoodLoader />}>
      <SignInForm />
    </Suspense>
  );
}