import { orderServices } from '@/modules/services/order.services'
import OrderDetails from '@/myComponents/dashboard/customer-dash/OrderDetails'
import React from 'react'

export default async function page({params}: {params: Promise<{id: string}>}) {
    const {id} = await params
   const order = await orderServices.getsingleOrder(id)

//    console.log(order);
  return (
    <div>
        <OrderDetails 
        order={order}
        />
    </div>
  )
}
