'use client'

import React, { useRef, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Camera, Check, Loader2, Upload, User, X } from 'lucide-react';
import { CustomAlert } from '@/lib/helpers/Shei-Shad-Alert';
import { compressImage } from '@/lib/helpers/compressImage';
import { uploadToCloudinary } from '@/lib/helpers/uploadImage';
import { getPublicIdFromUrl } from '@/lib/helpers/GetPublicIdFromUrl';
import { updateProfileInfo } from '@/modules/actions/user.action';

interface ChangeImageProps {
    id: string;
    isAvatarDialogOpen: boolean;
    currentImage: string | null;
    setIsAvatarDialogOpen: (open: boolean) => void;
}

export default function ChangeProfileImage({
    id,
    isAvatarDialogOpen,
    currentImage,
    setIsAvatarDialogOpen
}: ChangeImageProps) {

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [savedImageUrl, setSavedImageUrl] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);


    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    // cancel 
    const handleCancel = () => {
        if (previewUrl) URL.revokeObjectURL(previewUrl);
        setSelectedFile(null);
        setPreviewUrl(null);
    };

    // Save new Avatar 
    const handleSaveAvatar = async () => {
        if (!selectedFile) return;
        setIsUploading(true)
        try {
            const compressedImage = await compressImage(selectedFile)
            const uploadedUrl = await uploadToCloudinary(compressedImage)

            if (!uploadedUrl) {
                CustomAlert.error("ছবি আপলোড করতে সমস্যা হয়েছে!")
                return;
            }

            if (currentImage && currentImage.includes("cloudinary")) {
                const publicId = getPublicIdFromUrl(currentImage);

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

            const res = await updateProfileInfo(id, { image: uploadedUrl })
            if (res.success) {
                // console.log(res.data);
                CustomAlert.success('Profile picture updated successfully!');
            } else {
                CustomAlert.error(res.message);
            }

            setSavedImageUrl(uploadedUrl);
            setSelectedFile(null);
            setPreviewUrl(null)
            setIsAvatarDialogOpen(false);

            // Toast notification

        } catch (error) {
            CustomAlert.error('Failed to update profile picture.');
        } finally {
            setIsUploading(false)
        }
    };

    const displayImage = previewUrl || savedImageUrl || currentImage;

    return (
        <div>
            <Dialog open={isAvatarDialogOpen} onOpenChange={setIsAvatarDialogOpen}>
                <DialogContent className="bg-[#14161d] border border-amber-400/30 text-zinc-100 sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle className="text-lg font-bold text-zinc-100 flex items-center gap-2">
                            <Camera size={18} className="text-amber-500" />
                            Change Profile Picture
                        </DialogTitle>
                    </DialogHeader>

                    <div className="flex flex-col items-center justify-center py-2 space-y-3">

                        {/* Image Preview Window */}
                        <div className="relative w-full h-48 rounded-2xl bg-zinc-900 border-2 border-zinc-800 overflow-hidden flex items-center justify-center shadow-inner group">
                            {displayImage ? (
                                <img 
                                src={displayImage} 
                                alt="Avatar Preview" 
                                className="w-full h-full object-cover"
                                />
                            ) : (
                                <User size={48} className="text-zinc-600" />
                            )}

                           {
                            selectedFile && 
                             <button
                                type="button"
                                onClick={handleCancel}
                                disabled={isUploading}
                                className="absolute top-2 right-2 p-2 rounded-xl bg-black/80 hover:bg-black text-gray-300 border border-white/20 transition cursor-pointer"
                                title="বাতিল করুন"
                            >
                                <X size={16} />
                            </button>
                           }
                        </div>

                        {/* Hidden File Input */}
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept="image/*"
                            className="hidden"
                        />

                        {/* Upload Button Trigger */}
                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs sm:text-sm font-medium rounded-xl border border-zinc-700 transition-colors"
                        >
                            <Upload size={15} className="text-amber-400" />
                            <span>Upload Image</span>
                        </button>
                    </div>

                    <DialogFooter className="bg-[#14161d] flex items-center justify-end gap-2 border-t border-t-amber-400/30 pt-3">
                        <button
                            type="button"
                            onClick={() => setIsAvatarDialogOpen(false)}
                            className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 text-xs sm:text-sm font-medium rounded-xl transition-colors"
                        >
                            Cancel
                        </button>

                        {/*conditional Save button */}
                        {selectedFile && (
                            <button
                                type="button"
                                disabled={isUploading}
                                onClick={handleSaveAvatar}
                                className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-black text-xs sm:text-sm font-semibold rounded-xl transition-colors flex items-center gap-1.5 shadow-md"
                            >
                                {isUploading ? (
                                    <>
                                        <Loader2 size={14} className="animate-spin" /> আপলোড হচ্ছে...
                                    </>
                                ) : (
                                    <>
                                        <Check size={14} /> ছবি সেভ করুন
                                    </>
                                )}
                            </button>
                        )}
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
