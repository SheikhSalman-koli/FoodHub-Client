import { userServices } from '@/modules/services/user.service';
import ManageUsersTable from '@/myComponents/dashboard/admin-dash/UsersTable';
import React from 'react'

export default async function ManageUsers() {

  const users = await userServices.getAllUsers()
//  console.log('users',users);

  return (
    <div>
      <ManageUsersTable 
       users={users}
      />
    </div>
  )
}
