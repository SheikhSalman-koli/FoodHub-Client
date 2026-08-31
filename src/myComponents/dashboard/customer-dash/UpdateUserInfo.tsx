'use client'

import { CustomAlert } from '@/lib/helpers/Shei-Shad-Alert'
import { Check, Edit3, Loader2 } from 'lucide-react'
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { updateProfileInfo } from '@/modules/actions/user.action'

interface EditInfoProps {
    id: string;
    name: string;
    phone?: string;
    deliveryAddress: string
    isEditModalOpen?: boolean
    setIsEditModalOpen: (open: boolean) => void
}

export default function UpdateUserInfo({
    id,
    name,
    phone,
    deliveryAddress,
    isEditModalOpen = true,
    setIsEditModalOpen,
}: EditInfoProps) {

    const [isLoading, setIsLoading] = useState(false)

    const [formData, setFormData] = useState({
        name: name,
        phone: phone,
        deliveryAddress: deliveryAddress,
    })

    const handleProfileSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            const res = await updateProfileInfo(id, formData);

            if (res?.success) {
                CustomAlert.success('ইউজারের প্রোফাইল সফলভাবে আপডেট হয়েছে!')
            } else {
                CustomAlert.error(res.message)
            }

            setIsEditModalOpen(false)

        } catch (error) {
            CustomAlert.error('Failed to update profile details.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
            <DialogContent className="bg-[#14161d] border-zinc-800 text-zinc-100 sm:max-w-lg p-6 space-y-5 shadow-2xl">
                <DialogHeader className="border-b border-zinc-800 pb-4">
                    <DialogTitle className="text-lg font-bold text-zinc-100 flex items-center gap-2">
                        <Edit3 size={18} className="text-amber-500" />
                        Edit Profile Information
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleProfileSubmit} className="space-y-4">
                    {/* Name */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-medium text-zinc-400">
                            Full Name
                        </label>
                        <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) =>
                                setFormData({ ...formData, name: e.target.value })
                            }
                            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-zinc-100 focus:outline-none focus:border-amber-500/80 transition-colors"
                        />
                    </div>

                    {/* Phone */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-medium text-zinc-400">
                            Phone Number
                        </label>
                        <input
                            type="text"
                            value={formData.phone}
                            onChange={(e) =>
                                setFormData({ ...formData, phone: e.target.value })
                            }
                            placeholder="01700000000"
                            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-amber-500/80 transition-colors"
                        />
                    </div>

                    {/* Delivery Address */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-medium text-zinc-400">
                            Delivery Address
                        </label>
                        <textarea
                            rows={3}
                            value={formData.deliveryAddress}
                            onChange={(e) =>
                                setFormData({ ...formData, deliveryAddress: e.target.value })
                            }
                            placeholder="House, Road, Area details..."
                            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-amber-500/80 transition-colors resize-none"
                        />
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-2">
                        <button
                            type="button"
                            onClick={() => setIsEditModalOpen(false)}
                            className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 text-xs sm:text-sm font-medium rounded-xl transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            disabled={isLoading}
                            type="submit"
                            className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-black text-xs sm:text-sm font-semibold rounded-xl transition-colors flex items-center gap-1.5 shadow-md"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 size={14} className="animate-spin" /> আপডেট হচ্ছে...
                                </>
                            ) : (
                                <>
                                    <Check size={14} /> তথ্য আপডেট করুন
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}