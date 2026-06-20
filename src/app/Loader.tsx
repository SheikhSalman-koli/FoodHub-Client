import Image from "next/image";
import patil from "../../public/patil.webp"

export default function FoodLoader() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white">
      {/* Steam */}
      <div className="relative h-16 w-20 mb-10">
        <div className="absolute left-4 bottom-0 h-3 w-3 rounded-full bg-gray-300/60 animate-ping" />
        <div className="absolute left-8 bottom-2 h-3 w-3 rounded-full bg-gray-300/60 animate-ping delay-300" />
        <div className="absolute left-12 bottom-0 h-3 w-3 rounded-full bg-gray-300/60 animate-ping delay-700" />
      </div>

      {/* Logo */}
      <div className="animate-bounce">
        <Image
          src={patil}
          alt="Shei-Shad"
          width={220}
          height={220}
          priority
        />
      </div>

      {/* Fire */}
      <div className="-mt-6 flex gap-1 text-3xl">
        <span className="animate-pulse">🔥</span>
        <span className="animate-pulse delay-150">🔥</span>
        <span className="animate-pulse delay-300">🔥</span>
      </div>

      {/* Text */}
      <div className="mt-6 text-center">
        <h2 className="text-2xl font-bold text-amber-900">
         সেই-স্বাদ
        </h2>

        <p className="mt-2 text-amber-700">
          আপনার অর্ডারটি প্রস্তুত হচ্ছে...
        </p>
      </div>
    </div>
  );
}