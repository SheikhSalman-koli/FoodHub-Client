
export const uploadToCloudinary = async (file: File) => {
  try {
    if (!file) throw new Error("No file selected");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "staff_upload");

    const cloudName = "dysgxhxre";

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();

    // console.log("Cloudinary response:", data);

    if (!res.ok) {
      throw new Error(data.error?.message || "Upload failed");
    }

    return data?.secure_url;
    
  } catch (err) {
    console.error(err);
    throw err;
  }
};