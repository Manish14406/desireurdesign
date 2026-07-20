import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { LazyImg } from "@/components/ui/OptimizedImage";

function smoothScrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function PremiumHero() {
  const [isLoaded, setIsLoaded] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      if (scrollRef.current) {
        scrollRef.current.style.transform = `translateX(-${scrolled * 0.08}px)`;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="hero"
      className="relative h-screen min-h-[600px] w-full flex items-center justify-center overflow-hidden bg-[#F8F5F0]"
    >
      {/* Warm ambient light orbs — light context */}
      <div className="absolute top-1/4 left-1/4 w-[200px] sm:w-[500px] h-[200px] sm:h-[500px] rounded-full bg-[#C8A96A] opacity-[0.07] blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[150px] sm:w-[400px] h-[150px] sm:h-[400px] rounded-full bg-[#E8D5B0] opacity-[0.50] blur-[100px] pointer-events-none" />

      {/* Massive Background Text */}
      <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none select-none overflow-hidden">
        <h1
          ref={scrollRef}
          className="text-[28vw] font-black uppercase tracking-tighter text-[#2B2B2B]/[0.035] whitespace-nowrap transition-transform"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          DESIRE
        </h1>
      </div>

      {/* 3D Cube Container */}
      <div
        className={`cinema-perspective z-10 transition-all duration-1000 ${
          isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-90"
        }`}
      >
        <div className="cube-wrapper">
          {/* Front — Living Room */}
          <div className="cube-face cube-front">
            <LazyImg src="/images/luxury_living_room.webp" alt="Luxury Living Room" className="w-full h-full object-cover" containerClassName="w-full h-full" priority={true} />
            <div className="absolute inset-0 bg-white/20 flex items-center justify-center">
              <h2 className="text-lg sm:text-2xl font-black text-[#2B2B2B] tracking-[0.2em] uppercase" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Bespoke</h2>
            </div>
          </div>
          {/* Bottom — Bedroom */}
          <div className="cube-face cube-bottom">
            <LazyImg src="/images/luxury_bedroom.webp" alt="Luxury Bedroom" className="w-full h-full object-cover" containerClassName="w-full h-full" priority={true} />
            <div className="absolute inset-0 bg-white/20 flex items-center justify-center">
              <h2 className="text-lg sm:text-2xl font-black text-[#2B2B2B] tracking-[0.2em] uppercase" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Elegant</h2>
            </div>
          </div>
          {/* Back — Kitchen */}
          <div className="cube-face cube-back">
            <LazyImg src="/images/luxury_kitchen.webp" alt="Luxury Kitchen" className="w-full h-full object-cover" containerClassName="w-full h-full" priority={true} />
            <div className="absolute inset-0 bg-white/20 flex items-center justify-center">
              <h2 className="text-lg sm:text-2xl font-black text-[#2B2B2B] tracking-[0.2em] uppercase" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Premium</h2>
          </div>
          </div>
          {/* Top — Complete Home */}
          <div className="cube-face cube-top">
            <LazyImg src="/images/complete_home_interior.webp" alt="Complete Home Interior" className="w-full h-full object-cover" containerClassName="w-full h-full" priority={true} />
            <div className="absolute inset-0 bg-white/20 flex items-center justify-center">
              <h2 className="text-lg sm:text-2xl font-black text-[#2B2B2B] tracking-[0.2em] uppercase" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Timeless</h2>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Bottom Text */}
      <div
        className={`absolute bottom-14 sm:bottom-20 z-10 text-center px-4 w-full transition-all duration-1000 delay-300 ${
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <p className="text-[9px] sm:text-xs uppercase tracking-[0.3em] sm:tracking-[0.4em] text-[#C8A96A] font-bold mb-2 sm:mb-4" style={{ fontFamily: "'Poppins', sans-serif" }}>
          Premium Interior Design Studio · Bengaluru
        </p>
        <h2
          className="text-[11vw] sm:text-[9vw] leading-[0.85] font-black uppercase tracking-tighter text-[#2B2B2B]"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          Transform Your<br />Home
        </h2>
        <p className="mt-3 sm:mt-4 text-xs sm:text-base text-[#666666] font-light max-w-xl mx-auto leading-relaxed hidden sm:block" style={{ fontFamily: "'Poppins', sans-serif" }}>
          Premium interiors crafted to blend luxury, comfort, and functionality.
        </p>
        <div className="mt-5 sm:mt-6 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-4">
          <button
            onClick={() => smoothScrollTo("consultation")}
            className="btn-dud btn-primary-gold w-full sm:w-auto justify-center"
          >
            <span>Book Free Consultation</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => smoothScrollTo("gallery")}
            className="btn-dud btn-ghost-light w-full sm:w-auto justify-center"
          >
            View Portfolio
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 z-10 opacity-40">
        <div className="w-px h-8 sm:h-12 bg-[#C8A96A]/50 animate-pulse" />
      </div>
    </section>
  );
}
