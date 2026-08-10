import { providerServices } from '@/modules/services/provider.services'
import { userServices } from '@/modules/services/user.service'
import KitchenRoomProfile from '@/myComponents/dashboard/provider-dash/ProviderProfile'
import React from 'react'

export default async function page() {

  const {email} = await userServices.getSessionUser()
  
  const provider = await providerServices.getProvidersByemail(email)
// console.log(provider);
  return (
    <div>
      <KitchenRoomProfile 
       data={provider}
      />
    </div>
  )
}
