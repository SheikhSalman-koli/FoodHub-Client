'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { useState, type Dispatch, type SetStateAction } from "react";
import { Layers, Loader2, Save } from "lucide-react";
import { createCategory, updateCategory } from "@/modules/actions/category.actions";
import Swal from "sweetalert2";
import { CustomAlert } from "@/lib/helpers/Shei-Shad-Alert";

export interface CreateCategoryData {
  id?:string;
  name: string;
  slug: string;
  isAvailable: boolean;
}

interface manageCategoryProps {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  form: CreateCategoryData;
  setForm: Dispatch<SetStateAction<CreateCategoryData>>;
  editingCategory: CreateCategoryData | null;
}

export default function CategoryModal({
  form,
  setForm,
  isModalOpen,
  setIsModalOpen,
  editingCategory
}: manageCategoryProps) {

  const [modalLoading, setModalLoading] = useState(false);

  // ✏️ এডিট মডাল ওপেন হ্যান্ডলার


  // 🔄 নাম থেকে অটো-স্লেগ জেনারেট
  // const handleNameChange = (name: string) => {
  //   const slug = name
  //     .toLowerCase()
  //     .trim()
  //     .replace(/[^\w\s-]/g, "")
  //     .replace(/[\s_-]+/g, "-")
  //     .replace(/^-+|-+$/g, "");

  //   setForm((prev) => ({ ...prev, name, slug }));
  // };

  const handleNameChange = (name: string) => {
  const slug = name
    .toLowerCase()
    .trim()
    .replace(/[\s\_\-]+/g, "-")        
    .replace(/[^\p{L}\p{N}-]/gu, "")  
    .replace(/^-+|-+$/g, "");         

  setForm((prev) => ({ ...prev, name, slug }));
};


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setModalLoading(true);

    try {
      if (editingCategory) {
        const { id, ...updatedData } = form;
// console.log(id, updatedData);
        if (!id) {
          CustomAlert.error("Category ID not found");
          return;
        }

        const res = await updateCategory(id, updatedData);
        if (res.success) {
          Swal.fire({
            icon: "success",
            title: "ক্যটেগরি সফলভাবে পরিবর্তন হয়েছে!",
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 2000,
          });
        } else {
          CustomAlert.error(res.message)
        }

        // if (onUpdateCategory) {
        //   await onUpdateCategory(editingCategory.id, form);
        // }
      } else {
        const res = await createCategory(form)
        if (res.success) {
          Swal.fire({
            icon: "success",
            title: "ক্যটেগরি সফলভাবে সংযুক্ত হয়েছে!",
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 2000,
          });
        } else {
          CustomAlert.error(res.message)
        }
      }

      setIsModalOpen(false);
    } catch (error) {
      console.error("Category save error:", error);
    } finally {
      setModalLoading(false);
    }
  };


  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent className="bg-[#0F1015] border-[#232630] text-slate-100 max-w-md rounded-3xl p-6 shadow-2xl">
        <DialogHeader className="border-b border-[#232630] pb-4">
          <DialogTitle className="text-lg font-bold text-white flex items-center gap-2.5">
            <div className="p-2 bg-amber-500/10 text-amber-400 rounded-xl border border-amber-500/20">
              <Layers size={18} />
            </div>
            {editingCategory ? "ক্যাটাগরি আপডেট করুন" : "নতুন ক্যাটাগরি যোগ করুন"}
          </DialogTitle>
          <DialogDescription className="text-xs text-slate-400">
            ক্যাটাগরির নাম ও স্লেগ নির্ধারণ করুন
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-2">

          {/* ১. নাম */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              ক্যাটাগরির নাম <span className="text-amber-500">*</span>
            </label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => handleNameChange(e.target.value)}
              className="w-full bg-[#14161D] border border-[#2B2F3D] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
              placeholder="যেমন: Kacchi & Biryani"
            />
          </div>

          {/* ২. স্লেগ (Auto-generated) */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              স্লাগ (URL Slug) <span className="text-amber-500">*</span>
            </label>
            <input
              type="text"
              required
              value={form.slug}
              onChange={(e) => setForm({ ...form, slug: e.target.value })}
              className="w-full bg-[#14161D] border border-[#2B2F3D] rounded-xl px-4 py-2.5 text-sm text-white font-mono focus:outline-none focus:border-amber-500 transition-colors"
              placeholder="যেমন: kacchi-and-biryani"
            />
          </div>

          {/* ৩. Availability Toggle */}
          <div className="flex items-center justify-between p-3.5 bg-[#14161D] border border-[#2B2F3D] rounded-xl">
            <div>
              {/* <p className="text-[10px] text-slate-400">কাস্টমার প্যানেলে প্রদর্শিত হবে কিনা</p> */}
              <p className="text-xs font-semibold text-slate-200">{form.isAvailable ? 'Available' : 'Not-Available'}</p>
            </div>
            <Switch
              checked={form.isAvailable}
              onCheckedChange={(checked) => setForm({ ...form, isAvailable: checked })}
              className="data-[state=checked]:bg-emerald-500 data-[state=unchecked]:bg-rose-500/40"
            />
          </div>

          {/* একশন বাটনসমূহ */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#232630]">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2.5 bg-[#14161D] hover:bg-white/10 text-slate-300 rounded-xl text-xs font-semibold transition-colors"
            >
              বাতিল
            </button>
            <button
              type="submit"
              disabled={modalLoading}
              className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-black font-bold rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-amber-500/20 disabled:opacity-50 transition-all"
            >
              {modalLoading ? (
                <Loader2 size={15} className="animate-spin" />
              ) : (
                <Save size={15} />
              )}
              {editingCategory ? "আপডেট করুন" : "সেভ করুন"}
            </button>
          </div>

        </form>
      </DialogContent>
    </Dialog>
  )
}
