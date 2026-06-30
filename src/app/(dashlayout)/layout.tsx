import { AppSidebar } from "@/components/AppSidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Roles } from "@/constants/userRole"
import { userServices } from "@/modules/services/user.service"


export default async function Layout({ 
    admin, provider, customer 
}: { 
    admin: React.ReactNode 
    provider: React.ReactNode 
    customer: React.ReactNode 
}) {

    const user = await userServices.getSessionUser()

    // console.log(user.role);
    
  return (
    <SidebarProvider>
      <AppSidebar role={user?.role} />
      <main>
        <SidebarTrigger />
        {user.role === Roles.admin ? admin : user?.role === Roles.provider ? provider : customer}
      </main>
    </SidebarProvider>
  )
}