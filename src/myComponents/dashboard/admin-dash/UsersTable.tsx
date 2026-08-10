"use client";

import React, { useState } from "react";
import {
    User,
    Store,
    UserCheck,
    Search,
    Filter,
    CheckCircle2,
    XCircle,
    MoreVertical,
    Mail,
    Phone,
    Calendar,
} from "lucide-react";

// Shadcn UI (যদি আপনার প্রজেক্টে ইনস্টল থাকে, নতুবা কাস্টম এচটিএমএল ব্যবহার করতে পারেন)
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserData } from "@/modules/services/user.service";
import { updateUserStatus } from "@/modules/actions/user.action";
import Swal from "sweetalert2";
import { CustomAlert } from "@/lib/helpers/Shei-Shad-Alert";


interface ManageUsersProps {
    users: UserData[];
}

export default function ManageUsersTable({ users }: ManageUsersProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const [roleFilter, setRoleFilter] = useState<string>("ALL");

    // সার্চ এবং ফিল্টারিং লজিক
    const filteredUsers = users.filter((user) => {
        const matchesSearch =
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.phone?.includes(searchTerm);

        const matchesRole = roleFilter === "ALL" || user.role === roleFilter;

        return matchesSearch && matchesRole;
    });

    // স্টেটাস চেঞ্জ হ্যান্ডলার
    const handleToggleStatus = async (user: UserData) => {
        const newStatus = user.status === "ACTIVATE" ? "SUSPENDE" : "ACTIVATE";
        try {
            const res = await updateUserStatus(user.id, newStatus)

            if (res.success) {
                Swal.fire({
                    icon: "success",
                    title: `ইউজার সফলভাবে ${newStatus} হয়েছে!`,
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 2000,
                });
            } else {
                CustomAlert.error(res.message);
            }
        } catch (error) {
            console.error("Failed to change user status", error);
        } 
    };

    // রোল অনুযায়ী ব্যাজ কালার
    const getRoleBadge = (role: string) => {
        switch (role) {
            case "PROVIDER":
                return (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                        <Store size={12} /> প্রোভাইডার
                    </span>
                );
            default:
                return (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                        <UserCheck size={12} /> কাস্টমার
                    </span>
                );
        }
    };

    return (
        <div className="space-y-5 w-full">

            {/* সার্চ ও ফিল্টার বার */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#0F1015] border border-[#232630] p-4 rounded-2xl shadow-lg">

                {/* সার্চ বক্স */}
                <div className="relative w-full sm:w-80">
                    <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                        type="text"
                        placeholder="নাম, ইমেইল বা ফোন নম্বর খুঁজুন..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-[#14161D] border border-[#2B2F3D] rounded-xl pl-10 pr-4 py-2 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-amber-500 transition-colors"
                    />
                </div>

                {/* রোল ফিল্টার */}
                <div className="flex items-center gap-2 w-full sm:w-auto">
                    <Filter size={15} className="text-amber-500" />
                    <select
                        value={roleFilter}
                        onChange={(e) => setRoleFilter(e.target.value)}
                        className="bg-[#14161D] border border-[#2B2F3D] rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-500 cursor-pointer"
                    >
                        <option value="ALL">সব</option>
                        <option value="PROVIDER">প্রোভাইডার</option>
                        <option value="CUSTOMER">কাস্টমার</option>
                    </select>
                </div>

            </div>

            {/* ইউজার ডেটা টেবিল */}
            <div className="bg-[#0F1015] border border-[#232630] rounded-3xl overflow-hidden shadow-2xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs text-slate-300">

                        {/* টেবিল হেডার */}
                        <thead className="bg-[#14161D] text-slate-400 border-b border-[#232630] uppercase text-[10px] tracking-wider font-bold">
                            <tr>
                                <th className="px-6 py-4">ইউজার তথ্য</th>
                                <th className="px-6 py-4">রোল (Role)</th>
                                <th className="px-6 py-4">যোগাযোগ</th>
                                <th className="px-6 py-4">যোগদানের তারিখ</th>
                                <th className="px-6 py-4 text-center">স্টেটাস (Active/SUSPENDE)</th>
                                <th className="px-6 py-4 text-right">অ্যাকশন</th>
                            </tr>
                        </thead>

                        {/* টেবিল বডি */}
                        <tbody className="divide-y divide-[#232630]/60">
                            {filteredUsers.length > 0 ? (
                                filteredUsers.map((user) => {
                                    const isActive = user.status === "ACTIVATE";

                                    return (
                                        <tr
                                            key={user.id}
                                            className="hover:bg-white/2 transition-colors group"
                                        >
                                            {/* ১. ইউজার নাম, ইমেজ */}
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <Avatar className="h-10 w-10 border border-[#2B2F3D] shadow-md shrink-0">
                                                        <AvatarImage src={user.image || undefined} alt={user.name} />
                                                        {/* ছবি না থাকলে নামের প্রথম অক্ষরের ডিফল্ট ফলব্যাক */}
                                                        <AvatarFallback className="bg-amber-500/10 text-amber-500 font-bold uppercase text-xs">
                                                            {user.name ? user.name.substring(0, 2) : <User size={16} />}
                                                        </AvatarFallback>
                                                    </Avatar>

                                                    <div className="overflow-hidden">
                                                        <h4 className="font-bold text-white text-sm truncate group-hover:text-amber-400 transition-colors">
                                                            {user.name}
                                                        </h4>
                                                        <p className="text-[11px] text-slate-400 truncate flex items-center gap-1 mt-0.5">
                                                            <Mail size={11} className="text-slate-500" />
                                                            {user.email}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* ২. রোল ব্যাজ */}
                                            <td className="px-6 py-4">{getRoleBadge(user.role)}</td>

                                            {/* ৩. ফোন নম্বর */}
                                            <td className="px-6 py-4">
                                                {user.phone ? (
                                                    <span className="flex items-center gap-1.5 text-slate-300 font-mono">
                                                        <Phone size={12} className="text-slate-500" />
                                                        {user.phone}
                                                    </span>
                                                ) : (
                                                    <span className="text-slate-600 font-italic">N/A</span>
                                                )}
                                            </td>

                                            {/* ৪. ক্রিয়েশনের তারিখ */}
                                            <td className="px-6 py-4 text-slate-400">
                                                <span className="flex items-center gap-1.5">
                                                    <Calendar size={12} className="text-slate-500" />
                                                    {new Date(user.createdAt).toLocaleDateString("bn-BD", {
                                                        day: "numeric",
                                                        month: "short",
                                                        year: "numeric",
                                                    })}
                                                </span>
                                            </td>

                                            {/* ৫. অ্যাক্টিভ/ইনঅ্যাক্টিভ টগল সুইচ */}
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col items-center justify-center gap-1.5">
                                                    <div className="flex items-center gap-2">

                                                        {/* অ্যাক্টিভ ব্যাজ */}
                                                        <span
                                                            className={`text-[11px] font-bold px-2 py-0.5 rounded-md border ${isActive
                                                                    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                                                                    : "bg-rose-500/10 text-rose-400 border-rose-500/20"
                                                                }`}
                                                        >
                                                            {isActive ? "ACTIVE" : "SUSPENDE"}
                                                        </span>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* ৬. ড্রপডাউন অ্যাকশন */}
                                            <td className="px-6 py-4 text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger className="p-2 hover:bg-white/10 rounded-xl transition-colors text-slate-400 hover:text-white">
                                                        <MoreVertical size={16} />
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end" className="bg-[#14161D] border border-amber-500 text-slate-200">
                                                        <DropdownMenuItem
                                                            onClick={() => handleToggleStatus(user)}
                                                            className="cursor-pointer hover:bg-amber-500/20 text-xs font-semibold "
                                                        >
                                                            {isActive ? (
                                                                <>
                                                                    <XCircle size={14} className="mr-2 text-rose-400" />
                                                                    সাসপেন্ড করুন
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <CheckCircle2 size={14} className="mr-2 text-emerald-400" />
                                                                    অ্যাক্টিভ করুন
                                                                </>
                                                            )}
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                /* ডাটা না থাকলে */
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                                        কোনো ইউজার পাওয়া যায়নি।
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
}