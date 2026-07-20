import { useState, useEffect, useCallback, useRef } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    image: "/images/luxury_living_room.webp",
    tag: "Living Room Design",
    headline: ["Beautiful Homes", "Designed with Purpose"],
    sub: "Premium Interior Design & Vastu Solutions Across Bangalore",
  },
  {
    image: "/images/luxury_bedroom.webp",
    tag: "Bedroom Interiors",
    headline: ["Bedrooms That", "Soothe the Soul"],
    sub: "Crafted for rest, privacy and personality — uniquely yours",
  },
  {
    image: "/images/Modular_kitchen1.webp",
    tag: "Modular Kitchens",
    headline: ["Kitchens Built", "For Living"],
    sub: "Smart, beautiful modular kitchens with premium finishes",
  },
  {
    image: "/images/complete_home_interior.webp",
    tag: "Complete Homes",
    headline: ["Full Home", "Transformations"],
    sub: "End-to-end interior solutions from concept to final handover",
  },
  {
    image: "/images/luxury_false_ceiling.webp",
    tag: "Premium Craftsmanship",
    headline: ["Details That", "Define Luxury"],
    sub: "Precision craftsmanship and Vastu-aligned design in every corner",
  },
];

const badges = [
  "Residential Interiors",
  "Vastu Consultation",
  "Renovation",
  "Turnkey Solutions",
];

function smoothScrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function HeroSlideshow() {
  const [current, setCurrent] = useState(0);
  const [prevSlide, setPrevSlide] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [textVisible, setTextVisible] = useState(true);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback(
    (index: number) => {
      if (transitioning || index === current) return;
      setTransitioning(true);
      setTextVisible(false);
      setPrevSlide(current);
      setTimeout(() => {
        setCurrent(index);
        setTransitioning(false);
        setTimeout(() => setTextVisible(true), 80);
      }, 600);
    },
    [transitioning, current],
  );

  const next = useCallback(
    () => goTo((current + 1) % slides.length),
    [current, goTo],
  );
  const prev = useCallback(
    () => goTo((current - 1 + slides.length) % slides.length),
    [current, goTo],
  );

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(next, 5500);
  }, [next]);

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [resetTimer]);

  return (
    <section
      id="hero"
      className="relative h-[100dvh] min-h-[580px] w-full overflow-hidden"
      style={{ backgroundColor: "#110d07" }}
    >
      {/* ── Slide backgrounds ── */}
      {slides.map((slide, i) => (
        <div
          key={i}
          aria-hidden={i !== current}
          className="absolute inset-0"
          style={{
            opacity: i === current ? 1 : 0,
            transition: "opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1)",
            zIndex: i === current ? 2 : 1,
          }}
        >
          <img
            src={slide.image}
            alt={slide.tag}
            className="w-full h-full object-cover"
            style={{
              transform: i === current ? "scale(1.06)" : "scale(1)",
              transition: "transform 7s ease-out",
            }}
            loading={i === 0 ? "eager" : "lazy"}
          />
          {/* Layered dark overlay for text readability */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.40) 40%, rgba(0,0,0,0.78) 100%)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, rgba(0,0,0,0.35) 0%, transparent 60%)",
            }}
          />
        </div>
      ))}

      {/* ── Hero content ── */}
      <div
        className="absolute inset-0 flex flex-col justify-end pb-20 sm:pb-28 md:pb-32 px-5 sm:px-10 md:px-16 lg:px-24"
        style={{ zIndex: 10 }}
      >
        {/* Eyebrow tag */}
        <div
          className="mb-5 sm:mb-6"
          style={{
            opacity: textVisible ? 1 : 0,
            transform: textVisible ? "translateY(0)" : "translateY(12px)",
            transition: "opacity 0.6s ease-out 0.05s, transform 0.6s ease-out 0.05s",
          }}
        >
          <span
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.3em]"
            style={{
              background: "rgba(200,169,106,0.18)",
              border: "1px solid rgba(200,169,106,0.40)",
              color: "#F5E6C8",
              backdropFilter: "blur(6px)",
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full bg-[#C8A96A] inline-block"
              style={{ animation: "pulse 2s infinite" }}
            />
            {slides[current].tag}
          </span>
        </div>

        {/* Main headline */}
        <h1
          className="text-white font-black uppercase leading-[0.88] mb-4 sm:mb-6"
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(1.85rem, 8.5vw, 7.5rem)",
            letterSpacing: "-0.03em",
            textShadow: "0 2px 32px rgba(0,0,0,0.5), 0 4px 64px rgba(0,0,0,0.3)",
            opacity: textVisible ? 1 : 0,
            transform: textVisible ? "translateY(0)" : "translateY(20px)",
            transition:
              "opacity 0.65s ease-out 0.1s, transform 0.65s ease-out 0.1s",
          }}
        >
          {slides[current].headline.map((line, i) => (
            <span key={i} className="block">
              {i === 1 ? (
                <span
                  style={{
                    background:
                      "linear-gradient(90deg, #D4B87A 0%, #F0DEB8 50%, #D4B87A 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {line}
                </span>
              ) : (
                line
              )}
            </span>
          ))}
        </h1>

        {/* Sub */}
        <p
          className="text-white font-light max-w-xl mb-5 sm:mb-10 leading-relaxed"
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: "clamp(0.875rem, 1.5vw, 1.15rem)",
            opacity: textVisible ? 1 : 0,
            transform: textVisible ? "translateY(0)" : "translateY(14px)",
            transition:
              "opacity 0.65s ease-out 0.18s, transform 0.65s ease-out 0.18s",
          }}
        >
          {slides[current].sub}
        </p>

        {/* CTAs */}
        <div
          className="flex flex-col sm:flex-row gap-2.5 sm:gap-4 mb-5 sm:mb-10"
          style={{
            opacity: textVisible ? 1 : 0,
            transform: textVisible ? "translateY(0)" : "translateY(10px)",
            transition:
              "opacity 0.6s ease-out 0.25s, transform 0.6s ease-out 0.25s",
          }}
        >
          <button
            onClick={() => smoothScrollTo("consultation")}
            className="btn-dud btn-primary-gold w-full sm:w-auto justify-center"
            style={{ padding: "0.85rem 1.75rem" }}
          >
            <span>Book Free Consultation</span>
            <ArrowRight size={16} />
          </button>
          <button
            onClick={() => smoothScrollTo("portfolio")}
            className="w-full sm:w-auto"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
              padding: "0.85rem 1.75rem",
              background: "rgba(255,255,255,0.10)",
              color: "#fff",
              border: "1.5px solid rgba(255,255,255,0.30)",
              borderRadius: "12px",
              backdropFilter: "blur(10px)",
              fontFamily: "'Poppins', sans-serif",
              fontSize: "0.625rem",
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              cursor: "pointer",
              transition: "all 0.3s ease",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background =
                "rgba(255,255,255,0.18)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background =
                "rgba(255,255,255,0.10)";
            }}
          >
            View Our Projects
          </button>
        </div>

        {/* Trust badges */}
        <div
          className="hidden sm:flex flex-wrap gap-2 sm:gap-3"
          style={{
            opacity: textVisible ? 1 : 0,
            transition: "opacity 0.6s ease-out 0.32s",
          }}
        >
          {badges.map((badge, i) => (
            <span
              key={i}
              className="flex items-center gap-1.5 text-[10px] sm:text-xs font-semibold uppercase tracking-wider"
              style={{
                padding: "0.4rem 0.85rem",
                background: "rgba(200,169,106,0.15)",
                border: "1px solid rgba(200,169,106,0.30)",
                borderRadius: "999px",
                color: "rgba(255,255,255,0.88)",
                backdropFilter: "blur(4px)",
              }}
            >
              <span style={{ color: "#C8A96A" }}>✔</span> {badge}
            </span>
          ))}
        </div>
      </div>

      {/* ── Navigation arrows ── */}
      <div className="hidden sm:block">
        {(
          [
            { fn: prev, icon: <ChevronLeft size={22} />, side: "left" },
            { fn: next, icon: <ChevronRight size={22} />, side: "right" },
          ] as const
        ).map(({ fn, icon, side }) => (
          <button
            key={side}
            onClick={() => {
              fn();
              resetTimer();
            }}
            aria-label={`${side === "left" ? "Previous" : "Next"} slide`}
            className="absolute top-1/2 -translate-y-1/2 flex items-center justify-center text-white transition-all duration-300 hover:scale-110"
            style={{
              [side]: "1.25rem",
              zIndex: 20,
              width: "3rem",
              height: "3rem",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.12)",
              border: "1px solid rgba(255,255,255,0.22)",
              backdropFilter: "blur(8px)",
            }}
          >
            {icon}
          </button>
        ))}
      </div>

      {/* ── Dot indicators ── */}
      <div
        className="absolute bottom-5 sm:bottom-8 right-5 sm:right-12 md:right-16 lg:right-24 flex gap-2 items-center"
        style={{ zIndex: 20 }}
      >
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              goTo(i);
              resetTimer();
            }}
            aria-label={`Go to slide ${i + 1}`}
            className="rounded-full transition-all duration-300"
            style={{
              height: "3px",
              width: i === current ? "32px" : "10px",
              background:
                i === current ? "#C8A96A" : "rgba(255,255,255,0.35)",
            }}
          />
        ))}
      </div>

      {/* ── Slide counter ── */}
      <div
        className="absolute top-8 right-8 sm:right-12 md:right-16 lg:right-24 text-white/50 font-mono text-xs tracking-widest"
        style={{ zIndex: 20 }}
      >
        {String(current + 1).padStart(2, "0")}&nbsp;/&nbsp;
        {String(slides.length).padStart(2, "0")}
      </div>
    </section>
  );
}
