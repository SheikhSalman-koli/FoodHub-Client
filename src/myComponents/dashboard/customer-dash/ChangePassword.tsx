'use client'

import React, { useState } from 'react'
import { Lock, Eye, EyeOff, Check } from 'lucide-react'
import { CustomAlert } from '@/lib/helpers/Shei-Shad-Alert'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { changePassword } from '@/modules/actions/user.action'

interface ChangePasswordDialogProps {
    id: string;
    isChangingPassword: boolean
    setIsChangingPassword: (open: boolean) => void
}

export default function ChangePasswordDialog({
    id,
    isChangingPassword,
    setIsChangingPassword,
}: ChangePasswordDialogProps) {
    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    })

    // Show / Hide password toggles
    const [showCurrentPassword, setShowCurrentPassword] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        // Validation

        if (formData.currentPassword === formData.newPassword) {
            CustomAlert.errorToast("নতুন পাসওয়ার্ডটি বর্তমান পাসওয়ার্ড থেকে ভিন্ন হতে হবে!")
            return
        }

        if (formData.newPassword !== formData.confirmPassword) {
              CustomAlert.errorToast("নতুন পাসওয়ার্ড দুটি মিলছে না!")
            return
        }

        if (formData.newPassword.length < 8) {
              CustomAlert.errorToast("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে!")
            return
        }

        setIsLoading(true)

        try {
            const res = await changePassword(id, formData)
            if(res.success){
                CustomAlert.success('পাসওয়ার্ড সফলভাবে পরিবর্তন করা হয়েছে!')
            }else{
                 CustomAlert.error(res.message)
            }
            setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' })
            setIsChangingPassword(false)
        } catch (error) {
            CustomAlert.error('পাসওয়ার্ড পরিবর্তন করতে ব্যর্থ হয়েছে।')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Dialog open={isChangingPassword} onOpenChange={setIsChangingPassword}>
            <DialogContent className="bg-[#14161d] border-zinc-800 text-zinc-100 sm:max-w-md p-6 space-y-4 shadow-2xl rounded-2xl">
                <DialogHeader className="border-b border-zinc-800 pb-4">
                    <DialogTitle className="text-lg font-bold text-zinc-100 flex items-center gap-2">
                        <Lock size={18} className="text-amber-500" />
                        পাসওয়ার্ড পরিবর্তন করুন
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4 pt-1">
                    {/* Current Password */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-medium text-zinc-400">
                            বর্তমান পাসওয়ার্ড
                        </label>
                        <div className="relative">
                            <input
                                type={showCurrentPassword ? 'text' : 'password'}
                                required
                                value={formData.currentPassword}
                                onChange={(e) =>
                                    setFormData({ ...formData, currentPassword: e.target.value })
                                }
                                placeholder="••••••••"
                                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-amber-500/80 transition-colors pr-10"
                            />
                            <button
                                type="button"
                                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 p-1"
                            >
                                {showCurrentPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>
                    </div>

                    {/* New Password */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-medium text-zinc-400">
                            নতুন পাসওয়ার্ড
                        </label>
                        <div className="relative">
                            <input
                                type={showNewPassword ? 'text' : 'password'}
                                required
                                value={formData.newPassword}
                                onChange={(e) =>
                                    setFormData({ ...formData, newPassword: e.target.value })
                                }
                                placeholder="••••••••"
                                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-amber-500/80 transition-colors pr-10"
                            />
                            <button
                                type="button"
                                onClick={() => setShowNewPassword(!showNewPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 p-1"
                            >
                                {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>
                    </div>

                    {/* Confirm New Password */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-medium text-zinc-400">
                            নতুন পাসওয়ার্ড পুনরায় লিখুন
                        </label>
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? 'text' : 'password'}
                                required
                                value={formData.confirmPassword}
                                onChange={(e) =>
                                    setFormData({ ...formData, confirmPassword: e.target.value })
                                }
                                placeholder="••••••••"
                                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-amber-500/80 transition-colors pr-10"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 p-1"
                            >
                                {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>
                    </div>

                    
                    <div className="flex items-center justify-end gap-3 pt-3">
                        <button
                            type="button"
                            onClick={() => setIsChangingPassword(false)}
                            className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 text-xs sm:text-sm font-medium rounded-xl transition-colors"
                        >
                            বাতিল
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-black text-xs sm:text-sm font-semibold rounded-xl transition-colors flex items-center gap-1.5 shadow-md disabled:opacity-50"
                        >
                            <Check size={16} />
                            <span>{isLoading ? 'পরিবর্তন হচ্ছে...' : 'পাসওয়ার্ড পরিবর্তন করুন'}</span>
                        </button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}