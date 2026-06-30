import { ProviderData } from '@/modules/services/provider.services'
import { MapPin, Store } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

type ProviderCardProps = {
  providers: ProviderData[]
}

export default function ProviderCard({ providers }: ProviderCardProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
      {providers.map((provider) => {

        const providerLogo = (provider?.logo && provider.logo !== "null")
          ? provider.logo
          : "https://i.ibb.co.com/fVyR9Dk6/shourav-sheikh-j9low-Ncnl04-unsplash.jpg";

        return (
          <Link
            key={provider.id}
            href={`/provider/${provider?.id}`}
            className="group block bg-[#141414] border border-white/5 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:border-amber-500/30 hover:shadow-2xl hover:shadow-amber-500/10 cursor-pointer relative"
          >
            {/* Image Container */}
            <div className="relative w-full h-48 overflow-hidden bg-gray-900">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${providerLogo})` }}
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#141414] via-transparent to-transparent opacity-80" />

              {/* Top Badge: Store Type */}
              <div className="absolute top-4 left-4">
                <span className="bg-[#0d0d0d]/80 backdrop-blur-md text-gray-300 border border-white/10 text-[10px] font-black px-2.5 py-1.5 rounded-md uppercase tracking-wider shadow-lg flex items-center gap-1.5">
                  <Store className="size-3 text-amber-500" />
                  রেস্টুরেন্ট
                </span>
              </div>
            </div>

            {/* Content Container */}
            <div className="p-5">
              {/* Title and Tagline */}
              <div className="mb-4">
                <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-1">
                  {provider.restaurantName}
                </h3>
                <p className="text-sm text-gray-400 font-medium mt-1.5 line-clamp-1 italic">
                  {provider.tagline}
                </p>
              </div>

              {/* Footer details (Location replacing Delivery Time/Fee) */}
              <div className="pt-4 border-t border-white/5 flex items-center text-sm">
                <div className="flex items-center gap-2 text-gray-300 w-full">
                  <MapPin className="size-4 text-amber-500 shrink-0" />
                  <span className="font-medium truncate">
                    {provider.location}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
