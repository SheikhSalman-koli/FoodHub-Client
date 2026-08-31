
'use client'

import React from 'react'
import {
  ShieldCheck,
  FileText,
  HelpCircle,
  Info,
  Mail,
  Phone,
  MapPin,
  Clock,
} from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

export type InfoModalType =
  | 'privacy'
  | 'terms'
  | 'faq'
  | 'about'
  | 'contact'
  | null

interface InfoDialogProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  type: InfoModalType
}

export default function InfoDialog({
  isOpen,
  onOpenChange,
  type,
}: InfoDialogProps) {
  if (!type) return null

  const getContent = () => {
    switch (type) {
      case 'about':
        return {
          title: 'আমাদের সম্পর্কে',
          icon: <Info className="size-5 text-amber-500" />,
          body: (
            <div className="space-y-4 text-xs sm:text-sm text-zinc-300 leading-relaxed">
              <p>
                <strong className="text-amber-400">FoodHub</strong> হলো বাংলাদেশের একটি দ্রুতবর্ধনশীল ফুড ডেলিভারি প্ল্যাটফর্ম। আমাদের লক্ষ্য হলো আপনার প্রিয় রেস্টুরেন্টের তাজা ও সুস্বাদু খাবার খুব দ্রুত এবং সুরক্ষিতভাবে আপনার দোরগোড়ায় পৌঁছে দেওয়া।
              </p>

              <div className="bg-zinc-900/60 p-3.5 rounded-xl border border-zinc-800 space-y-2">
                <h4 className="font-semibold text-zinc-100">আমাদের লক্ষ্য</h4>
                <p className="text-zinc-400">
                  গ্রাহকদের কাছে মানসম্মত খাবারের সহজলভ্যতা নিশ্চিত করা এবং স্থানীয় রেস্টুরেন্ট ও রাইডারদের একটি শক্তিশালী প্ল্যাটফর্ম প্রদান করা।
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="bg-zinc-900/60 p-3 rounded-xl border border-zinc-800 text-center">
                  <p className="text-lg font-bold text-amber-500">৫০+</p>
                  <p className="text-xs text-zinc-400">পার্টনার রেস্টুরেন্ট</p>
                </div>
                <div className="bg-zinc-900/60 p-3 rounded-xl border border-zinc-800 text-center">
                  <p className="text-lg font-bold text-amber-500">১০,০০০+</p>
                  <p className="text-xs text-zinc-400">সন্তুষ্ট গ্রাহক</p>
                </div>
              </div>
            </div>
          ),
        }

      case 'contact':
        return {
          title: 'যোগাযোগ করুন',
          icon: <Mail className="size-5 text-amber-500" />,
          body: (
            <div className="space-y-3.5 text-xs sm:text-sm text-zinc-300">
              <p className="text-zinc-400">
                আমাদের সেবা সম্পর্কে যেকোনো প্রশ্ন, পরামর্শ বা অভিযোগ জানাতে নিচে উল্লেখিত মাধ্যমে আমাদের সাথে সরাসরি যোগাযোগ করতে পারেন:
              </p>

              <div className="space-y-2.5 pt-1">
                <div className="flex items-center gap-3 bg-zinc-900/60 p-3 rounded-xl border border-zinc-800">
                  <MapPin className="size-4 text-amber-500 shrink-0" />
                  <div>
                    <p className="text-xs text-zinc-400">ঠিকানা</p>
                    <p className="font-medium text-zinc-200">লেভেল-৪, জলসিঁড়ি আবাসন, ঢাকা, বাংলাদেশ</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-zinc-900/60 p-3 rounded-xl border border-zinc-800">
                  <Phone className="size-4 text-amber-500 shrink-0" />
                  <div>
                    <p className="text-xs text-zinc-400">হেল্পলাইন</p>
                    <p className="font-medium text-zinc-200">+৮৮০ ১৭০০-০০০০০০</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-zinc-900/60 p-3 rounded-xl border border-zinc-800">
                  <Mail className="size-4 text-amber-500 shrink-0" />
                  <div>
                    <p className="text-xs text-zinc-400">ইমেইল সাপোর্ট</p>
                    <p className="font-medium text-zinc-200">support@foodhub.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-zinc-900/60 p-3 rounded-xl border border-zinc-800">
                  <Clock className="size-4 text-amber-500 shrink-0" />
                  <div>
                    <p className="text-xs text-zinc-400">সার্ভিস সময়</p>
                    <p className="font-medium text-zinc-200">প্রতিদিন সকাল ৮:০০ - রাত ১১:০০</p>
                  </div>
                </div>
              </div>
            </div>
          ),
        }

      case 'privacy':
        return {
          title: 'প্রাইভেসি পলিসি',
          icon: <ShieldCheck className="size-5 text-amber-500" />,
          body: (
            <div className="space-y-4 text-xs sm:text-sm text-zinc-300 leading-relaxed">
              <p>আপনার তথ্যের সুরক্ষা আমাদের কাছে অত্যন্ত গুরুত্বপূর্ণ। FoodHub-এ আপনার ব্যক্তিগত ডাটা কিভাবে সংগৃহীত এবং ব্যবহৃত হয় তা নিচে বর্ণনা করা হলো:</p>
              <div>
                <h4 className="font-semibold text-zinc-100 mb-1">১. তথ্য সংগ্রহ</h4>
                <p className="text-zinc-400">অর্ডার সম্পন্ন করার সুবিধার্থে আমরা আপনার নাম, ফোন নাম্বার, ইমেইল এবং ডেলিভারি ঠিকানা সংগ্রহ করে থাকি।</p>
              </div>
              <div>
                <h4 className="font-semibold text-zinc-100 mb-1">২. তথ্যের ব্যবহার</h4>
                <p className="text-zinc-400">সংগৃহীত তথ্য শুধুমাত্র অর্ডার ডেলিভারি, কাস্টমার সাপোর্ট এবং প্রয়োজনীয় আপডেট জানাতে ব্যবহৃত হয়।</p>
              </div>
            </div>
          ),
        }

      case 'terms':
        return {
          title: 'শর্তাবলী',
          icon: <FileText className="size-5 text-amber-500" />,
          body: (
            <div className="space-y-4 text-xs sm:text-sm text-zinc-300 leading-relaxed">
              <p>FoodHub সার্ভিস ব্যবহার করার পূর্বে আমাদের ব্যবহারের শর্তাবলী মনোযোগ সহকারে পড়ে নিন:</p>
              <div>
                <h4 className="font-semibold text-zinc-100 mb-1">১. অর্ডার ও বাতিল</h4>
                <p className="text-zinc-400">রেস্টুরেন্ট অর্ডার প্রসেস শুরু করার পূর্বে আপনি যেকোনো সময় অর্ডার বাতিল করতে পারবেন।</p>
              </div>
              <div>
                <h4 className="font-semibold text-zinc-100 mb-1">২. ডেলিভারি সময়</h4>
                <p className="text-zinc-400">আনুমানিক ডেলিভারির সময় ট্রাফিক এবং আবহাওয়ার ওপর ভিত্তি করে কিছুটা পরিবর্তন হতে পারে।</p>
              </div>
            </div>
          ),
        }

      case 'faq':
        return {
          title: 'সাধারণ জিজ্ঞাসা (FAQ)',
          icon: <HelpCircle className="size-5 text-amber-500" />,
          body: (
            <Accordion type="single" collapsible className="w-full space-y-2.5">
              <AccordionItem value="item-1" className="bg-zinc-900/60 border border-zinc-800 rounded-xl px-4 py-0.5">
                <AccordionTrigger className="text-xs sm:text-sm font-medium text-zinc-200 hover:text-amber-500 hover:no-underline py-3 text-left">
                  কিভাবে অর্ডার করব?
                </AccordionTrigger>
                <AccordionContent className="text-xs sm:text-sm text-zinc-400 pb-3 leading-relaxed border-t border-zinc-800/50 pt-2">
                  পছন্দনীয় রেস্টুরেন্ট বা খাবার সিলেক্ট করুন, কার্টে যোগ করুন এবং আপনার ডেলিভারি অ্যাড্রেস দিয়ে অর্ডার কনফার্ম করুন।
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2" className="bg-zinc-900/60 border border-zinc-800 rounded-xl px-4 py-0.5">
                <AccordionTrigger className="text-xs sm:text-sm font-medium text-zinc-200 hover:text-amber-500 hover:no-underline py-3 text-left">
                  ডেলিভারি চার্জ কত?
                </AccordionTrigger>
                <AccordionContent className="text-xs sm:text-sm text-zinc-400 pb-3 leading-relaxed border-t border-zinc-800/50 pt-2">
                  আপনার লোকেশন এবং রেস্টুরেন্টের দূরত্বের ওপর ভিত্তি করে ডেলিভারি চার্জ নির্ধারণ করা হয়।
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ),
        }
    }
  }

  const activeContent = getContent()

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#14161d] border-zinc-800 text-zinc-100 sm:max-w-lg p-6 shadow-2xl rounded-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader className="border-b border-zinc-800 pb-4">
          <DialogTitle className="text-lg font-bold text-zinc-100 flex items-center gap-2">
            {activeContent.icon}
            <span>{activeContent.title}</span>
          </DialogTitle>
        </DialogHeader>

        <div className="pt-2">{activeContent.body}</div>

        <div className="pt-4 border-t border-zinc-800/80 flex justify-end">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-black font-semibold text-xs rounded-xl transition-colors cursor-pointer"
          >
            ঠিক আছে
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}