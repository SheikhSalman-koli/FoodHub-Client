import { v2 as cloudinary } from 'cloudinary';
import { NextResponse } from 'next/server';

cloudinary.config({
  cloud_name: "dysgxhxre",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
  try {
    const { publicId } = await request.json();
    if (!publicId) return NextResponse.json({ error: "No Public ID" }, { status: 400 });

    const result = await cloudinary.uploader.destroy(publicId);
    return NextResponse.json({ success: true, result });
  } catch (error) {
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}