import { statsService } from '@/modules/services/stats.service';
import { userServices } from '@/modules/services/user.service';
import ProviderStatsDashboard from '@/myComponents/dashboard/provider-dash/Stats';
import React from 'react'

export default async function Statistic() {
    const user = await userServices.getSessionUser()
  const providerStats = await statsService.getProviderStats(user?.email);

  return (
    <div>
      {providerStats && (
        <ProviderStatsDashboard 
         stats={providerStats}
        />
      )}
    </div>
  )
}
