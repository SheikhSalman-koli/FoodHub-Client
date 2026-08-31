import React from "react";

export const dynamic = "force-dynamic";

export default function CustomerDashLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}