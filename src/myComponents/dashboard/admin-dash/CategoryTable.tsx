"use client";

import React, { useState } from "react";
import {
  Search,
  Plus,
  Pencil,
  Eye,
  EyeOff,
  FolderKanban,
} from "lucide-react";

import CategoryModal from "./CategoryModal";

export interface CategoryData {
  id: string;
  name: string;
  slug: string;
  isAvailable: boolean;
  isDeleted?: boolean;
}

interface ManageCategoriesProps {
  categories: CategoryData[];
  onToggleAvailability?: (id: string, isAvailable: boolean) => Promise<void>;
}

export default function ManageCategoriesTable({
  categories,
}: ManageCategoriesProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<CategoryData | null>(null);

  const [form, setForm] = useState<{
    id?: string;
    name: string;
    slug: string;
    isAvailable: boolean;
  }>({
    name: "",
    slug: "",
    isAvailable: true,
  });

  const handleOpenEditModal = (category: CategoryData) => {
    setEditingCategory(category);
    setForm({
      id: category.id,
      name: category.name,
      slug: category.slug,
      isAvailable: category.isAvailable,
    });
    setIsModalOpen(true);
  };


  const handleOpenCreateModal = () => {
    setEditingCategory(null);
    setForm({ name: "", slug: "", isAvailable: true });
    setIsModalOpen(true);
  };

  const filteredCategories = categories.filter(
    (cat) =>
    // !cat.isDeleted &&
    (cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cat.slug.toLowerCase().includes(searchTerm.toLowerCase()))
  );


  return (
    <div className="space-y-5 w-full max-w-6xl mx-auto">

      {/* হেডার, সার্চ ও নতুন অ্যাড বাটন */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#0F1015] border border-[#232630] p-4 rounded-2xl shadow-lg">

        {/* সার্চ ইনপুট */}
        <div className="relative w-full sm:w-80">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="ক্যাটাগরি বা স্লেগ খুঁজুন..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#14161D] border border-[#2B2F3D] rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-amber-500 transition-colors"
          />
        </div>

        {/* নতুন ক্যাটাগরি যুক্ত বাটন */}
        <button
          onClick={handleOpenCreateModal}
          className="w-full sm:w-auto px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-black font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all"
        >
          <Plus size={16} />
          <span>নতুন ক্যাটাগরি</span>
        </button>

        {
          isModalOpen &&

          <CategoryModal
            form={form}
            setForm={setForm}
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            editingCategory={editingCategory}
          />
        }
      </div>

      <div className="bg-[#0F1015] border border-[#232630] rounded-3xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">

            <thead className="bg-[#14161D] text-slate-400 border-b border-[#232630] uppercase text-[10px] tracking-wider font-bold">
              <tr>
                <th className="px-6 py-4">ক্যাটাগরি নাম</th>
                <th className="px-6 py-4">স্লাগ</th>
                <th className="px-6 py-4 text-center">উপলব্ধতা (Availability)</th>
                <th className="px-6 py-4 text-right">অ্যাকশন (Action)</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#232630]/60">
              {filteredCategories.length > 0 ? (
                filteredCategories.map((category) => {

                  return (
                    <tr
                      key={category.id}
                      className="hover:bg-white/2 transition-colors group"
                    >
                      {/* ক্যাটাগরি নাম */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2.5 bg-amber-500/10 text-amber-400 rounded-xl border border-amber-500/20 shrink-0">
                            <FolderKanban size={18} />
                          </div>
                          <div>
                            <h4 className="font-bold text-white text-sm group-hover:text-amber-400 transition-colors">
                              {category.name}
                            </h4>
                            <span className="text-[10px] text-slate-500 font-mono">
                              ID: {category.id.slice(0, 8)}...
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* স্লেগ */}
                      <td className="px-6 py-4">
                        <span className="font-mono text-slate-400 bg-[#14161D] px-2.5 py-1 rounded-lg border border-[#2B2F3D] text-[11px]">
                          {category.slug}
                        </span>
                      </td>

                      {/* Availability Toggle Switch & Badge */}
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-3">

                          <span
                            className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-md border ${category.isAvailable
                              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                              : "bg-rose-500/10 text-rose-400 border-rose-500/20"
                              }`}
                          >
                            {category.isAvailable ? (
                              <>
                                <Eye size={12} /> AVAILABLE
                              </>
                            ) : (
                              <>
                                <EyeOff size={12} /> UNAVAILABLE
                              </>
                            )}
                          </span>
                        </div>
                      </td>

                      {/*অ্যাকশন বাটনসমূহ */}
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">

                          {/* এডিট বাটন */}
                          <button
                            onClick={() => handleOpenEditModal(category)}
                            className="p-2 bg-[#14161D] hover:bg-amber-500/20 text-slate-300 hover:text-amber-400 border border-[#2B2F3D] hover:border-amber-500/40 rounded-xl transition-all"
                            title="সম্পাদনা করুন"
                          >
                            <Pencil size={14} />
                          </button>

                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-slate-500">
                    কোনো ক্যাটাগরি পাওয়া যায়নি।
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