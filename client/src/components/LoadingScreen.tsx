import { useEffect, useRef, useState } from "react";
import { useLoading, LOADER_SESSION_KEY } from "@/contexts/LoadingContext";

/**
 * Animation phases:
 *  initial  – mounted, logo invisible (opacity 0, scaled down)
 *  entering – logo fades in + scales up to full size
 *  holding  – logo fully visible, tagline fades in
 *  exiting  – logo flies to nav position; white overlay fades out
 *  gone     – component unmounts
 */
type Phase = "initial" | "entering" | "holding" | "exiting" | "gone";

export default function LoadingScreen() {
  const { navLogoRef, setLoadingComplete } = useLoading();

  const hasShown =
    typeof sessionStorage !== "undefined" &&
    sessionStorage.getItem(LOADER_SESSION_KEY) === "1";

  const [phase, setPhase] = useState<Phase>(hasShown ? "gone" : "initial");
  const [flyStyle, setFlyStyle] = useState<React.CSSProperties>({});
  const [taglineOffset, setTaglineOffset] = useState(80);
  const logoRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (hasShown) {
      setLoadingComplete();
      return;
    }

    sessionStorage.setItem(LOADER_SESSION_KEY, "1");

    // Two nested rAFs: ensures the browser has painted the initial state
    // before we kick off the CSS transition (prevents "instant jump").
    let raf1: number;
    let raf2: number;
    raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        // Measure the actual rendered logo height for the tagline offset
        if (logoRef.current) {
          const rect = logoRef.current.getBoundingClientRect();
          setTaglineOffset(rect.height / 2 + 20);
        }
        setPhase("entering");
      });
    });

    // Entering transition (~1s) → hold
    const t1 = setTimeout(() => setPhase("holding"), 1100);

    // After hold → fly to nav
    const t2 = setTimeout(() => {
      if (navLogoRef.current && logoRef.current) {
        const navRect = navLogoRef.current.getBoundingClientRect();
        const loaderRect = logoRef.current.getBoundingClientRect();

        // Actual rendered centre of the loader logo
        const loaderCX = loaderRect.left + loaderRect.width / 2;
        const loaderCY = loaderRect.top + loaderRect.height / 2;

        // Target centre (nav logo)
        const navCX = navRect.left + navRect.width / 2;
        const navCY = navRect.top + navRect.height / 2;

        // Delta to move the loader logo centre to the nav logo centre.
        // We express it as pixels added on top of the existing translate(-50%,-50%).
        const dx = navCX - loaderCX;
        const dy = navCY - loaderCY;

        // Uniform scale: shrink loader logo to match the nav logo height
        const scale = navRect.height / loaderRect.height;

        setFlyStyle({
          transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) scale(${scale})`,
          opacity: 0,
          transition:
            "transform 0.9s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.5s ease-in-out 0.15s",
        });
      }
      setPhase("exiting");
    }, 1800);

    // After fly completes → unmount and reveal nav logo
    const t3 = setTimeout(() => {
      setPhase("gone");
      setLoadingComplete();
    }, 2850);

    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (phase === "gone") return null;

  /* ────────────────────────────────────────────────────────────
     Responsive logo height via CSS clamp:
       • Mobile  (<480px)  → ~160px
       • Tablet  (~768px)  → ~200px
       • Desktop (>1024px) → ~240px
  ──────────────────────────────────────────────────────────── */
  const logoBase: React.CSSProperties = {
    position: "fixed",
    top: "50%",
    left: "50%",
    // Responsive size: grows from 160px on small screens to 240px on wide screens
    height: "clamp(160px, 22vw, 240px)",
    maxWidth: "75vw",
    width: "auto",
    objectFit: "contain",
    zIndex: 10000,
    pointerEvents: "none",
    willChange: "transform, opacity",
    display: "block",
  };

  const logoStyle: React.CSSProperties = (() => {
    switch (phase) {
      case "initial":
        return {
          ...logoBase,
          transform: "translate(-50%, -50%) scale(0.78)",
          opacity: 0,
        };
      case "entering":
        return {
          ...logoBase,
          transform: "translate(-50%, -50%) scale(1)",
          opacity: 1,
          transition:
            "transform 0.95s cubic-bezier(0.34, 1.1, 0.64, 1), opacity 0.75s ease-out",
        };
      case "holding":
        return {
          ...logoBase,
          transform: "translate(-50%, -50%) scale(1)",
          opacity: 1,
        };
      case "exiting":
        return {
          ...logoBase,
          ...flyStyle,
        };
      default:
        return logoBase;
    }
  })();

  /* ── White overlay ── */
  const overlayStyle: React.CSSProperties = {
    position: "fixed",
    inset: 0,
    backgroundColor: "#FFFFFF",
    zIndex: 9999,
    opacity: phase === "exiting" ? 0 : 1,
    transition:
      phase === "exiting"
        ? "opacity 0.9s cubic-bezier(0.4, 0, 0.2, 1)"
        : "none",
    pointerEvents: phase === "exiting" ? "none" : "auto",
  };

  return (
    <>
      {/* Full-screen white overlay */}
      <div style={overlayStyle} aria-hidden="true" />

      {/* Centred logo — flies to nav on exit */}
      <img
        ref={logoRef}
        src="/images/dudd.png"
        alt="Design Ur Desire"
        style={logoStyle}
        aria-hidden="true"
      />

      {/* Subtle gold tagline — positioned dynamically below the logo */}
      {(phase === "entering" || phase === "holding") && (
        <p
          style={{
            position: "fixed",
            top: `calc(50% + ${taglineOffset}px)`,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 10000,
            color: "#C8A96A",
            fontSize: "clamp(9px, 1.2vw, 11px)",
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 600,
            letterSpacing: "0.38em",
            textTransform: "uppercase",
            pointerEvents: "none",
            whiteSpace: "nowrap",
            opacity: phase === "holding" ? 1 : 0,
            transition: "opacity 0.65s ease-out 0.25s",
          }}
          aria-hidden="true"
        >
          Premium Interiors&nbsp;·&nbsp;Bengaluru
        </p>
      )}
    </>
  );
}
