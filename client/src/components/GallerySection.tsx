import {
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { galleryImages } from "./galleryImages";

/* ─── layout constants ──────────────────────────────────────── */
const CARD_W        = 300;   // px — card width in layout (scale doesn't affect flow)
const CARD_H        = 400;   // px — consistent card height
const GAP           = 20;    // px gap between cards
const SCALE_ACTIVE  = 1.18;  // center card scale
const SCALE_NEAR    = 0.92;  // ±1 neighbour
const SCALE_FAR     = 0.80;  // ≥±2 neighbours
const FRICTION      = 0.88;  // momentum deceleration

export default function GallerySection() {
  const trackRef   = useRef<HTMLDivElement>(null);
  const animRef    = useRef<number>(0);
  const velRef     = useRef(0);
  const isDragging = useRef(false);
  const hasMoved   = useRef(false);   // true only if pointer moved > threshold (real drag)
  const dragStart  = useRef({ x: 0, scrollLeft: 0 });
  const lastX      = useRef(0);
  const lastT      = useRef(0);

  const [scales,  setScales]  = useState<number[]>(() => galleryImages.map(() => SCALE_FAR));
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [loaded,   setLoaded]   = useState<Set<number>>(new Set());
  const [errored,  setErrored]  = useState<Set<number>>(new Set());

  /* ── compute per-card scale from scroll position ─────────── */
  const updateScales = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;

    const trackRect   = el.getBoundingClientRect();
    const viewCenter  = trackRect.left + trackRect.width / 2;
    const cards       = el.querySelectorAll<HTMLElement>("[data-card]");
    const next: number[] = [];

    cards.forEach((card) => {
      const r    = card.getBoundingClientRect();
      const cardCenter = r.left + r.width / 2;
      const dist = Math.abs(cardCenter - viewCenter);
      const unit = CARD_W + GAP;

      let s: number;
      if (dist < unit * 0.5)       s = SCALE_ACTIVE;
      else if (dist < unit * 1.5)  s = SCALE_NEAR;
      else                          s = SCALE_FAR;

      // smooth interpolation within zone
      if (dist < unit * 0.5) {
        const t = dist / (unit * 0.5);
        s = SCALE_ACTIVE - (SCALE_ACTIVE - SCALE_NEAR) * t;
      } else if (dist < unit * 1.5) {
        const t = (dist - unit * 0.5) / unit;
        s = SCALE_NEAR - (SCALE_NEAR - SCALE_FAR) * t;
      }

      next.push(Number(s.toFixed(4)));
    });

    setScales(next);
  }, []);

  /* ── momentum scroll ─────────────────────────────────────── */
  const startMomentum = useCallback(() => {
    cancelAnimationFrame(animRef.current);
    const tick = () => {
      const el = trackRef.current;
      if (!el || Math.abs(velRef.current) < 0.4) { velRef.current = 0; return; }
      el.scrollLeft += velRef.current;
      velRef.current *= FRICTION;
      updateScales();
      animRef.current = requestAnimationFrame(tick);
    };
    animRef.current = requestAnimationFrame(tick);
  }, [updateScales]);

  /* ── run updateScales on scroll ──────────────────────────── */
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const onScroll = () => { updateScales(); };
    el.addEventListener("scroll", onScroll, { passive: true });
    // Initial calculation
    setTimeout(updateScales, 50);
    return () => el.removeEventListener("scroll", onScroll);
  }, [updateScales]);

  /* ── mouse wheel → horizontal ────────────────────────────── */
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (delta === 0) return;
      e.preventDefault();
      cancelAnimationFrame(animRef.current);
      velRef.current = 0;
      el.scrollLeft += delta * 1.3;
      updateScales();
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [updateScales]);

  /* ── pointer drag ───────────────────────────────────────── */
  const onPointerDown = (e: React.PointerEvent) => {
    const el = trackRef.current;
    if (!el) return;
    cancelAnimationFrame(animRef.current);
    velRef.current      = 0;
    isDragging.current  = true;
    hasMoved.current    = false;   // reset on each new touch/click
    dragStart.current   = { x: e.clientX, scrollLeft: el.scrollLeft };
    lastX.current       = e.clientX;
    lastT.current       = performance.now();
    el.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const el = trackRef.current;
    if (!el) return;
    const dx = e.clientX - dragStart.current.x;
    // Only treat as a real drag after 6px of movement
    if (Math.abs(dx) > 6) hasMoved.current = true;
    el.scrollLeft = dragStart.current.scrollLeft - dx;

    const now = performance.now();
    const dt  = now - lastT.current || 1;
    velRef.current = -(e.clientX - lastX.current) / dt * 16;
    lastX.current  = e.clientX;
    lastT.current  = now;
    updateScales();
  };

  const onPointerUp = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const el = trackRef.current;
    if (!el) return;
    el.releasePointerCapture(e.pointerId);
    startMomentum();
  };

  /* ── snap to nearest card on click ──────────────────────── */
  const snapTo = useCallback((idx: number) => {
    const el = trackRef.current;
    if (!el) return;
    const unit   = CARD_W + GAP;
    const totalW = el.scrollWidth;
    const visW   = el.clientWidth;
    // padding so first card can center
    const padStart = (visW - CARD_W) / 2;
    const target   = idx * unit - padStart + padStart; // card left from track start
    const cardLeft = idx * unit;
    const center   = cardLeft - (visW - CARD_W) / 2;
    cancelAnimationFrame(animRef.current);
    velRef.current = 0;
    el.scrollTo({ left: Math.max(0, Math.min(center, totalW - visW)), behavior: "smooth" });
  }, []);

  /* ── arrow navigation ────────────────────────────────────── */
  const activeIdx = useCallback(() => {
    const el = trackRef.current;
    if (!el) return 0;
    const visW    = el.clientWidth;
    const unit    = CARD_W + GAP;
    const center  = el.scrollLeft + (visW - CARD_W) / 2;
    return Math.round(center / unit);
  }, []);

  const arrowNav = (dir: -1 | 1) => {
    const idx = Math.max(0, Math.min(galleryImages.length - 1, activeIdx() + dir));
    snapTo(idx);
  };

  /* ── lightbox guards ─────────────────────────────────────── */
  useEffect(() => {
    document.body.style.overflow = lightbox !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightbox]);

  const handleNext = useCallback(() =>
    setLightbox(i => i !== null ? (i + 1) % galleryImages.length : i), []);
  const handlePrev = useCallback(() =>
    setLightbox(i => i !== null ? (i - 1 + galleryImages.length) % galleryImages.length : i), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (lightbox === null) return;
      if (e.key === "Escape")     setLightbox(null);
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft")  handlePrev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, handleNext, handlePrev]);

  const onLoad = (idx: number) =>
    setLoaded(prev => { const s = new Set(prev); s.add(idx); return s; });

  const onError = (idx: number) =>
    setErrored(prev => { const s = new Set(prev); s.add(idx); return s; });

  if (galleryImages.length === 0) return null;

  // Track height must accommodate the scaled active card
  const trackH = Math.ceil(CARD_H * SCALE_ACTIVE) + 60; // 60px breathing room

  return (
    <section
      id="gallery"
      className="py-20 sm:py-28 md:py-36 bg-[#F8F5F0] border-t border-[#E9E3D8] overflow-hidden"
      aria-label="Our Gallery"
    >
      {/* ── Header ─────────────────────────────────────────── */}
      <div className="max-w-[90rem] mx-auto px-4 sm:px-8 md:px-12 mb-10 sm:mb-16 text-center">
        <p
          className="text-[10px] uppercase tracking-[0.4em] text-[#C8A96A] font-bold mb-3"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          Visual Showcase
        </p>
        <h2 className="cinema-heading mb-4">Our Gallery</h2>
        <div className="cinema-accent-line mx-auto" />
        <p className="text-[#999] mt-6 font-light text-sm max-w-xl mx-auto leading-relaxed">
          Scroll or drag to explore every completed interior project. Each image
          gently expands as it reaches the centre of your screen.
        </p>
      </div>

      {/* ── Cinema Strip ───────────────────────────────────── */}
      <div
        className="relative select-none group/gallery"
        style={{ height: `${trackH}px` }}
      >
        {/* Left vignette */}
        <div
          className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 sm:w-40 z-20"
          style={{ background: "linear-gradient(to right, #F8F5F0 0%, transparent 100%)" }}
        />
        {/* Right vignette */}
        <div
          className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 sm:w-40 z-20"
          style={{ background: "linear-gradient(to left, #F8F5F0 0%, transparent 100%)" }}
        />

        {/* Arrow — left */}
        <button
          onClick={() => arrowNav(-1)}
          aria-label="Previous image"
          className="
            absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-30
            w-11 h-11 rounded-full
            bg-white/90 backdrop-blur-sm
            border border-[#E9E3D8]
            shadow-[0_4px_20px_rgba(0,0,0,0.09)]
            text-[#C8A96A]
            flex items-center justify-center
            opacity-0 group-hover/gallery:opacity-100
            -translate-x-3 group-hover/gallery:translate-x-0
            transition-all duration-400 ease-out
            hover:bg-[#C8A96A] hover:text-white hover:border-[#C8A96A]
            hover:shadow-[0_6px_24px_rgba(200,169,106,0.35)]
          "
        >
          <ChevronLeft size={18} strokeWidth={2.2} />
        </button>

        {/* Arrow — right */}
        <button
          onClick={() => arrowNav(1)}
          aria-label="Next image"
          className="
            absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-30
            w-11 h-11 rounded-full
            bg-white/90 backdrop-blur-sm
            border border-[#E9E3D8]
            shadow-[0_4px_20px_rgba(0,0,0,0.09)]
            text-[#C8A96A]
            flex items-center justify-center
            opacity-0 group-hover/gallery:opacity-100
            translate-x-3 group-hover/gallery:translate-x-0
            transition-all duration-400 ease-out
            hover:bg-[#C8A96A] hover:text-white hover:border-[#C8A96A]
            hover:shadow-[0_6px_24px_rgba(200,169,106,0.35)]
          "
        >
          <ChevronRight size={18} strokeWidth={2.2} />
        </button>

        {/* Scrollable track */}
        <div
          ref={trackRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          className="absolute inset-0 flex items-center overflow-x-auto overflow-y-visible [&::-webkit-scrollbar]:hidden"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            cursor: "grab",
            // Horizontal padding so first & last card can reach centre
            paddingLeft:  `calc(50vw - ${CARD_W / 2}px)`,
            paddingRight: `calc(50vw - ${CARD_W / 2}px)`,
            gap: `${GAP}px`,
          }}
        >
          {galleryImages.map((src, idx) => {
            const scale    = scales[idx] ?? SCALE_FAR;
            const isActive = scale > (SCALE_NEAR + SCALE_ACTIVE) / 2;
            const isLoaded = loaded.has(idx);

            // Hide cards with blank or broken images entirely
            if (errored.has(idx)) return null;

            return (
              <div
                key={idx}
                data-card
                className="flex-shrink-0"
                style={{ width: `${CARD_W}px` }}
              >
                <div
                  className="relative overflow-hidden rounded-2xl cursor-pointer"
                  style={{
                    width:  `${CARD_W}px`,
                    height: `${CARD_H}px`,
                    transform: `scale(${scale})`,
                    transformOrigin: "center center",
                    transition: "transform 0.55s cubic-bezier(0.25,0.46,0.45,0.94), box-shadow 0.55s ease",
                    boxShadow: isActive
                      ? "0 24px 64px rgba(0,0,0,0.22), 0 4px 20px rgba(200,169,106,0.15)"
                      : "0 4px 16px rgba(0,0,0,0.07)",
                    willChange: "transform, box-shadow",
                  }}
                  onClick={() => {
                    // Open lightbox on tap (hasMoved=false) or click without drag
                    if (!hasMoved.current) setLightbox(idx);
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label={`View project ${idx + 1}`}
                  onKeyDown={(e) => e.key === "Enter" && setLightbox(idx)}
                >
                  {/* Skeleton */}
                  {!isLoaded && (
                    <div className="absolute inset-0 bg-gradient-to-r from-[#E9E3D8] via-[#F0EBE3] to-[#E9E3D8] animate-pulse" />
                  )}

                  {/* Image */}
                  <img
                    src={src}
                    alt={`Interior project ${idx + 1}`}
                    onLoad={() => onLoad(idx)}
                    onError={() => onError(idx)}
                    loading={idx < 5 ? "eager" : "lazy"}
                    draggable={false}
                    className={`w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-[1.04] ${isLoaded ? "opacity-100" : "opacity-0"}`}
                    style={{ transition: "opacity 0.4s ease, transform 0.7s ease" }}
                  />

                  {/* Gradient overlay — always present, dims when not active */}
                  <div
                    className="absolute inset-0 pointer-events-none transition-opacity duration-500"
                    style={{
                      background: "linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 55%)",
                      opacity: isActive ? 0.6 : 0.35,
                    }}
                  />

                  {/* Active: thin gold border glow */}
                  {isActive && (
                    <div
                      className="absolute inset-0 rounded-2xl pointer-events-none"
                      style={{
                        boxShadow: "inset 0 0 0 1.5px rgba(200,169,106,0.35)",
                      }}
                    />
                  )}

                  {/* Image counter — visible only on active */}
                  <div
                    className="absolute bottom-3 left-4 transition-all duration-500"
                    style={{ opacity: isActive ? 1 : 0, transform: isActive ? "translateY(0)" : "translateY(6px)" }}
                  >
                    <span
                      className="text-white/60 text-[10px] tracking-[0.22em] font-light"
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                      {String(idx + 1).padStart(2, "0")} / {String(galleryImages.length).padStart(2, "0")}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Trailing spacer */}
          <div className="flex-shrink-0 w-1" aria-hidden />
        </div>
      </div>

      {/* ── Hint strip ─────────────────────────────────────── */}
      <div className="flex justify-center mt-8 sm:mt-10">
        <p
          className="text-[9px] uppercase tracking-[0.35em] text-[#C0B8AE] font-medium flex items-center gap-3"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          <span className="w-8 h-px bg-[#C8A96A]/40 inline-block" />
          Drag or scroll to explore
          <span className="w-8 h-px bg-[#C8A96A]/40 inline-block" />
        </p>
      </div>

      {/* ── Lightbox ───────────────────────────────────────── */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[500] flex items-center justify-center bg-black/96 backdrop-blur-xl"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
          style={{ animation: "lbIn 0.28s ease" }}
        >
          {/* Close */}
          <button
            onClick={() => setLightbox(null)}
            className="
              absolute top-5 right-5 sm:top-8 sm:right-8 z-50
              w-11 h-11 rounded-full bg-white/8 hover:bg-white/16
              border border-white/12
              flex items-center justify-center
              text-white/60 hover:text-white
              transition-all duration-300 hover:scale-110
            "
            aria-label="Close"
          >
            <X size={17} strokeWidth={2} />
          </button>

          {/* Prev */}
          <button
            onClick={(e) => { e.stopPropagation(); handlePrev(); }}
            className="
              absolute left-3 sm:left-8 top-1/2 -translate-y-1/2 z-50
              w-12 h-12 rounded-full bg-white/8 hover:bg-white/18
              border border-white/12
              flex items-center justify-center
              text-white/70 hover:text-white
              transition-all duration-300 hover:scale-110
            "
            aria-label="Previous"
          >
            <ChevronLeft size={20} strokeWidth={1.8} />
          </button>

          {/* Next */}
          <button
            onClick={(e) => { e.stopPropagation(); handleNext(); }}
            className="
              absolute right-3 sm:right-8 top-1/2 -translate-y-1/2 z-50
              w-12 h-12 rounded-full bg-white/8 hover:bg-white/18
              border border-white/12
              flex items-center justify-center
              text-white/70 hover:text-white
              transition-all duration-300 hover:scale-110
            "
            aria-label="Next"
          >
            <ChevronRight size={20} strokeWidth={1.8} />
          </button>

          {/* Fullscreen image */}
          <div
            className="relative max-w-6xl w-full h-full flex items-center justify-center p-5 sm:p-14"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              key={lightbox}
              src={galleryImages[lightbox]}
              alt={`Interior project ${lightbox + 1}`}
              className="max-w-full max-h-[88dvh] object-contain rounded-2xl"
              style={{
                boxShadow: "0 0 120px rgba(0,0,0,0.8)",
                animation: "imgIn 0.35s cubic-bezier(0.34,1.3,0.64,1)",
              }}
            />
          </div>

          {/* Counter */}
          <div
            className="
              absolute bottom-6 left-1/2 -translate-x-1/2
              text-white/40 text-[11px] tracking-[0.3em] font-light
            "
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            {String(lightbox + 1).padStart(2, "0")} &thinsp;/&thinsp; {String(galleryImages.length).padStart(2, "0")}
          </div>
        </div>
      )}

      <style>{`
        @keyframes lbIn  { from { opacity:0 } to { opacity:1 } }
        @keyframes imgIn { from { opacity:0; transform:scale(0.94) } to { opacity:1; transform:scale(1) } }
      `}</style>
    </section>
  );
}
