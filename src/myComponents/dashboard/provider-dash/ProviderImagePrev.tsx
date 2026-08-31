'use client'

import React, { useRef, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  ImageIcon,
  Loader2,
  Save,
  UploadCloud,
  X,
} from 'lucide-react'
import { compressImage } from '@/lib/helpers/compressImage'
import { uploadToCloudinary } from '@/lib/helpers/uploadImage'
import { updateProviderAction } from '@/modules/actions/provider.actions'
import { getPublicIdFromUrl } from '@/lib/helpers/GetPublicIdFromUrl'
import { CustomAlert } from '@/lib/helpers/Shei-Shad-Alert'

interface PropsData {
  id: string;
  isLogoModalOpen: boolean
  setIsLogoModalOpen: (open: boolean) => void
  logoUrl: string
  setLogoUrl: (url: string) => void
  onUpdateLogo?: (newLogoUrl: string, file?: File | null) => Promise<void>
  loading: boolean
  setLoading: (loading: boolean) => void
}

export default function ProviderImagePrev({
  id,
  isLogoModalOpen,
  setIsLogoModalOpen,
  logoUrl,
  setLogoUrl,
  loading,
  setLoading,
}: PropsData) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      const previewUrl = URL.createObjectURL(file)
      setLogoUrl(previewUrl)
    }
  }

  // সাবমিট হ্যান্ডলার
  const handleLogoSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {

      if (selectedFile) {
        const compressedImage = await compressImage(selectedFile)
        const newUploadedUrl = await uploadToCloudinary(compressedImage)

        if (!newUploadedUrl) {
          CustomAlert.error("ছবি আপলোড করতে সমস্যা হয়েছে!");
          return;
        }

        if (logoUrl && logoUrl.includes("cloudinary")) {
          const publicId = getPublicIdFromUrl(logoUrl);
          if (publicId) {
            fetch("/api/cloudinary/delete", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ publicId }),
            }).catch((err) => console.error("Old image deletion failed:", err));
          }
        }

        const res = await updateProviderAction(id, { logo: newUploadedUrl })

        if (res.success) {
          CustomAlert.errorToast("লোগো সফলভাবে আপডেট হয়েছে!")
        } else {
          CustomAlert.error(res.message);
        }

      }
      setIsLogoModalOpen(false)
      setSelectedFile(null)
    } catch (error) {
      console.error('Logo update error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleRemoveImage = () => {
    setLogoUrl('')
    setSelectedFile(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  return (
    <Dialog open={isLogoModalOpen} onOpenChange={setIsLogoModalOpen}>
      <DialogContent className="bg-[#0F1015] border-[#232630] text-slate-100 max-w-md rounded-3xl p-6 shadow-2xl overflow-hidden">

        {/* মডাল হেডার */}
        <DialogHeader className="border-b border-[#232630] pb-4">
          <DialogTitle className="text-lg font-bold text-white flex items-center gap-2.5">
            <div className="p-2 bg-amber-500/10 text-amber-400 rounded-xl border border-amber-500/20">
              <ImageIcon size={18} />
            </div>
            ছবি পরিবর্তন করুন
          </DialogTitle>
          <DialogDescription className="text-xs text-slate-400">
            নতুন ছবি আপলোড করুন অথবা সরাসরি ইমেজের URL দিন
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleLogoSubmit} className="space-y-4 pt-2">

          {/* IMAGE PREVIEW */}
          <div className="relative w-full h-52 sm:h-60 rounded-2xl overflow-hidden border-2 border-[#2B2F3D] bg-[#14161D] group shadow-inner flex items-center justify-center">
            {logoUrl ? (
              <>
                <img
                  src={logoUrl}
                  alt="Full Preview"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute top-3 right-3 p-1.5 bg-black/70 hover:bg-rose-600 text-slate-300 hover:text-white rounded-xl transition-all"
                  title="ছবি মুছুন"
                >
                  <X size={16} />
                </button>
              </>
            ) : (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="flex flex-col items-center justify-center text-slate-500 gap-2 cursor-pointer w-full h-full hover:bg-white/5 transition-colors p-6 text-center"
              >
                <div className="p-4 bg-amber-500/10 text-amber-500 rounded-2xl border border-amber-500/20">
                  <UploadCloud size={32} />
                </div>
                <p className="text-xs font-semibold text-slate-300 mt-1">
                  ছবি আপলোড করতে ক্লিক করুন
                </p>
                <p className="text-[10px] text-slate-500">PNG, JPG, WEBP (Max 5MB)</p>
              </div>
            )}
          </div>

          {/* হিডেন ফাইল ইনপুট */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />

          {/* ডিভাইস ফাইল আপলোড বাটন */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="w-full bg-[#14161D] border border-dashed border-[#2B2F3D] hover:border-amber-500/50 rounded-xl py-3 text-xs text-slate-300 font-semibold flex items-center justify-center gap-2 transition-all hover:bg-white/5"
          >
            <UploadCloud size={16} className="text-amber-500" />
            {selectedFile ? selectedFile.name : 'ডিভাইস থেকে ফাইল সিলেক্ট করুন'}
          </button>


          <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#232630]">
            <button
              type="button"
              onClick={() => setIsLogoModalOpen(false)}
              className="px-4 py-2.5 bg-[#14161D] hover:bg-white/10 text-slate-300 rounded-xl text-xs font-semibold transition-colors"
            >
              বাতিল
            </button>
            <button
              type="submit"
              disabled={loading || !logoUrl}
              className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-black font-bold rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-amber-500/20 disabled:opacity-50 transition-all"
            >
              {loading ? (
                <Loader2 size={15} className="animate-spin" />
              ) : (
                <Save size={15} />
              )}
              আপডেট করুন
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}