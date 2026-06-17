import Link from 'next/link'
import React from 'react'

export default function page() {
  return (
    <div className='flex'>
        <div className='text-center border-2 place-content-center w-full h-screen flex-1'><Link href='/'>A</Link></div>
        <div className='flex flex-col flex-1'>
            <div className='text-center border-2 place-content-center w-full h-full'>
                <p>গহাকহযডা ডকাহড</p>
                </div>
        <div className='text-center border-2 place-content-center w-full h-full'>C</div>
        </div>
    </div>
  )
}
