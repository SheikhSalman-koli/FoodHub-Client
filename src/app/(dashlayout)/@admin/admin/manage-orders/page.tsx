import { orderServices } from '@/modules/services/order.services'
import ViewAllOrders from '@/myComponents/dashboard/admin-dash/ViewAllOrders';
import React from 'react'

export default async function ManageOrders() {

  const AllOrders = await orderServices.getMyOrders()

  // console.log(AllOrders);
  return (
    <div>
       <ViewAllOrders 
         orders={AllOrders}
       />
    </div>
  )
}
