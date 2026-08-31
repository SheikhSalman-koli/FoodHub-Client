import React from "react";

export const dynamic = "force-dynamic";

export default function ProviderDashLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}