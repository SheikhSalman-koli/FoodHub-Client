

import Image from "next/image";
import patil from "../../../public/patil.png";

export default function FoodLoader() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-zinc-950 text-zinc-100">
      {/* Ambient background glow */}
      <div className="absolute size-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Steam */}
      <div className="relative h-12 w-20 mb-4">
        <div className="absolute left-4 bottom-0 h-3 w-3 rounded-full bg-amber-400/50 animate-ping" />
        <div className="absolute left-9 bottom-2 h-3 w-3 rounded-full bg-white/40 animate-ping delay-300" />
        <div className="absolute left-14 bottom-0 h-3 w-3 rounded-full bg-amber-400/50 animate-ping delay-700" />
      </div>

      {/* Logo / Pan */}
      <div className="relative animate-bounce drop-shadow-[0_15px_30px_rgba(245,158,11,0.25)]">
        <Image
          src={patil}
          alt="Shei-Shad"
          width={260}
          height={260}
          priority
          className="object-contain"
        />
      </div>

      {/* Fire */}
      <div className="-mt-4 flex gap-1.5 text-3xl filter drop-shadow-[0_0_12px_rgba(245,158,11,0.6)]">
        <span className="animate-pulse">🔥</span>
        <span className="animate-pulse delay-150">🔥</span>
        <span className="animate-pulse delay-300">🔥</span>
      </div>

      {/* Text */}
      <div className="mt-6 text-center z-10 space-y-1">
        <h2 className="text-2xl font-extrabold text-amber-400 tracking-wide">
          সেই-স্বাদ
        </h2>
        <p className="text-xs sm:text-sm text-zinc-400 font-medium">
          আপনার জন্যই রান্না হচ্ছে...
        </p>
      </div>
    </div>
  );
}