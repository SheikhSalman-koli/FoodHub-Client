
import Hero from "@/myComponents/root/homepage/Hero";
import MealCard from "@/myComponents/root/homepage/MealCard";
import Providers from "@/myComponents/root/homepage/Providers";


 export default function HomePage() {

  return (
    <div className="min-h-screen" style={{ background: "#FAFAF8" }}>
       

      <main className="mx-auto space-y-8 py-6 pb-28">
        {/* Hero */}
        <Hero />

        <Providers />

        <MealCard />

      </main>
     
      
    </div>
  );
 }