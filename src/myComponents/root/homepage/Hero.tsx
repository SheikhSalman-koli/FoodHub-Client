import Link from 'next/link';
import React from 'react';

export default function Hero() {
    return (
        <section className="relative w-full min-h-screen flex items-center justify-center bg-[#0d0d0d] text-white px-6 sm:px-8 lg:px-16 overflow-hidden pt-16 lg:pt-24">

            {/* Premium Dark Subtle Overlay & Textures */}
            <div className="absolute inset-0 bg-radial from-transparent via-[#0d0d0d]/80 to-[#0d0d0d] z-10" />

            {/* Huge, Crisp Background Food Image Asset */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 animate-[pulse_8s_ease-in-out_infinite]"
                style={{
                    backgroundImage: `linear-gradient(to right, rgba(13,13,13,0.95) 30%, rgba(13,13,13,0.4) 100%), url('https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1920&auto=format&fit=crop')`
                }}
            />

            {/* Elegant Left/Right Vertical Lines (Kudil Style Architecture) */}
            <div className="absolute inset-y-0 left-12 w-px bg-white/5 hidden lg:block z-0" />
            <div className="absolute inset-y-0 right-12 w-px bg-white/5 hidden lg:block z-0" />

            <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-20">

                {/* Left Layout Container: Premium Content Stack */}
                <div className="lg:col-span-7 flex flex-col justify-center space-y-8 text-center lg:text-left">

                    <div className="flex items-center justify-center lg:justify-start gap-3">
                        <span className="w-12 h-px bg-amber-500 hidden lg:block"></span>
                        <span className="tracking-widest uppercase text-xs font-black text-amber-500 font-sans">
                            শত শত ফুড প্রোভাইডার, একটি প্ল্যাটফর্ম
                        </span>
                    </div>

                    {/* Main Display Typography */}
                    <h1 className="text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight text-white leading-[1.15] font-sans">
                        সেরা স্বাদের খোঁজে? <br />
                        সব খাবার এখন <span className="font-extrabold text-transparent bg-clip-text bg-linear-to-r from-amber-400 via-orange-400 to-amber-500">
                            <br/>
                            সেই-স্বাদ-এ!
                        </span>
                    </h1>

                    <div className="w-20 h-0.75 bg-amber-500 mx-auto lg:mx-0 rounded-full" />

                    <p className="text-gray-300 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed font-light">
                        আপনার পছন্দের রেস্টুরেন্টের মেনু ব্রাউজ করুন, সহজেই অর্ডার প্লেস করুন এবং রিয়েল-টাইমে ট্র্যাক করুন আপনার ডেলিভারি স্ট্যাটাস। খাঁটি স্বাদ চলে আসবে সরাসরি আপনার দরজায়।
                    </p>

                    {/* Action Module: Interactive Button Row */}
                    <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                        <Link href='/meals' className="w-full sm:w-auto bg-amber-500 hover:bg-amber-400 text-[#0d0d0d] font-bold tracking-wider text-sm uppercase px-10 py-4.5 transition-all duration-300 cursor-pointer shadow-lg shadow-amber-500/10 hover:shadow-amber-500/20 active:scale-98">
                            খাবার খুঁজুন
                        </Link>
                        <Link href='/' className="w-full sm:w-auto bg-transparent hover:bg-white/5 text-white border border-white/20 hover:border-white/40 font-bold tracking-wider text-sm uppercase px-10 py-4.5 transition-all duration-300 cursor-pointer active:scale-98">
                            রেস্টুরেন্ট খুঁজুন
                        </Link>
                    </div>

                </div>

                {/* Right Layout Container: Elegant Floating Elements */}
                <div className="lg:col-span-5 hidden lg:flex justify-end relative min-h-125">

                    {/* Fine-Dining Signature Circular Frame */}
                    <div className="relative w-105 h-105 flex items-center justify-center border border-white/10 rounded-full p-6 backdrop-blur-xs">
                        <div className="absolute inset-0 border border-dashed border-amber-500/20 rounded-full scale-95" />

                        {/* Inner Gold Floating Card Asset */}
                        <div className="absolute -top-4 -left-4 bg-[#141414] border border-amber-500/30 p-6 shadow-2xl flex flex-col items-center justify-center text-center transform hover:-translate-y-1 transition-transform duration-300">
                            <span className="text-amber-500 font-serif text-3xl font-black">🍲</span>
                            <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mt-1">হাজারো মেনু অপশন</p>
                        </div>

                        {/* Premium Centerpiece Visual Plate Wrapper */}
                        <div
                            className="w-full h-full rounded-full bg-cover bg-center border-4 border-[#141414] shadow-2xl transition-transform duration-700 hover:rotate-12 cursor-pointer"
                            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?q=80&w=800&auto=format&fit=crop')` }}
                        />

                        {/* Operating Badge Segment */}
                        <div className="absolute -bottom-6 right-6 bg-linear-to-b from-amber-500 to-amber-600 text-[#0d0d0d] py-3 px-6 rounded-full font-black text-xs tracking-wider uppercase shadow-xl">
                            ⏱️ লাইভ অর্ডার ট্র্যাকিং
                        </div>
                    </div>

                </div>

            </div>

            {/* Bottom Floating Scroll Anchor */}
            <div className='hidden lg:block'>
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center gap-2 opacity-50 hover:opacity-100 transition-opacity cursor-pointer">
                <span className="text-[10px] tracking-widest uppercase font-bold text-gray-400">Scroll Down</span>
                <div className="w-px h-10 bg-linear-to-b from-amber-500 to-transparent" />
            </div>
            </div>
        </section>
    );
}