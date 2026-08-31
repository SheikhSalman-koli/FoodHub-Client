
import Hero from "@/myComponents/root/homepage/Hero";
import PopularMeals from "@/myComponents/root/homepage/PopularMeals";
import Providers from "@/myComponents/root/homepage/Providers";
import Reviews from "@/myComponents/root/homepage/Reviews";

export const dynamic = "force-dynamic";

 export default function HomePage() {

  return (
    <div className="min-h-screen" style={{ background: "#FAFAF8" }}>
       
      <main className="">
        {/* Hero */}
        <Hero />

        <Providers />

       <PopularMeals/>

       <Reviews />

      </main>
     
      
    </div>
  );
 }