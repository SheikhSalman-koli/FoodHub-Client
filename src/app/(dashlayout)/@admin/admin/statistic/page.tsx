

import { statsService } from '@/modules/services/stats.service'
import AdminStatsView from '@/myComponents/dashboard/admin-dash/AdminStats'

export default async function AdminStats() {

  const adminStats = await statsService.getAdminDashboardStats()
  // console.log(adminStats);
  return (
    <div>
      <AdminStatsView 
      stats={adminStats}
      />
    </div>
  )
}
