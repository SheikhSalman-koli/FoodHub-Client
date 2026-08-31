import { userServices } from '@/modules/services/user.service'
import ProfilePage from '@/myComponents/dashboard/customer-dash/ProfilePage'
import React from 'react'

export default async function page() {

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

  const { id } = sessionUser;

  
  const profile = await userServices.getAUser(id)

  return (
    <div>
      <ProfilePage 
      user={profile}
      />
    </div>
  )
}
