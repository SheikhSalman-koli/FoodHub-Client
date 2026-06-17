"use client";

import { useState, useMemo } from "react";
import { Search, MapPin, Clock, Star, ChevronRight, Flame, Leaf, Zap, Coffee, Pizza, Soup, UtensilsCrossed, ShoppingBag, Filter, SlidersHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

// ─── Design tokens ────────────────────────────────────────────────────────────
// Primary:   #E8820C  saffron amber
// Light tint:#FFF3E0
// Surface:   #FAFAF8  warm off-white
// Ink:       #1C1917  charcoal
// Muted:     #78716C  stone
// Card:      #FFFFFF

// ─── Types ────────────────────────────────────────────────────────────────────
type Category = {
  id: string;
  label: string;
  icon: React.ReactNode;
  color: string;
};

type Provider = {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  reviewCount: number;
  deliveryTime: string;
  deliveryFee: number;
  minOrder: number;
  tags: string[];
  category: string;
  isNew?: boolean;
  isFeatured?: boolean;
  image: string; // gradient placeholder
};

type MenuItem = {
  id: string;
  name: string;
  price: number;
  description: string;
  providerId: string;
  providerName: string;
  isPopular?: boolean;
  image: string;
};

// ─── Mock data ────────────────────────────────────────────────────────────────
const CATEGORIES: Category[] = [
  { id: "all",     label: "All",       icon: <UtensilsCrossed size={18} />, color: "#E8820C" },
  { id: "burger",  label: "Burgers",   icon: <Flame size={18} />,           color: "#DC2626" },
  { id: "pizza",   label: "Pizza",     icon: <Pizza size={18} />,           color: "#D97706" },
  { id: "healthy", label: "Healthy",   icon: <Leaf size={18} />,            color: "#16A34A" },
  { id: "fast",    label: "Fast food", icon: <Zap size={18} />,             color: "#7C3AED" },
  { id: "soup",    label: "Soups",     icon: <Soup size={18} />,            color: "#0891B2" },
  { id: "cafe",    label: "Café",      icon: <Coffee size={18} />,          color: "#92400E" },
];

const PROVIDERS: Provider[] = [
  {
    id: "p1", name: "Burger Republic", cuisine: "American · Burgers",
    rating: 4.8, reviewCount: 312, deliveryTime: "20–30", deliveryFee: 0,
    minOrder: 150, tags: ["Free delivery", "Bestseller"], category: "burger",
    isFeatured: true, image: "linear-gradient(135deg,#fbbf24,#f97316)",
  },
  {
    id: "p2", name: "Green Bowl Co.", cuisine: "Healthy · Salads",
    rating: 4.6, reviewCount: 189, deliveryTime: "25–35", deliveryFee: 20,
    minOrder: 200, tags: ["Vegan-friendly"], category: "healthy",
    image: "linear-gradient(135deg,#86efac,#34d399)",
  },
  {
    id: "p3", name: "Napoli Pizza House", cuisine: "Italian · Pizza",
    rating: 4.9, reviewCount: 540, deliveryTime: "30–45", deliveryFee: 0,
    minOrder: 250, tags: ["Free delivery", "Top rated"], category: "pizza",
    isFeatured: true, image: "linear-gradient(135deg,#fca5a5,#f87171)",
  },
  {
    id: "p4", name: "Wok & Roll", cuisine: "Chinese · Asian fusion",
    rating: 4.5, reviewCount: 97, deliveryTime: "35–50", deliveryFee: 30,
    minOrder: 180, tags: ["New"], category: "fast",
    isNew: true, image: "linear-gradient(135deg,#a5b4fc,#818cf8)",
  },
  {
    id: "p5", name: "Broth & Soul", cuisine: "Soups · Comfort food",
    rating: 4.7, reviewCount: 223, deliveryTime: "20–30", deliveryFee: 15,
    minOrder: 120, tags: ["Quick"], category: "soup",
    image: "linear-gradient(135deg,#67e8f9,#22d3ee)",
  },
  {
    id: "p6", name: "The Morning Press", cuisine: "Café · Breakfast",
    rating: 4.6, reviewCount: 411, deliveryTime: "15–25", deliveryFee: 0,
    minOrder: 100, tags: ["Free delivery", "All-day breakfast"], category: "cafe",
    image: "linear-gradient(135deg,#fcd34d,#fbbf24)",
  },
];

const POPULAR_ITEMS: MenuItem[] = [
  { id: "m1", name: "Classic Smash Burger", price: 320, description: "Double smash patty, American cheese, pickles, secret sauce", providerId: "p1", providerName: "Burger Republic", isPopular: true, image: "linear-gradient(135deg,#fbbf24,#f97316)" },
  { id: "m2", name: "Margherita Romana", price: 420, description: "San Marzano tomato, fior di latte, fresh basil", providerId: "p3", providerName: "Napoli Pizza House", isPopular: true, image: "linear-gradient(135deg,#fca5a5,#fb7185)" },
  { id: "m3", name: "Açaí Power Bowl", price: 280, description: "Açaí base, banana, granola, honey, chia seeds", providerId: "p2", providerName: "Green Bowl Co.", image: "linear-gradient(135deg,#c4b5fd,#a78bfa)" },
  { id: "m4", name: "Flat White", price: 120, description: "Double ristretto, steamed micro-foam, served hot", providerId: "p6", providerName: "The Morning Press", image: "linear-gradient(135deg,#fcd34d,#d97706)" },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function HeroBanner() {
  return (
    <section
      className="relative overflow-hidden rounded-2xl px-8 py-10 md:py-14"
      style={{ background: "linear-gradient(135deg, #1C1917 60%, #3D2B1F)" }}
    >
      {/* Grain overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "180px",
        }}
      />
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 rounded-full opacity-20 blur-3xl"
        style={{ background: "#E8820C" }}
      />

      <div className="relative z-10 max-w-xl">
        <p className="mb-2 text-sm font-medium tracking-widest" style={{ color: "#E8820C" }}>
          DELIVERING NOW · DHAKA
        </p>
        <h1 className="mb-3 text-3xl font-bold leading-tight text-white md:text-4xl">
          Hungry? <br />
          <span style={{ color: "#E8820C" }}>Great food</span> is one tap away.
        </h1>
        <p className="mb-6 text-sm leading-relaxed" style={{ color: "#A8A29E" }}>
          Browse menus from the best providers near you, place your order, and track it live.
        </p>

        {/* Search bar */}
        <div className="flex items-center gap-2 rounded-xl bg-white/10 p-1.5 backdrop-blur-sm">
          <div className="flex flex-1 items-center gap-2 rounded-lg bg-white px-3 py-2">
            <Search size={16} className="shrink-0" style={{ color: "#78716C" }} />
            <input
              type="text"
              placeholder="Search for food or restaurants…"
              className="w-full bg-transparent text-sm outline-none placeholder:text-stone-400"
              style={{ color: "#1C1917" }}
            />
          </div>
          <Button
            size="sm"
            className="shrink-0 rounded-lg px-4 py-2 text-sm font-medium text-white"
            style={{ background: "#E8820C", border: "none" }}
          >
            Search
          </Button>
        </div>

        {/* Quick chips */}
        <div className="mt-4 flex flex-wrap gap-2">
          {["Burger", "Pizza", "Healthy", "Café"].map((q) => (
            <button
              key={q}
              className="rounded-full px-3 py-1 text-xs font-medium text-white/80 ring-1 ring-white/20 transition hover:bg-white/10"
            >
              {q}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function DeliveryBar() {
  return (
    <div
      className="flex flex-wrap items-center gap-x-6 gap-y-2 rounded-xl px-5 py-3 text-xs"
      style={{ background: "#FFF3E0", color: "#78716C" }}
    >
      <span className="flex items-center gap-1.5 font-medium" style={{ color: "#1C1917" }}>
        <MapPin size={13} style={{ color: "#E8820C" }} />
        Gazipur, Dhaka
        <ChevronRight size={12} />
      </span>
      <Separator orientation="vertical" className="h-4 hidden sm:block" />
      <span className="flex items-center gap-1.5">
        <Clock size={13} style={{ color: "#E8820C" }} />
        Estimated delivery: <strong className="text-stone-700">20–45 min</strong>
      </span>
      <Separator orientation="vertical" className="h-4 hidden sm:block" />
      <span>
        <strong className="text-stone-700">6 providers</strong> open near you
      </span>
    </div>
  );
}

function CategoryPills({
  active,
  onChange,
}: {
  active: string;
  onChange: (id: string) => void;
}) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
      {CATEGORIES.map((cat) => {
        const isActive = cat.id === active;
        return (
          <button
            key={cat.id}
            onClick={() => onChange(cat.id)}
            className="flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-all"
            style={
              isActive
                ? { background: "#E8820C", color: "#fff" }
                : { background: "#F5F5F4", color: "#57534E" }
            }
          >
            <span style={{ color: isActive ? "#fff" : cat.color }}>{cat.icon}</span>
            {cat.label}
          </button>
        );
      })}
    </div>
  );
}

function ProviderCard({ provider }: { provider: Provider }) {
  return (
    <Card className="group overflow-hidden border-0 shadow-sm transition-shadow hover:shadow-md" style={{ background: "#fff" }}>
      {/* Image area */}
      <div
        className="relative h-36 w-full"
        style={{ background: provider.image }}
      >
        <div className="absolute inset-0 flex items-end p-3">
          {provider.isFeatured && (
            <span
              className="rounded-full px-2.5 py-1 text-[11px] font-semibold text-white"
              style={{ background: "rgba(0,0,0,0.55)" }}
            >
              ⚡ Featured
            </span>
          )}
          {provider.isNew && (
            <span
              className="rounded-full px-2.5 py-1 text-[11px] font-semibold text-white"
              style={{ background: "#16A34A" }}
            >
              New
            </span>
          )}
        </div>
        {provider.deliveryFee === 0 && (
          <div
            className="absolute right-3 top-3 rounded-full px-2 py-0.5 text-[10px] font-bold"
            style={{ background: "#E8820C", color: "#fff" }}
          >
            FREE delivery
          </div>
        )}
      </div>

      <CardContent className="p-4">
        <div className="mb-1 flex items-start justify-between gap-2">
          <h3 className="text-sm font-semibold leading-snug" style={{ color: "#1C1917" }}>
            {provider.name}
          </h3>
          <span
            className="flex shrink-0 items-center gap-1 text-xs font-semibold"
            style={{ color: "#E8820C" }}
          >
            <Star size={11} fill="#E8820C" />
            {provider.rating}
          </span>
        </div>
        <p className="mb-3 text-xs" style={{ color: "#78716C" }}>
          {provider.cuisine} · {provider.reviewCount} reviews
        </p>
        <div className="flex items-center justify-between text-xs" style={{ color: "#78716C" }}>
          <span className="flex items-center gap-1">
            <Clock size={11} />
            {provider.deliveryTime} min
          </span>
          <span>
            {provider.deliveryFee === 0 ? "Free delivery" : `৳${provider.deliveryFee} delivery`}
          </span>
          <span>Min ৳{provider.minOrder}</span>
        </div>
      </CardContent>
    </Card>
  );
}

function MenuItemCard({ item }: { item: MenuItem }) {
  const [added, setAdded] = useState(false);

  return (
    <div
      className="flex gap-3 rounded-xl p-3 transition hover:bg-stone-50"
      style={{ border: "1px solid #F5F5F4" }}
    >
      <div
        className="h-16 w-16 shrink-0 rounded-lg"
        style={{ background: item.image }}
      />
      <div className="flex flex-1 flex-col justify-between">
        <div>
          <div className="flex items-center gap-1.5">
            <p className="text-sm font-semibold" style={{ color: "#1C1917" }}>{item.name}</p>
            {item.isPopular && (
              <Badge className="h-4 px-1.5 text-[10px]" style={{ background: "#FFF3E0", color: "#E8820C", border: "none" }}>
                Popular
              </Badge>
            )}
          </div>
          <p className="mt-0.5 text-xs leading-relaxed" style={{ color: "#78716C" }}>
            {item.description}
          </p>
          <p className="mt-1 text-[11px]" style={{ color: "#A8A29E" }}>{item.providerName}</p>
        </div>
      </div>
      <div className="flex shrink-0 flex-col items-end justify-between">
        <span className="text-sm font-bold" style={{ color: "#1C1917" }}>৳{item.price}</span>
        <button
          onClick={() => setAdded(!added)}
          className="flex h-7 w-7 items-center justify-center rounded-full text-white transition-transform active:scale-95"
          style={{ background: added ? "#1C1917" : "#E8820C" }}
          aria-label={added ? "Remove from cart" : "Add to cart"}
        >
          {added ? "✓" : "+"}
        </button>
      </div>
    </div>
  );
}

function CartFab({ count }: { count: number }) {
  if (count === 0) return null;
  return (
    <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2">
      <button
        className="flex items-center gap-3 rounded-full px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:opacity-90 active:scale-95"
        style={{ background: "#1C1917" }}
      >
        <span
          className="flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold"
          style={{ background: "#E8820C" }}
        >
          {count}
        </span>
        <ShoppingBag size={16} />
        View cart
        <span style={{ opacity: 0.6 }}>·</span>
        <span style={{ color: "#E8820C" }}>Review order</span>
      </button>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function CustomerHomePage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [cartCount, setCartCount] = useState(0);
  const [sortBy, setSortBy] = useState<"rating" | "time" | "fee">("rating");

  const filteredProviders = useMemo(() => {
    const list =
      activeCategory === "all"
        ? PROVIDERS
        : PROVIDERS.filter((p) => p.category === activeCategory);

    return [...list].sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "time") return parseInt(a.deliveryTime) - parseInt(b.deliveryTime);
      if (sortBy === "fee") return a.deliveryFee - b.deliveryFee;
      return 0;
    });
  }, [activeCategory, sortBy]);

  return (
    <div className="min-h-screen" style={{ background: "#FAFAF8" }}>
      {/* ── Navbar ── */}
      <header
        className="sticky top-0 z-40 border-b"
        style={{ background: "rgba(250,250,248,0.92)", backdropFilter: "blur(10px)", borderColor: "#F5F5F4" }}
      >
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-1.5">
            <span className="text-xl font-bold" style={{ color: "#1C1917" }}>food</span>
            <span
              className="rounded-md px-1.5 py-0.5 text-xl font-bold text-white"
              style={{ background: "#E8820C" }}
            >
              hub
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button className="text-sm" style={{ color: "#78716C" }}>
              Sign in
            </button>
            <Button
              size="sm"
              className="rounded-lg text-white"
              style={{ background: "#E8820C", border: "none" }}
            >
              Track order
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl space-y-8 px-4 py-6 pb-28">
        {/* Hero */}
        <HeroBanner />

        {/* Delivery context bar */}
        <DeliveryBar />

        {/* Categories */}
        <section>
          <CategoryPills active={activeCategory} onChange={setActiveCategory} />
        </section>

        {/* Popular items */}
        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-base font-semibold" style={{ color: "#1C1917" }}>
              Popular right now
            </h2>
            <button className="flex items-center gap-1 text-xs font-medium" style={{ color: "#E8820C" }}>
              See all <ChevronRight size={12} />
            </button>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {POPULAR_ITEMS.map((item) => (
              <MenuItemCard key={item.id} item={item} />
            ))}
          </div>
        </section>

        {/* Providers */}
        <section>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-semibold" style={{ color: "#1C1917" }}>
                {activeCategory === "all" ? "All providers" : CATEGORIES.find((c) => c.id === activeCategory)?.label}
              </h2>
              <p className="text-xs mt-0.5" style={{ color: "#78716C" }}>
                {filteredProviders.length} restaurants delivering to you
              </p>
            </div>
            <div className="flex items-center gap-2">
              <SlidersHorizontal size={14} style={{ color: "#78716C" }} />
              <span className="text-xs" style={{ color: "#78716C" }}>Sort:</span>
              {(["rating", "time", "fee"] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setSortBy(s)}
                  className="rounded-full px-3 py-1 text-xs font-medium transition"
                  style={
                    sortBy === s
                      ? { background: "#1C1917", color: "#fff" }
                      : { background: "#F5F5F4", color: "#57534E" }
                  }
                >
                  {s === "rating" ? "Top rated" : s === "time" ? "Fastest" : "Free delivery"}
                </button>
              ))}
            </div>
          </div>

          {filteredProviders.length === 0 ? (
            <div className="py-16 text-center">
              <p className="text-2xl mb-2">🍽️</p>
              <p className="text-sm font-medium" style={{ color: "#1C1917" }}>No providers in this category yet</p>
              <p className="text-xs mt-1" style={{ color: "#78716C" }}>Try a different category or check back later</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProviders.map((p) => (
                <ProviderCard key={p.id} provider={p} />
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Cart FAB — increment to demo */}
      <div className="fixed bottom-20 right-4 z-40">
        <button
          onClick={() => setCartCount((n) => n + 1)}
          className="h-10 w-10 rounded-full text-white shadow-md text-lg font-bold transition active:scale-95"
          style={{ background: "#E8820C" }}
          aria-label="Add test item to cart"
          title="Demo: add to cart"
        >
          +
        </button>
      </div>

      <CartFab count={cartCount} />
    </div>
  );
}