
export const compressImage = (file: File, maxWidth = 1000, quality = 0.75): Promise<File> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;

      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;

        // সর্বোচ্চ ১০০০ পিক্সেল চওড়া রাখা
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0, width, height);

        // WebP ফর্ম্যাট এবং ৭৫% কোয়ালিটিতে কনভার্ট
        canvas.toBlob(
          (blob) => {
            if (blob) {
              const compressedFile = new File([blob], file.name.replace(/\.[^/.]+$/, ".webp"), {
                type: "image/webp",
                lastModified: Date.now(),
              });
              resolve(compressedFile);
            } else {
              resolve(file); // ফেইল করলে অরিজিনাল ফাইল পাঠাবে
            }
          },
          "image/webp",
          quality
        );
      };
    };
  });
};