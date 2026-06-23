'use client'

import { Button } from '@/components/ui/button'
import { authClient } from '@/lib/auth-client'
import { usePathname } from 'next/navigation'
import React from 'react'

export default function SocialLogin() {

    const pathname = usePathname()

    const GoogleSing =async ()=> {
        await authClient.signIn.social({
            provider: "google",
            callbackURL: 'http://localhost:3000'
        })
    }


    return (
        <Button
        onClick={()=> GoogleSing()}
            className="w-full bg-amber-500 hover:bg-amber-400 text-[#0d0d0d] font-bold text-base py-6 rounded-xl shadow-lg shadow-amber-500/10 cursor-pointer mt-2">
            <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path
                    fill="#EA4335"
                    d="M5.266 9.765A7.077 7.077 0 0112 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.33 0 3.323 2.694 1.34 6.623l3.926 3.142z"
                />
                <path
                    fill="#4285F4"
                    d="M23.491 12.273c0-.818-.073-1.609-.209-2.373H12v4.509h6.441a5.503 5.503 0 01-2.386 3.609l3.714 2.882c2.173-2.005 3.722-4.955 3.722-8.627z"
                />
                <path
                    fill="#FBBC05"
                    d="M5.266 14.235L1.34 17.377C3.323 21.306 7.33 24 12 24c3.055 0 5.791-1.014 7.741-2.755l-3.714-2.882a4.437 4.437 0 01-4.027 1.145 4.545 4.545 0 01-3.645-3.136c-.34-.991-.34-2.073 0-3.137z"
                />
                <path
                    fill="#34A853"
                    d="M12 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.33 0 3.323 2.694 1.34 6.623l3.926 3.142A7.055 7.055 0 0112 4.91z"
                />
            </svg>
            <span>
                {pathname === '/signup' ? "গুগল দিয়ে রেজিস্ট্রেশন করুন" : "গুগল দিয়ে লগইন করুন"}
            </span>
        </Button>
    )
}
