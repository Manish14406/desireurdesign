import { useState, useRef, useEffect } from "react";
import { GripVertical } from "lucide-react";

export default function TransformationSlider() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = (x / rect.width) * 100;
    setSliderPosition(percent);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  const handleInteractionStart = (clientX: number) => {
    setIsDragging(true);
    handleMove(clientX);
  };

  const handleInteractionEnd = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleInteractionEnd);
      window.addEventListener("touchmove", handleTouchMove, { passive: false });
      window.addEventListener("touchend", handleInteractionEnd);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleInteractionEnd);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleInteractionEnd);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleInteractionEnd);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleInteractionEnd);
    };
  }, [isDragging]);

  return (
    <section className="py-20 sm:py-28 md:py-40 bg-white border-t border-[#E9E3D8] overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 md:px-12">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <p className="text-[10px] uppercase tracking-[0.4em] text-[#C8A96A] font-bold mb-3"
             style={{ fontFamily: "'Poppins', sans-serif" }}>
            The Transformation
          </p>
          <h2 className="cinema-heading mb-4">Vision to Reality</h2>
          <div className="cinema-accent-line mx-auto" />
          <p className="text-[#666] mt-6 font-light text-sm sm:text-base max-w-xl mx-auto">
            Drag the slider to see how we turn an empty space into a breathtaking luxury home.
          </p>
        </div>

        {/* Slider Container */}
        <div
          ref={containerRef}
          className="relative w-full aspect-[4/3] sm:aspect-[16/9] max-h-[80vh] rounded-3xl overflow-hidden cursor-ew-resize select-none shadow-[0_16px_64px_rgba(0,0,0,0.15)] group"
          onMouseDown={(e) => handleInteractionStart(e.clientX)}
          onTouchStart={(e) => handleInteractionStart(e.touches[0].clientX)}
        >
          {/* AFTER Image (Background) */}
          <img
            src="/images/hero_luxury_kitchen.webp"
            alt="Completed Luxury Kitchen"
            className="absolute inset-0 w-full h-full object-cover"
            draggable="false"
          />
          <div className="absolute bottom-4 sm:bottom-8 right-4 sm:right-8 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full text-white text-[10px] sm:text-xs font-bold uppercase tracking-widest border border-white/20">
            Completed Home
          </div>

          {/* BEFORE Image (Clipped Foreground) */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ width: `${sliderPosition}%` }}
          >
            <img
              src="/images/open_kitchen.webp"
              alt="Empty Kitchen Space"
              className="absolute inset-0 max-w-none h-full object-cover"
              style={{ width: containerRef.current?.offsetWidth || "100%" }}
              draggable="false"
            />
            <div className="absolute bottom-4 sm:bottom-8 left-4 sm:bottom-8 left-4 sm:left-8 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full text-white text-[10px] sm:text-xs font-bold uppercase tracking-widest border border-white/20">
              Before
            </div>
          </div>

          {/* Slider Handle */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_20px_rgba(0,0,0,0.5)]"
            style={{ left: `${sliderPosition}%`, transform: "translateX(-50%)" }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 sm:w-12 h-10 sm:h-12 bg-white rounded-full flex items-center justify-center shadow-xl border-4 border-white text-[#C8A96A] transition-transform group-hover:scale-110">
              <GripVertical size={20} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
