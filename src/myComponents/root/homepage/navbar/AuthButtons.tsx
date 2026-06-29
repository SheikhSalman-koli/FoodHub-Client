"use client"

import { authClient } from '@/lib/auth-client';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

export default function AuthButtons() {

    const auth = [
        { id: 1, title: "রেজিস্ট্রেশন", url: "/signup" },
        { id: 2, title: "লগইন", url: "/signin" },
    ]

    const { data: session } = authClient.useSession();
    const user = session?.user 

    const router = useRouter()

    const handleLogout = () => {
        Swal.fire({
            title: 'লগ-আউট করতে চান?',
            text: "আপনার সেশনটি শেষ হয়ে যাবে।",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'হ্যাঁ, লগ-আউট করুন',
            cancelButtonText: 'বাতিল',
            
            // 🎯 ফিক্স ২: ডেক্সটপ ও মোবাইলের গ্লোবাল সামঞ্জস্যের জন্য ডাইনামিক target বাদ দেওয়া হয়েছে। 
            // এর বদলে সিএসএস ক্লাসে !pointer-events-auto ব্যবহার করা হয়েছে, যা মোবাইল শীটের ফোকাস ট্র্যাপও ভাঙবে, আবার ডেক্সটপেও ক্র্যাশ করবে না।
            background: '#141414',
            color: '#ffffff',
            confirmButtonColor: '#f59e0b',
            cancelButtonColor: '#262626',

            customClass: {
                popup: 'border border-white/5 rounded-3xl !pointer-events-auto',
            }
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await authClient.signOut();

                    // সাকসেস মেসেজ 
                    await Swal.fire({
                        title: 'সফল হয়েছে!',
                        text: 'আপনাকে সফলভাবে লগ-আউট করা হয়েছে।',
                        icon: 'success',
                        background: '#141414',
                        color: '#ffffff',
                        confirmButtonColor: '#f59e0b',
                        customClass: {
                            popup: '!pointer-events-auto',
                        }
                    });

                    router.push('/');
                    router.refresh(); // সেশন স্টেট রিফ্রেশ করার জন্য
                } catch (error) {
                    console.error("Logout error: ", error);
                }
            }
        });
    }


    return (
        <div className='pb-8 md:pb-0'>
            {
                user ?
                    <button
                        onClick={handleLogout}
                        className="bg-amber-500 w-full hover:bg-amber-400 text-[#0d0d0d] text-base uppercase font-black tracking-wider px-4 py-2 transition-all duration-300 shadow-md shadow-amber-500/5 active:scale-98 sm:w-full text-center"
                    >
                        লগ-আউট
                    </button>
                    :
                    <div className='flex flex-col md:flex-row gap-2 w-full md:w-auto'>
                        {
                            auth.map(item => (
                                <Link
                                    key={item.id}
                                    href={item.url}
                                    className="bg-amber-500 hover:bg-amber-400 text-[#0d0d0d] text-base uppercase font-black tracking-wider px-4 py-2 transition-all duration-300 shadow-md shadow-amber-500/5 active:scale-98 sm:w-full text-center block"
                                >
                                    {item.title}
                                </Link>
                            ))
                        }
                    </div>
            }
        </div>
    )
}
