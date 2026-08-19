import { userServices } from '@/modules/services/user.service'
import ProfilePage from '@/myComponents/dashboard/customer-dash/ProfilePage'
import React from 'react'

export default async function page() {

  const {id} = await userServices.getSessionUser()

  const profile = await userServices.getAUser(id)

  return (
    <div>
      <ProfilePage 
      user={profile}
      />
    </div>
  )
}
