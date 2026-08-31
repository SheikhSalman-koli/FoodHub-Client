
import Swal, { SweetAlertPosition } from "sweetalert2";

// বেসিক ব্যাকগ্রাউন্ড ও পপআপ স্টাইল
const baseConfig = {
  background: "#0d0d0d",
  color: "#ffffff",
  buttonsStyling: false,
  customClass: {
    popup:
      "!border !border-amber-500/10 !outline !outline-1 !outline-white/10 rounded-2xl shadow-2xl backdrop-blur-xl p-6",
    title: "text-base font-bold text-white tracking-wide",
    htmlContainer: "text-xs text-gray-400 mt-1",
  },
};

// টোস্টের জন্য আলাদা কনফিগারেশন
const toastBaseConfig = {
  background: "#0d0d0d",
  color: "#ffffff",
  toast: true,
  position: "top-end" as SweetAlertPosition,
  showConfirmButton: false,
  timerProgressBar: true,
  customClass: {
    popup:
      "!border !border-amber-500/20 !outline !outline-1 !outline-white/10 rounded-xl shadow-2xl backdrop-blur-xl !p-3 !px-4",
    title: "!text-xs sm:!text-sm font-medium text-white tracking-wide",
  },
};

export class CustomAlert {
  // ১. সাফল্য বার্তা (Success Alert)
  static success(title: string, text?: string) {
    return Swal.fire({
      ...baseConfig,
      title,
      text,
      icon: "success",
      iconColor: "#f59e0b",
      confirmButtonText: "ঠিক আছে",
      customClass: {
        ...baseConfig.customClass,
        confirmButton:
          "bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs uppercase tracking-widest px-6 py-2.5 rounded-xl shadow-lg shadow-amber-500/20 transition-all cursor-pointer mt-2",
      },
    });
  }

  // ২. এরর বার্তা (Error Alert)
  static error(title: string, text?: string) {
    return Swal.fire({
      ...baseConfig,
      title,
      text,
      icon: "error",
      iconColor: "#ef4444",
      confirmButtonText: "আবার চেষ্টা করুন",
      customClass: {
        ...baseConfig.customClass,
        confirmButton:
          "bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30 font-bold text-xs uppercase tracking-widest px-6 py-2.5 rounded-xl transition-all cursor-pointer mt-2",
      },
    });
  }

  // ৩. কনফার্মেশন বার্তা (Confirm Dialog)
  static confirm(
    title: string,
    text: string,
    confirmText: string = "হ্যাঁ, নিশ্চিত"
  ) {
    return Swal.fire({
      ...baseConfig,
      title,
      text,
      icon: "warning",
      iconColor: "#f59e0b",
      showCancelButton: true,
      confirmButtonText: confirmText,
      cancelButtonText: "বাতিল",
      customClass: {
        ...baseConfig.customClass,
        confirmButton:
          "bg-red-500 hover:bg-red-600 text-white font-bold text-xs uppercase tracking-widest px-5 py-2.5 rounded-xl transition-all cursor-pointer mr-2",
        cancelButton:
          "bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10 font-bold text-xs uppercase tracking-widest px-5 py-2.5 rounded-xl transition-all cursor-pointer",
      },
    });
  }

  // ৪. সাফল্য টোস্ট (Success Toast)
  static successToast(title: string, timer: number = 2500) {
    return Swal.fire({
      ...toastBaseConfig,
      title,
      icon: "success",
      iconColor: "#f59e0b",
      timer,
    });
  }

  // ৫. এরর টোস্ট (Error Toast)
  static errorToast(title: string, timer: number = 2500) {
    return Swal.fire({
      ...toastBaseConfig,
      title,
      icon: "error",
      iconColor: "#ef4444",
      timer,
    });
  }
}