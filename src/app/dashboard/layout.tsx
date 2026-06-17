import { tiro } from "../layout";


export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      lang="en"
    >
      <section className={`min-h-full flex flex-col `}>{children}</section>
    </div>
  );
}
