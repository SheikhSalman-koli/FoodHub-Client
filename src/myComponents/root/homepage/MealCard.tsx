import React from 'react';
import { Flame, Plus } from 'lucide-react';

// Your provided Meal Data Schema
const meals = [
  {
    id: 'ccf755d0-23cb-4a54-aa29-d87bf293d030',
    providerId: '143f56d6-cb81-488c-83f6-df79b1e420a7',
    categoryId: '02970fe3-766e-42ea-9316-fd8ee809195b',
    name: 'Special Naga Grilled Burger',
    description: 'Juicy grilled chicken patty glazed with extremely spicy Bangladeshi Naga chili sauce, topped with mayo, lettuce, and cheese.',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800&auto=format&fit=crop',
    orderCount: 142,
    price: '240',
    isDeleted: false,
    discount: 0, // 0 means no discount
  },
  {
    id: 'd1',
    providerId: '143f56d6-cb81-488c-83f6-df79b1e420a7',
    categoryId: 'cat-2',
    name: 'Smokey BBQ Pizza (12 Inch)',
    description: 'Loaded with smoked chicken, mozzarella, black olives, and our signature BBQ sauce on a hand-tossed crust.',
    image: 'https://images.unsplash.com/photo-1513104890e38-7c7344062a4e?q=80&w=800&auto=format&fit=crop',
    orderCount: 450,
    price: '850',
    isDeleted: false,
    discount: 100, // Example showing a flat discount amount
  },
  {
    id: 'd2',
    providerId: '143f56d6-cb81-488c-83f6-df79b1e420a7',
    categoryId: 'cat-2',
    name: 'Smokey BBQ Pizza (12 Inch)',
    description: 'Loaded with smoked chicken, mozzarella, black olives, and our signature BBQ sauce on a hand-tossed crust.',
    image: 'https://images.unsplash.com/photo-1513104890e38-7c7344062a4e?q=80&w=800&auto=format&fit=crop',
    orderCount: 450,
    price: '850',
    isDeleted: false,
    discount: 100, // Example showing a flat discount amount
  }
];

export default function MealCard() {
  // Filter out deleted items
  const activeMeals = meals.filter(meal => !meal.isDeleted);

  return (
    <section className="w-full bg-[#0d0d0d] py-12 px-6 sm:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto w-full">
        
        {/* Section Header */}
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-light text-white tracking-tight">
            জনপ্রিয় <span className="font-extrabold text-amber-500">খাবারসমূহ</span>
          </h2>
        </div>

        {/* Meals Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {activeMeals.map((meal) => {
            // Pricing Logic
            const originalPrice = Number(meal.price);
            const hasDiscount = meal.discount > 0;
            const currentPrice = hasDiscount ? originalPrice - meal.discount : originalPrice;
            const isPopular = meal.orderCount > 100;

            return (
              <div 
                key={meal.id} 
                className="group flex flex-col bg-[#141414] border border-white/5 rounded-2xl overflow-hidden transition-all duration-300 hover:border-amber-500/30 hover:shadow-2xl hover:shadow-amber-500/10"
              >
                {/* Image Container */}
                <div className="relative w-full aspect-4/3 overflow-hidden bg-gray-900">
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url(${meal.image})` }}
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-[#141414] via-transparent to-transparent opacity-60" />
                  
                  {/* Floating Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-2">
                    {/* Discount Badge */}
                    {hasDiscount && (
                      <span className="bg-red-500 text-white text-[10px] font-black px-2.5 py-1 rounded-md uppercase tracking-wider shadow-lg">
                        ৳{meal.discount} ছাড়
                      </span>
                    )}
                    {/* Popularity Badge based on orderCount */}
                    {isPopular && (
                      <span className="bg-amber-500 text-[#0d0d0d] text-[10px] font-black px-2.5 py-1 rounded-md uppercase tracking-wider shadow-lg flex items-center gap-1 w-max">
                        <Flame className="size-3" />
                        বেস্টসেলার
                      </span>
                    )}
                  </div>
                </div>

                {/* Content Container */}
                <div className="flex flex-col grow p-4">
                  
                  {/* Title & Description */}
                  <div className="grow mb-4">
                    <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-1 mb-1">
                      {meal.name}
                    </h3>
                    <p className="text-xs text-gray-400 leading-relaxed line-clamp-2">
                      {meal.description}
                    </p>
                  </div>

                  {/* Order Count / Social Proof */}
                  <div className="text-[11px] font-medium text-gray-500 mb-4 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                    {meal.orderCount}+ জন অর্ডার করেছেন
                  </div>

                  {/* Footer: Price & Add to Cart */}
                  <div className="pt-4 border-t border-white/5 flex items-end justify-between gap-2 mt-auto">
                    <div className="flex flex-col">
                      {hasDiscount && (
                        <span className="text-xs text-gray-500 line-through font-medium">
                          ৳ {originalPrice}
                        </span>
                      )}
                      <span className="text-xl font-black text-amber-500">
                        ৳ {currentPrice}
                      </span>
                    </div>

                    {/* Add to Cart Button */}
                    <button className="bg-white/5 hover:bg-amber-500 text-white hover:text-[#0d0d0d] transition-all duration-300 p-3 rounded-xl flex items-center justify-center cursor-pointer group/btn active:scale-95 border border-white/10 hover:border-amber-500 shadow-lg">
                      <Plus className="size-5 transition-transform group-hover/btn:rotate-90" />
                    </button>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}