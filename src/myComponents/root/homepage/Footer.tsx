'use client'

import Link from 'next/link'
import {
    Mail,
    Phone,
    MapPin,
    ArrowUpRight,
    Utensils,
} from 'lucide-react'
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa'
import { startTransition, useEffect, useState } from 'react'
import { CategoryData } from '@/modules/services/category.services'
import { getAllCategories } from '@/modules/actions/category.actions'
import InfoDialog, { InfoModalType } from './footer/FooterDialog'

export default function Footer() {

    const [categories, setCategories] = useState<CategoryData[]>([])
    const [modalType, setModalType] = useState<InfoModalType>(null)

    useEffect(() => {
        startTransition(async () => {
            try {
                // for only available categories
                const res = await getAllCategories()
                if (res?.success) {
                    setCategories(res.data)
                }
            } catch (error) {
                console.error('Category fetch error:', error)
            }
        })
    }, [])

    const displayedCategories = categories.slice(0, 5)

    return (
        <footer className="w-full bg-[#0a0a0c] border-t border-zinc-800/80 text-zinc-400 pt-16 pb-8 px-6 sm:px-12 lg:px-24 relative overflow-hidden">
            {/* Background Subtle Glow Effect */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-125 h-50 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-7xl mx-auto space-y-12 relative z-10">
                {/* Main Footer Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-dashed border-zinc-800/80">

                    <div className="lg:col-span-2 space-y-4">
                        <Link href="/" className="flex items-center gap-2 group">
                            <Utensils className="size-6 text-amber-500" />
                            <span className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                                সেই-<span className="text-transparent bg-clip-text bg-linear-to-r from-amber-400 to-orange-500">স্বাদ</span>
                            </span>
                            <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 animate-pulse" />
                        </Link>

                        <p className="text-xs sm:text-sm text-zinc-400 max-w-sm leading-relaxed">
                            আপনার শহরের সেরা ও সুস্বাদু খাবার একদম দ্রুততম সময়ে পৌঁছে দিচ্ছি আপনার দোরগোড়ায়। তাজা ও মানসম্মত খাবারের অভিজ্ঞতা পেতে আমাদের সাথেই থাকুন।
                        </p>

                        {/* Social Icons */}
                        <div className="flex items-center gap-3 pt-2">
                            {[
                                { icon: FaFacebookF, href: '#' },
                                { icon: FaInstagram, href: '#' },
                                { icon: FaTwitter, href: '#' },
                            ].map((social, idx) => (
                                <a
                                    key={idx}
                                    href={social.href}
                                    className="p-2.5 bg-zinc-900 hover:bg-amber-500/10 border border-zinc-800 hover:border-amber-500/30 text-zinc-400 hover:text-amber-500 rounded-xl transition-all active:scale-95"
                                >
                                    <social.icon size={16} />
                                </a>

                            ))}
                        </div>
                    </div>

                    {/* Col 2: Quick Links */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-bold text-zinc-100 uppercase tracking-wider">
                            প্রয়োজনীয় লিঙ্ক
                        </h3>
                        <ul className="space-y-2.5 text-xs sm:text-sm">
                            {[
                                { label: 'জনপ্রিয় রেস্টুরেন্ট', href: '/#popular-restaurants' },
                                { label: 'জনপ্রিয় খাবার', href: '/#popular-meals' },
                                { label: 'মেন্যু', href: '/meals' },
                                { label: 'আমাদের সম্পর্কে', onClick: () => setModalType('about') },
                                { label: 'যোগাযোগ', onClick: () => setModalType('contact') },
                            ].map((item, idx) => (
                                <li key={idx}>
                                    {item.href ? (
                                        <Link
                                            href={item.href}
                                            className="hover:text-amber-400 transition-colors flex items-center gap-1 group text-zinc-400 hover:text-amber-400"
                                        >
                                            <span>{item.label}</span>
                                            <ArrowUpRight
                                                size={12}
                                                className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-amber-500"
                                            />
                                        </Link>
                                    ) : (
                                        <button
                                            type="button"
                                            onClick={item.onClick}
                                            className="hover:text-amber-400 transition-colors flex items-center gap-1 group text-zinc-400 hover:text-amber-400 cursor-pointer text-left w-full"
                                        >
                                            <span>{item.label}</span>
                                            <ArrowUpRight
                                                size={12}
                                                className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-amber-500"
                                            />
                                        </button>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Col 3: Popular Categories */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-bold text-zinc-100 uppercase tracking-wider">
                            জনপ্রিয় ক্যাটাগরি
                        </h3>

                        <ul className="space-y-2.5 text-xs sm:text-sm">
                            {categories.length > 0 ? (
                                displayedCategories.map((category) => {
                                    // Use slug if available, otherwise fallback to URL-encoded name
                                    const categoryQuery = category.slug || encodeURIComponent(category.name)

                                    return (
                                        <li key={category.id}>
                                            <Link
                                                href={`/meals?category=${categoryQuery}`}
                                                className="hover:text-amber-400 transition-colors block"
                                            >
                                                {category.name}
                                            </Link>
                                        </li>
                                    )
                                })
                            ) : (
                                <p className="text-xs text-zinc-600">ক্যাটাগরি লোড হচ্ছে...</p>
                            )}
                        </ul>
                    </div>

                    {/* Col 4: Newsletter & Contact */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-bold text-zinc-100 uppercase tracking-wider">
                            যোগাযোগ ও আপডেট
                        </h3>

                        <div className="space-y-2 text-xs sm:text-sm">
                            <div className="flex items-center gap-2.5">
                                <MapPin size={15} className="text-amber-500 shrink-0" />
                                <span>ধানমন্ডি, ঢাকা - ১২০৯, বাংলাদেশ</span>
                            </div>
                            <div className="flex items-center gap-2.5">
                                <Phone size={15} className="text-amber-500 shrink-0" />
                                <span>+৮৮০ ১৭০০-০০০০০০</span>
                            </div>
                            <div className="flex items-center gap-2.5">
                                <Mail size={15} className="text-amber-500 shrink-0" />
                                <span>support@foodhub.com</span>
                            </div>
                        </div>

                    </div>

                </div>

                {/* Bottom Bar */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
                    <p>© {new Date().getFullYear()} FoodHub. সর্বস্বত্ব সংরক্ষিত।</p>

                    <div className="flex items-center gap-6">
                        <button
                            onClick={() => setModalType('privacy')}
                            className="hover:text-zinc-300 transition-colors text-xs sm:text-sm text-zinc-500 cursor-pointer"
                        >
                            প্রাইভেসি পলিসি
                        </button>

                        <button
                            onClick={() => setModalType('terms')}
                            className="hover:text-zinc-300 transition-colors text-xs sm:text-sm text-zinc-500 cursor-pointer"
                        >
                            শর্তাবলী
                        </button>

                        <button
                            onClick={() => setModalType('faq')}
                            className="hover:text-zinc-300 transition-colors text-xs sm:text-sm text-zinc-500 cursor-pointer"
                        >
                            প্রশ্নোত্তর
                        </button>
                    </div>

                    {/* Reusable Dialog Component */}
                    <InfoDialog
                        isOpen={!!modalType}
                        onOpenChange={(open) => !open && setModalType(null)}
                        type={modalType}
                    />
                </div>

            </div>
        </footer>
    )
}