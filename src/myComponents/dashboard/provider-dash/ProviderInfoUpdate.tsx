'use client'

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { CustomAlert } from '@/lib/helpers/Shei-Shad-Alert';
import { updateProviderAction } from '@/modules/actions/provider.actions';
import { Loader2, Pencil, Save } from 'lucide-react'
import React, { useState } from 'react'
import Swal from 'sweetalert2';

export interface providerUpdatedData {
    id: string;
    restaurantName: string;
    tagline: string;
    location: string
}

interface Props {
    data: providerUpdatedData;
    isInfoModalOpen: boolean
    setIsInfoModalOpen: (open: boolean) => void
    loading: boolean
    setLoading: (loading: boolean) => void
}

export default function ProviderInfoUpdate({
    data,
    isInfoModalOpen,
    setIsInfoModalOpen,
    loading,
    setLoading
}: Props) {

    const [infoForm, setInfoForm] = useState({
        restaurantName: data.restaurantName || "",
        tagline: data.tagline || "",
        location: data.location || "",
    });

    const handleInfoSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {

            const res = await updateProviderAction(data.id, infoForm)
            if (res.success) {
                Swal.fire({
                    icon: "success",
                    title: "তথ্য সফলভাবে আপডেট হয়েছে!",
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 2000,
                });
            } else {
                CustomAlert.error(res.message);
            }
            setIsInfoModalOpen(false);
        } catch (error) {
            console.error("Info update error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={isInfoModalOpen} onOpenChange={setIsInfoModalOpen}>
            <DialogContent className="bg-[#0F1015] border-[#232630] text-slate-100 max-w-lg rounded-3xl p-6 shadow-2xl">
                <DialogHeader className="border-b border-[#232630] pb-4">
                    <DialogTitle className="text-lg font-bold text-white flex items-center gap-2.5">
                        <div className="p-2 bg-amber-500/10 text-amber-400 rounded-xl border border-amber-500/20">
                            <Pencil size={18} />
                        </div>
                        তথ্য আপডেট করুন
                    </DialogTitle>
                    <DialogDescription className="text-xs text-slate-400">
                        আপনার রেস্তোরাঁর প্রাথমিক তথ্য পরিবর্তন করুন
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleInfoSubmit} className="space-y-4 pt-2">
                    <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                            রেস্তোরাঁর নাম <span className="text-amber-500">*</span>
                        </label>
                        <input
                            type="text"
                            required
                            value={infoForm.restaurantName}
                            onChange={(e) =>
                                setInfoForm({ ...infoForm, restaurantName: e.target.value })
                            }
                            className="w-full bg-[#14161D] border border-[#2B2F3D] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
                            placeholder="যেমন: Kacchi Dine"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                            ট্যাগলাইন / স্লোগান
                        </label>
                        <input
                            type="text"
                            value={infoForm.tagline}
                            onChange={(e) =>
                                setInfoForm({ ...infoForm, tagline: e.target.value })
                            }
                            className="w-full bg-[#14161D] border border-[#2B2F3D] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
                            placeholder="যেমন: The Ultimate Royalty on Your Plate"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                            ঠিকানা (Location) <span className="text-amber-500">*</span>
                        </label>
                        <input
                            type="text"
                            required
                            value={infoForm.location}
                            onChange={(e) =>
                                setInfoForm({ ...infoForm, location: e.target.value })
                            }
                            className="w-full bg-[#14161D] border border-[#2B2F3D] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
                            placeholder="যেমন: Dhanmondi, Dhaka"
                        />
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#232630]">
                        <button
                            type="button"
                            onClick={() => setIsInfoModalOpen(false)}
                            className="px-4 py-2.5 bg-[#14161D] hover:bg-white/10 text-slate-300 rounded-xl text-xs font-semibold transition-colors"
                        >
                            বাতিল
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-black font-bold rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-amber-500/20 disabled:opacity-50 transition-all"
                        >
                            {loading ? (
                                <Loader2 size={15} className="animate-spin" />
                            ) : (
                                <Save size={15} />
                            )}
                            সেভ করুন
                        </button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
