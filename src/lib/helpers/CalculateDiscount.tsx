
export const  CalculateDiscount = (price: string | number, discountPercentage: string | number) => {
  const originalPrice = Number(price) || 0;
  const percentage = Number(discountPercentage) || 0;

  const discountAmount = (originalPrice * percentage) / 100;
  const finalPrice = originalPrice - discountAmount;

  return {
    originalPrice,
    discountedAmount: Math.round(discountAmount),
    finalPrice: Math.max(0, Math.round(finalPrice)),
    hasDiscount: percentage > 0,
  };
};