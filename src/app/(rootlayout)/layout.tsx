
import Navbar from '@/myComponents/root/homepage/Navbar'
import React from 'react'

export default function rootlayout({children}:{children: React.ReactNode}) {
  return (
    // suppressHydrationWarning
    <div className='bg-[#0d0d0d]'> 
       <Navbar />
        {children}
    </div>
  )
}
