import { useState, useEffect, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";

/* ─────────────────────────────────────────────────────────────
   LazyImg — drop-in <img> replacement with:
   • IntersectionObserver (only loads when near viewport)
   • Shimmer skeleton placeholder
   • Blur-up fade-in reveal
   • Graceful error fallback
───────────────────────────────────────────────────────────── */

interface LazyImgProps extends React.ComponentProps<"img"> {
  src: string;
  alt: string;
  containerClassName?: string;
  /** Extra delay before starting the reveal animation (ms). Default 0 */
  revealDelay?: number;
  /** Set to true to skip lazy loading (for above-the-fold images) */
  priority?: boolean;
}

export function LazyImg({
  src,
  alt,
  className,
  containerClassName,
  style,
  revealDelay = 0,
  priority = false,
  ...props
}: LazyImgProps) {
  const [inView, setInView]     = useState(priority);
  const [loaded, setLoaded]     = useState(false);
  const [error, setError]       = useState(false);
  const [revealed, setRevealed] = useState(false);
  const containerRef            = useRef<HTMLDivElement>(null);

  // IntersectionObserver — start fetching when 800px away from viewport
  useEffect(() => {
    if (priority) return;
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect(); } },
      { rootMargin: "800px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [priority]);

  // Reset when src changes
  useEffect(() => {
    setLoaded(false);
    setError(false);
    setRevealed(false);
  }, [src]);

  const handleLoad = useCallback(() => {
    setLoaded(true);
    setTimeout(() => setRevealed(true), revealDelay);
  }, [revealDelay]);

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden", containerClassName)}
    >
      {/* Shimmer skeleton — visible while loading */}
      <div
        className={cn(
          "absolute inset-0 img-shimmer transition-opacity duration-500",
          revealed ? "opacity-0 pointer-events-none" : "opacity-100"
        )}
      />

      {/* Actual image — only created once in-view */}
      {inView && !error && (
        <img
          src={src}
          alt={alt}
          onLoad={handleLoad}
          onError={() => setError(true)}
          className={cn(
            "transition-all duration-300 ease-out",
            revealed
              ? "opacity-100 blur-none scale-100"
              : "opacity-0 blur-[4px] scale-[1.02]",
            className
          )}
          style={style}
          {...props}
        />
      )}

      {/* Error state */}
      {error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#111009] text-[#A08060]/40 gap-2">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21 15 16 10 5 21" />
          </svg>
          <span className="text-[10px] uppercase tracking-widest">Image unavailable</span>
        </div>
      )}
    </div>
  );
}


/* ─────────────────────────────────────────────────────────────
   OptimizedImage — original component, now powered by LazyImg
   Kept for backward compatibility with existing usages.
───────────────────────────────────────────────────────────── */

interface OptimizedImageProps extends React.ComponentProps<"img"> {
  src: string;
  alt: string;
  containerClassName?: string;
}

export function OptimizedImage({
  src,
  alt,
  className,
  containerClassName,
  style,
  ...props
}: OptimizedImageProps) {
  return (
    <LazyImg
      src={src}
      alt={alt}
      className={className}
      containerClassName={containerClassName}
      style={style}
      {...props}
    />
  );
}
