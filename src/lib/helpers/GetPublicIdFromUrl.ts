

export const getPublicIdFromUrl = (url: string) => {
  if (!url) return null;
  const parts = url.split('/');
  const lastPart = parts[parts.length - 1]; 
  const publicId = lastPart.split('.')[0];
  return publicId;
};