import { redirect } from "next/navigation";

export default function ProviderDefaultPage() {
  return redirect('/provider-dash/create-meal')
}
