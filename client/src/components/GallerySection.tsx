import { useState, useEffect, useCallback, useRef } from "react";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

import { galleryImages } from "./galleryImages";

export default function GallerySection() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
  const sliderRef = useRef<HTMLDivElement>(null);

  // Prevent scrolling when lightbox is open
  useEffect(() => {
    if (selectedImage !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedImage]);

  const handleNext = useCallback(() => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % galleryImages.length);
    }
  }, [selectedImage]);

  const handlePrev = useCallback(() => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage - 1 + galleryImages.length) % galleryImages.length);
    }
  }, [selectedImage]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage === null) return;
      if (e.key === "Escape") setSelectedImage(null);
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage, handleNext, handlePrev]);

  const handleImageLoad = (index: number) => {
    setLoadedImages(prev => {
      const next = new Set(prev);
      next.add(index);
      return next;
    });
  };

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -window.innerWidth / 1.5, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: window.innerWidth / 1.5, behavior: "smooth" });
    }
  };

  if (galleryImages.length === 0) return null; // Hide section if no images are present

  return (
    <section
      id="gallery"
      className="py-20 sm:py-28 md:py-40 bg-white border-t border-[#E9E3D8] overflow-hidden"
      aria-label="Our Gallery"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 md:px-12">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-16">
          <p className="text-[10px] uppercase tracking-[0.4em] text-[#C8A96A] font-bold mb-3"
             style={{ fontFamily: "'Poppins', sans-serif" }}>
            Visual Showcase
          </p>
          <h2 className="cinema-heading mb-4">Our Gallery</h2>
          <div className="cinema-accent-line mx-auto" />
          <p className="text-[#666] mt-6 font-light text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Explore our completed interior design projects, showcasing elegant craftsmanship, premium materials, and thoughtfully designed living spaces.
          </p>
        </div>
      </div>

      {/* Manual Slider Container */}
      <div className="relative w-full max-w-[1600px] mx-auto px-4 sm:px-8 md:px-12 group/slider">
        {/* Nav Buttons */}
        <button 
          onClick={scrollLeft}
          className="absolute left-2 sm:left-4 md:left-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white hover:bg-[#F8F5F0] text-[#C8A96A] shadow-[0_4px_20px_rgba(0,0,0,0.1)] border border-[#E9E3D8] rounded-full flex items-center justify-center opacity-0 group-hover/slider:opacity-100 transition-all duration-300 transform -translate-x-4 group-hover/slider:translate-x-0"
          aria-label="Scroll left"
        >
          <ChevronLeft size={24} />
        </button>

        <button 
          onClick={scrollRight}
          className="absolute right-2 sm:right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white hover:bg-[#F8F5F0] text-[#C8A96A] shadow-[0_4px_20px_rgba(0,0,0,0.1)] border border-[#E9E3D8] rounded-full flex items-center justify-center opacity-0 group-hover/slider:opacity-100 transition-all duration-300 transform translate-x-4 group-hover/slider:translate-x-0"
          aria-label="Scroll right"
        >
          <ChevronRight size={24} />
        </button>

        {/* Scrollable Track */}
        <div 
          ref={sliderRef}
          className="flex gap-4 sm:gap-6 lg:gap-8 overflow-x-auto snap-x snap-mandatory py-4 [&::-webkit-scrollbar]:hidden"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {galleryImages.map((src, idx) => (
            <div 
              key={idx} 
              className="snap-start flex-shrink-0 w-[70vw] sm:w-[45vw] md:w-[30vw] lg:w-[22vw] max-w-sm"
            >
              <div
                className="group relative aspect-[4/5] cursor-pointer overflow-hidden rounded-2xl sm:rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_40px_rgba(200,169,106,0.15)] transition-all duration-500 bg-[#F8F5F0]"
                onClick={() => setSelectedImage(idx)}
              >
                {!loadedImages.has(idx) && (
                  <div className="absolute inset-0 bg-[#E9E3D8] animate-pulse" />
                )}
                <img
                  src={src}
                  alt={`Gallery Image ${idx + 1}`}
                  onLoad={() => handleImageLoad(idx)}
                  className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-105 ${loadedImages.has(idx) ? 'opacity-100' : 'opacity-0'}`}
                  loading={idx < 4 ? "eager" : "lazy"}
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 transform scale-75 group-hover:scale-100 transition-all duration-300">
                    <ZoomIn size={24} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage !== null && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-lg animate-in fade-in duration-300"
          onClick={() => setSelectedImage(null)}
        >
          {/* Close Button */}
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 sm:top-10 sm:right-10 text-white/70 hover:text-white transition-colors z-50 p-2"
            aria-label="Close lightbox"
          >
            <X size={32} />
          </button>
          
          {/* Navigation Buttons */}
          {galleryImages.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                className="absolute left-4 sm:left-10 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center text-white transition-all z-50 border border-white/20 hover:scale-110"
                aria-label="Previous image"
              >
                <ChevronLeft size={24} />
              </button>

              <button
                onClick={(e) => { e.stopPropagation(); handleNext(); }}
                className="absolute right-4 sm:right-10 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center text-white transition-all z-50 border border-white/20 hover:scale-110"
                aria-label="Next image"
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}

          {/* Fullscreen Image Container */}
          <div className="relative w-full max-w-7xl h-full max-h-[100dvh] flex items-center justify-center p-4 sm:p-12 md:p-20">
            <img
              key={selectedImage}
              src={galleryImages[selectedImage]}
              alt={`Fullscreen Gallery Image ${selectedImage + 1}`}
              className="max-w-full max-h-full object-contain rounded-lg shadow-[0_0_80px_rgba(0,0,0,0.5)] animate-in fade-in zoom-in-95 duration-300"
              onClick={(e) => e.stopPropagation()}
            />
            
            {/* Image counter */}
            {galleryImages.length > 1 && (
              <div className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 text-white/70 font-light text-sm font-['Poppins'] tracking-widest bg-black/50 px-4 py-1.5 rounded-full backdrop-blur-md border border-white/10">
                {selectedImage + 1} / {galleryImages.length}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
