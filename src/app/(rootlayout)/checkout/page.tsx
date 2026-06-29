'use client'

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/useCartStore";
import { createOrderAction } from "@/modules/actions/order.actions";
import { authClient } from "@/lib/auth-client";

interface CustomUser {
  deliveryAddress?: string;
  phone: string
}

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, clearCart } = useCartStore();

  const { data: session } = authClient.useSession();
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  // for default address and phone
  const isInitialized = useRef(false);
  useEffect(() => {
    const customUser = session?.user as CustomUser | undefined;
    const address = customUser?.deliveryAddress;
    const phone = customUser?.phone;

   if ((address || phone) && !isInitialized.current) {
        isInitialized.current = true; 

        setTimeout(() => {
            if (address) setAddress(address);
            if (phone) setPhone(phone);
        }, 0); 
    }
  }, [session]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // deliveryFee based on location
  const trimmedAddress = address.trim();
  const isInsideDhaka =
    trimmedAddress.toLowerCase().includes("dhaka") ||
    trimmedAddress.includes("ঢাকা");
  const deliveryFee = trimmedAddress ? (isInsideDhaka ? 80 : 120) : 0;
  // subtotal
  const subtotal = cart.reduce((sum, item) => {
    const price = Number(item.price) || 0;
    return sum + (price * item.quantity);
  }, 0);

  const totalAmount = subtotal + deliveryFee;

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (cart.length === 0) {
      setError("আপনার কার্টটি খালি! অর্ডার করার জন্য কিছু খাবার যোগ করুন।");
      return;
    }

    if (!phone || !address) {
      setError("দয়া করে আপনার কন্টাক্ট নাম্বার এবং বিস্তারিত ঠিকানা লিখুন।");
      return;
    }

    setLoading(true);
    setError("");

    // Bridge (Server Action)-এ পে-লোড পাঠানো
    const response = await createOrderAction({
      providerId: cart[0]?.providerId,
      deliveryAddress: address,
      contactNumber: phone,
      deliveryFee: deliveryFee,
      orderItems: cart.map(item => ({
        mealId: item.id,
        name: item.name,
        price: Number(item.price),
        quantity: item.quantity,
        discount: item.discount || 0
      }))
    });

    setLoading(false);

    if (response.success) {
      clearCart();

      router.push('/order/success')

    } else {
      setError(response.error || "অর্ডার প্লেস করতে সমস্যা হয়েছে।");
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white p-6 md:p-12 ">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 pt-20">

        {/* বাম পাশ: শিপিং ফর্ম */}
        <div className="bg-[#141414] border border-white/5 p-6 rounded-3xl h-fit">
          <h2 className="text-xl font-black mb-6">শিপিং ও ডেলিভারি</h2>
          {error && <p className="text-red-500 bg-red-500/10 border border-red-500/20 p-3 rounded-xl text-sm mb-4">{error}</p>}

          <form onSubmit={handlePlaceOrder} className="space-y-4">
            <div>
              <label className="text-xs text-gray-400 block mb-2">কন্টাক্ট নাম্বার</label>
              <input
                type="text"
                placeholder="+8801XXXXXXXXX"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-[#1c1c1c] border border-white/5 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="text-xs text-gray-400 block mb-2">ডেলিভারি ঠিকানা</label>
              <textarea
                placeholder="আপনার ঠিকানা লিখুন (যেমন: Purbachal, Dhaka বা মিরপুর, ঢাকা)"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                rows={4}
                className="w-full bg-[#1c1c1c] border border-white/5 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-500 resize-none"
              />
              {trimmedAddress && (
                <p className="text-xs mt-2 font-semibold text-amber-500 bg-amber-500/5 px-3 py-1.5 rounded-lg border border-amber-500/10 w-fit">
                  📍 লোকেশন ডিটেক্টেড: {isInsideDhaka ? "ঢাকার ভেতরে (ডেলিভারি ফি ৳৮০)" : "ঢাকার বাইরে (ডেলিভারি ফি ৳১২০)"}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading || cart.length === 0}
              className="w-full bg-amber-500 hover:bg-amber-600 disabled:bg-white/5 disabled:text-gray-500 text-black font-black py-4 rounded-xl mt-6 transition duration-200"
            >
              {loading ? "অর্ডার প্রসেস হচ্ছে..." : `কনফার্ম অর্ডার (৳${totalAmount})`}
            </button>
          </form>
        </div>

        {/* ডান পাশ: রিয়াল অর্ডার সামারি */}
        <div className="bg-[#141414] border border-white/5 p-6 rounded-3xl h-fit">
          <h2 className="text-xl font-black mb-4">অর্ডার লিস্ট ({cart.length})</h2>

          {cart.length === 0 ? (
            <p className="text-sm text-gray-500 py-6 text-center">আপনার কার্টে কোনো খাবার নেই।</p>
          ) : (
            <div className="divide-y divide-white/5 max-h-75 overflow-y-auto pr-2">
              {cart.map((item) => {
                const itemPrice = Number(item.price) || 0;

                return (
                  <div key={item.id} className="py-3 flex justify-between text-sm items-center">
                    <div>
                      <p className="font-bold">{item.name}</p>
                      <p className="text-xs text-gray-400">
                        ৳{itemPrice} x {item.quantity}
                      </p>
                    </div>
                    <p className="font-bold text-amber-500">৳{itemPrice * item.quantity}</p>
                  </div>
                );
              })}
            </div>
          )}

          <div className="border-t border-white/5 mt-4 pt-4 space-y-2 text-sm text-gray-400">
            <div className="flex justify-between">
              <span>সাবটোটাল:</span>
              <span className="text-white">৳{subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span>ডেলিভারি ফি:</span>
              <span className="text-white">
                {trimmedAddress ? `৳${deliveryFee}` : "৳০ (ঠিকানা লিখুন)"}
              </span>
            </div>
            <div className="flex justify-between font-black text-base text-white pt-2 border-t border-white/5">
              <span>সর্বমোট পরিমাণ:</span>
              <span className="text-amber-500">৳{totalAmount}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}