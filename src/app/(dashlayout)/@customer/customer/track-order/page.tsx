import { orderServices } from '@/modules/services/order.services'
import AllOrders from '@/myComponents/dashboard/customer-dash/AllOrders'

import React from 'react'

export default async function page() {

  const orders = await orderServices.getMyOrders()

  // console.log(orders);

  return (
    <div>
       <AllOrders 
       orders={orders}
       />
    </div>
  )
}
