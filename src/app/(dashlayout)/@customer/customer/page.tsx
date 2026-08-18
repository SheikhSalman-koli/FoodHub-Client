import { redirect } from "next/navigation";

export default function CutomerDefaultPage() {
  return redirect('/customer/track-order');
}