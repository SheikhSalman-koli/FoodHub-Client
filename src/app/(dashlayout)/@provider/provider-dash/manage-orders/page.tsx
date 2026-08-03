import { orderServices } from '@/modules/services/order.services'
import OrdersTable from '@/myComponents/dashboard/provider-dash/OrderTable';
import React from 'react'

export default async function ManageOrders() {

  const orders = await orderServices.getMyOrders()

  // console.log(res);
  return (
    <div>
      <OrdersTable 
      orders={orders}
      />
    </div>
  )
}
