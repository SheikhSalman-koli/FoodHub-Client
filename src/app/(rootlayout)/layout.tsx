
import Navbar from '@/myComponents/root/homepage/Navbar'
import React from 'react'

export default function rootlayout({children}:{children: React.ReactNode}) {
  return (
    <div>
       <Navbar />
        {children}
    </div>
  )
}
