import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white flex flex-col items-center justify-center p-6 text-center">
      
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-amber-500/10 blur-3xl rounded-full w-72 h-72 -translate-x-12 -translate-y-12 pointer-events-none"></div>
        
        <h1 className="text-9xl font-black tracking-tighter text-transparent bg-clip-text bg-linear-to-b from-amber-400 to-amber-600 select-none opacity-80">
          404
        </h1>
      </div>

      <div className="max-w-md bg-[#141414] border border-white/5 p-8 rounded-3xl shadow-2xl relative z-10">
        <h2 className="text-2xl font-black mb-3 text-white">
          ভুল রাস্তায় চলে এসেছেন! 🗺️
        </h2>
        
        <p className="text-sm text-gray-400 mb-8 leading-relaxed">
          দুঃখিত, আপনি যে পৃষ্ঠাটি খুঁজছেন তা হয়তো মুছে ফেলা হয়েছে, নাম পরিবর্তন করা হয়েছে অথবা এই রেসিপিটি আমাদের মেন্যুতে সাময়িকভাবে নেই।
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-block bg-amber-500 hover:bg-amber-400 text-[#0d0d0d] text-xs uppercase font-black tracking-wider px-6 py-4 rounded-xl transition-all duration-300 shadow-md shadow-amber-500/5 active:scale-98 text-center"
          >
            হোম পেজে ফিরুন 🏠
          </Link>
          
          <Link
            href="/meals" 
            className="inline-block bg-[#1c1c1c] hover:bg-white/5 border border-white/5 text-white text-xs uppercase font-black tracking-wider px-6 py-4 rounded-xl transition-all duration-300 active:scale-98 text-center"
          >
            মেন্যু দেখুন 🍔
          </Link>
        </div>
      </div>

      <p className="text-xl text-gray-600 mt-8 font-mono tracking-widest uppercase">
        সেই-স্বাদ
      </p>
    </div>
  );
}