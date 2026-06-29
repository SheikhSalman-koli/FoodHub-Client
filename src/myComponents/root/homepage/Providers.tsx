import React from 'react';
import Link from 'next/link';
import { Flame } from 'lucide-react';
import { providerServices } from '@/modules/services/provider.services';
import ProviderCard from './cards/ProviderCard';


export default async function Providers() {
 
  const providers = await providerServices.getProviders()

  return (
    <section 
    id='popular-restaurants'
    className="w-full bg-[#0d0d0d] py-20 px-6 sm:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto w-full">
        
        {/* Section Header */}
        <div className="flex justify-between items-center gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Flame className="size-5 text-orange-500" />
              <span className="text-amber-500 font-bold tracking-widest text-xs uppercase">Discover</span>
            </div>
            <h2 className="text-xl sm:text-4xl font-light text-white tracking-tight">
              জনপ্রিয় <span className="font-extrabold">রেস্টুরেন্টসমূহ</span>
            </h2>
          </div>
          <Link 
            href="/providers" 
            className="text-sm font-bold text-gray-400 hover:text-amber-500 transition-colors uppercase border-b border-gray-800 hover:border-amber-500"
          >
            সবগুলো দেখুন &rarr;
          </Link>
        </div>

        {/* Providers Grid */}
        <ProviderCard 
          providers={providers}
        />

      </div>
    </section>
  );
}