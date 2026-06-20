import React from 'react';
import Link from 'next/link';
import { MapPin, Flame, Store } from 'lucide-react';

// আপনার ডাটাবেস/API থেকে আসা ডেটা
const providers = [
  {
    id: '143f56d6-cb81-488c-83f6-df79b1e420a7',
    authoremail: 'salmansheikh@gmail.com',
    restaurantName: 'Kacchi Dine',
    tagline: 'The Ultimate Royalty on Your Plate',
    location: 'Dhanmondi, Dhaka',
    logo: 'https://i.ibb.co.com/fVyR9Dk6/shourav-sheikh-j9low-Ncnl04-unsplash.jpg',
    isDeleted: false
  },
  {
    id: '2',
    authoremail: 'contact@cafemilano.com',
    restaurantName: 'Cafe Milano',
    tagline: 'Authentic Italian Taste in Town',
    location: 'Gulshan 2, Dhaka',
    logo: 'https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=800&auto=format&fit=crop',
    isDeleted: false
  },
  {
    id: '3',
    authoremail: 'hello@deshikitchen.bd',
    restaurantName: 'Deshi Kitchen',
    tagline: 'মায়ের হাতের খাঁটি স্বাদ',
    location: 'Mirpur 10, Dhaka',
    logo: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=800&auto=format&fit=crop',
    isDeleted: false
  }
];

export default function Providers() {
  // isDeleted: true থাকলে সেই রেস্টুরেন্টগুলো ইউজারকে দেখাবো না
  const activeProviders = providers.filter(provider => !provider.isDeleted);

  return (
    <section className="w-full bg-[#0d0d0d] py-20 px-6 sm:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto w-full">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row justify-between items-end gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Flame className="size-5 text-orange-500" />
              <span className="text-amber-500 font-bold tracking-widest text-xs uppercase">Discover</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-light text-white tracking-tight">
              জনপ্রিয় <span className="font-extrabold">রেস্টুরেন্টসমূহ</span>
            </h2>
          </div>
          <Link 
            href="/providers" 
            className="text-sm font-bold text-gray-400 hover:text-amber-500 transition-colors uppercase tracking-wider pb-1 border-b border-gray-800 hover:border-amber-500"
          >
            সবগুলো দেখুন &rarr;
          </Link>
        </div>

        {/* Providers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {activeProviders.map((provider) => (
            <Link 
              key={provider.id} 
              href={`/provider/${provider.id}`} 
              className="group block bg-[#141414] border border-white/5 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:border-amber-500/30 hover:shadow-2xl hover:shadow-amber-500/10 cursor-pointer relative"
            >
              {/* Image Container */}
              <div className="relative w-full h-48 overflow-hidden bg-gray-900">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${provider.logo})` }}
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
          ))}
        </div>

      </div>
    </section>
  );
}