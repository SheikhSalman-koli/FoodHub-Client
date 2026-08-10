import { AppSidebar } from "@/components/AppSidebar";
import { Roles } from "@/constants/userRole";
import { userServices } from "@/modules/services/user.service";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default async function DashboardLayout({
  children,
  admin,
  provider,
  customer,
}: {
  children: React.ReactNode;
  admin: React.ReactNode;
  provider: React.ReactNode;
  customer: React.ReactNode;
}) {
  const user = await userServices.getSessionUser();

  return (
    <SidebarProvider>
      <AppSidebar role={user?.role} />

      <main className="relative flex-1 min-h-screen bg-[#0d0d0d] text-gray-100 overflow-x-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />

        <header className="sticky top-0 z-30 flex items-center justify-between px-6 py-4 bg-[#0d0d0d]/70 backdrop-blur-xl border-b border-white/5 shadow-2xl shadow-black/40">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="text-gray-400 hover:text-amber-500 hover:bg-white/5 transition-colors duration-200 cursor-pointer rounded-xl p-2 border border-white/5" />

            <span className="text-xs uppercase tracking-widest font-bold text-gray-400 hidden sm:inline-block">
              {user?.role === Roles.admin
                ? "অ্যাডমিন প্যানেল"
                : user?.role === Roles.provider
                ? "প্রোভাইডার ড্যাশবোর্ড"
                : "মাই অ্যাকাউন্ট"}
            </span>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 bg-[#141414] rounded-full border border-white/5 text-xs text-amber-500 font-semibold shadow-inner">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            <span className="uppercase tracking-wider">
              {user?.role || "Guest"}
            </span>
          </div>
        </header>

        <div className="p-6 md:p-8 relative z-10 max-w-7xl mx-auto animate-in fade-in duration-300">
          {/* {children} */}

          {user?.role === Roles.admin && admin}
          {user?.role === Roles.provider && provider}
          {user?.role === Roles.customer && customer}
        </div>
      </main>
    </SidebarProvider>
  );
}