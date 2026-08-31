'use client'

import { Flame } from 'lucide-react'
import { ProviderData } from '@/modules/services/provider.services'
import ProviderCard from './cards/ProviderCard'
import { startTransition, useEffect, useState } from 'react'
import { getProvidersAction } from '@/modules/actions/provider.actions'

export default function Providers() {
  const [providers, setProviders] = useState<ProviderData[]>([])
  const [isShowAll, setIsShowAll] = useState(false)

  useEffect(() => {
    startTransition(async () => {
      try {
        const data = await getProvidersAction()
        setProviders(data?.data || [])
      } catch (error) {
        console.error(error)
      }
    })
  }, [])

  const displayedProviders = isShowAll ? providers : providers.slice(0, 3)

  return (
    <section 
      id='popular-restaurants'
      className="w-full bg-[#0d0d0d] py-20 px-6 sm:px-12 lg:px-24"
    >
      <div className="max-w-7xl mx-auto w-full">

        <div className="flex justify-between items-center gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Flame className="size-5 text-orange-500" />
              <span className="text-amber-500 font-bold tracking-widest text-xs uppercase">
                Discover
              </span>
            </div>
            <h2 className="text-xl sm:text-4xl font-light text-white tracking-tight">
              জনপ্রিয় <span className="font-extrabold text-amber-500">রেস্টুরেন্টসমূহ</span>
            </h2>
          </div>
        </div>

        {/* Providers Grid */}
        <ProviderCard 
        providers={displayedProviders} 
        />

        {/* Toggle Button */}
        {providers.length > 3 && (
          <div className="mt-6 flex justify-end items-center">
            <button
              onClick={() => setIsShowAll(!isShowAll)}
              className="text-sm font-bold text-gray-400 hover:text-amber-500 transition-colors uppercase border-b border-gray-800 hover:border-amber-500"
            >
              {isShowAll ? '← কম দেখুন' : 'সবগুলো দেখুন →'}
            </button>
          </div>
        )}
      </div>
    </section>
  )
}