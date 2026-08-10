import { statsService } from '@/modules/services/stats.service';
import { userServices } from '@/modules/services/user.service';
import ProviderStatsDashboard from '@/myComponents/dashboard/provider-dash/Stats';
import React from 'react'

export default async function Statistic() {
    const {email} = await userServices.getSessionUser()
  const providerStats = await statsService.getProviderStats(email);

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
