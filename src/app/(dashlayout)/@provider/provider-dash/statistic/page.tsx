import { statsService } from '@/modules/services/stats.service';
import { userServices } from '@/modules/services/user.service';
import ProviderStatsDashboard from '@/myComponents/dashboard/provider-dash/Stats';
import React from 'react'

export default async function Statistic() {

    const sessionUser = await userServices.getSessionUser()

    if (!sessionUser) {
    return (
      <div className="p-6">
        <h2 className="text-xl font-semibold">Please sign in</h2>
        <p className="text-gray-500">
          You need to be logged in to view your profile.
        </p>
      </div>
    );
  }

  const { email } = sessionUser;


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
