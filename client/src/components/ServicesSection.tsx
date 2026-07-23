import { useState } from "react";
import { ChevronRight, ChevronLeft, X } from "lucide-react";

/* ── Premium SVG line icons — consistent 24×24 viewBox, 1.5px stroke ── */
const HomeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M3 10.5L12 3l9 7.5V21H15v-6H9v6H3V10.5z" />
  </svg>
);

const SofaIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M2 13a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v2H2v-2z" />
    <path d="M4 11V7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4" />
    <path d="M4 19v2M20 19v2" />
  </svg>
);

const KitchenIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <rect x="2" y="6" width="20" height="15" rx="1" />
    <path d="M2 10h20" />
    <path d="M7 10v11M12 10v11" />
    <circle cx="17" cy="4" r="1.5" />
    <path d="M5 3v3" />
  </svg>
);
const WardrobeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <rect x="2" y="3" width="20" height="19" rx="1" />
    <path d="M12 3v19" />
    <circle cx="9" cy="12" r="1" />
    <circle cx="15" cy="12" r="1" />
  </svg>
);
const TvIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <rect x="2" y="4" width="20" height="14" rx="2" />
    <path d="M8 20h8M12 18v2" />
  </svg>
);
const DiamondIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <polygon points="12,2 22,8 22,16 12,22 2,16 2,8" />
    <path d="M2 8l10 6 10-6" />
  </svg>
);
const BookshelfIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <rect x="4" y="3" width="4" height="18" rx="1" />
    <rect x="10" y="7" width="4" height="14" rx="1" />
    <rect x="16" y="5" width="4" height="16" rx="1" />
    <path d="M2 21h20" />
  </svg>
);
const CompassIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <circle cx="12" cy="12" r="10" />
    <polygon points="16.24,7.76 14.12,14.12 7.76,16.24 9.88,9.88" />
  </svg>
);
const SunIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
  </svg>
);
const LightIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M9 18h6M10 22h4M12 2a7 7 0 0 1 7 7c0 2.6-1.4 4.9-3.5 6.2L15 18H9l-.5-2.8A7 7 0 0 1 12 2z" />
  </svg>
);
const HammerIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M15 5L19 9" />
    <path d="M13.5 6.5l-9 9a2 2 0 0 0 2.83 2.83l9-9" />
    <path d="M14 4l6 6-1.5 1.5" />
  </svg>
);

const BedIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M2 4v16" />
    <path d="M2 8h18a2 2 0 0 1 2 2v10" />
    <path d="M2 17h20" />
    <path d="M6 8v9" />
  </svg>
);

const TempleIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M12 2l4 5h-8z" />
    <path d="M8 7v10M16 7v10" />
    <path d="M6 17h12v4H6z" />
    <path d="M12 17v4" />
  </svg>
);

/* ── Category groupings ── */
const serviceCategories = [
  {
    category: "Interior Spaces",
    services: [
      {
        icon: <HomeIcon />,
        title: "Residential Interior Design",
        desc: "Complete home interior solutions tailored to your lifestyle and aspirations.",
        image: "/gallery/res1.jpeg",
        images: ["/gallery/res1.jpeg", "/gallery/res2.jpeg", "/gallery/res3.jpeg", "/gallery/res4.jpeg"],
      },
      {
        icon: <SofaIcon />,
        title: "Living Room Design",
        desc: "Elegant, functional living spaces designed for comfort, style and conversation.",
        image: "/gallery/liv1.jpeg",
        images: ["/gallery/liv1.jpeg", "/gallery/liv2.jpeg", "/gallery/liv3.jpeg", "/gallery/liv4.jpeg"],
      },
      {
        icon: <KitchenIcon />,
        title: "Modular Kitchen",
        desc: "Smart, beautiful kitchens with premium finishes, branded hardware & smart storage.",
        image: "/images/modular_kitchen_realistic.png",
        images: ["/images/modular_kitchen_realistic.png", "/images/luxury_kitchen.webp", "/images/island_kitchen.webp", "/images/parallel_kitchen.webp"],
      },
      {
        icon: <WardrobeIcon />,
        title: "Wardrobes & Storage",
        desc: "Floor-to-ceiling custom wardrobes with intelligent organisation and premium finishes.",
        image: "/images/wardrobes2.webp",
        images: ["/images/wardrobes2.webp", "/images/wardrobes1.webp", "/images/wardrobesnew4.webp", "/images/luxury_wardrobe.webp"],
      },
      {
        icon: <BedIcon />,
        title: "Bedroom Interior Design",
        desc: "Transform your bedroom into a luxurious sanctuary for rest and relaxation.",
        image: "/gallery/bed1.jpeg",
        images: ["/gallery/bed1.jpeg", "/gallery/bed2.jpeg", "/gallery/bed3.jpeg", "/gallery/bed4.jpeg", "/gallery/bed5.jpeg"],
      },
    ],
  },
  {
    category: "Custom Units",
    services: [
      {
        icon: <TvIcon />,
        title: "TV Unit",
        desc: "Designer TV panels and entertainment units that anchor your living space beautifully.",
        image: "/images/TVunit.webp",
        images: ["/images/TVunit.webp", "/images/TVunits1.webp", "/images/Tvunits2.webp"],
      },
      {
        icon: <BookshelfIcon />,
        title: "Crockery Unit",
        desc: "Bespoke crockery display units combining elegance with smart, accessible storage.",
        image: "/images/crockeryunit1.webp",
        images: ["/images/crockeryunit1.webp", "/images/crockeryunit4.webp", "/images/crockeryuntnew2.webp"],
      },
      {
        icon: <TempleIcon />,
        title: "Temple Design",
        desc: "Beautifully crafted puja units and temple spaces for spiritual serenity.",
        image: "/gallery/temple1.jpeg",
        images: ["/gallery/temple1.jpeg", "/gallery/temple2.jpeg", "/gallery/temple3.jpeg", "/gallery/temple4.jpeg"],
      },
    ],
  },
  {
    category: "Design Services",
    services: [
      {
        icon: <CompassIcon />,
        title: "Space Planning",
        desc: "Optimising every square foot for flow, function and timeless aesthetic balance.",
        image: "/images/luxury_wall_panels.webp",
        images: ["/images/luxury_wall_panels.webp", "/images/falseceiling1.webp"],
      },
      {
        icon: <SunIcon />,
        title: "Vastu Consultation",
        desc: "Ancient Vastu Shastra principles blended with modern design for harmony and prosperity.",
        image: "/images/blog_vastu.png",
        images: ["/images/blog_vastu.png", "/images/complete_home_interior.webp"],
      },
    ],
  },
  {
    category: "Renovation",
    services: [
      {
        icon: <LightIcon />,
        title: "False Ceiling & Lighting",
        desc: "Stunning ceiling designs with integrated ambient, task and accent lighting systems.",
        image: "/images/falseceiling1.webp",
        images: ["/images/falseceiling1.webp", "/images/falseceiling2.webp", "/images/falseceiling3.webp", "/gallery/false.png"],
      },
      {
        icon: <HammerIcon />,
        title: "Renovation & Makeovers",
        desc: "Complete home makeovers that breathe new life and luxury into existing spaces.",
        image: "/images/hero_luxury_kitchen.webp",
        images: ["/images/hero_luxury_kitchen.webp", "/images/open_kitchen.webp", "/images/l_shaped_kitchen.webp"],
      },
    ],
  },
];

export default function ServicesSection() {
  const [modalImages, setModalImages] = useState<string[]>([]);
  const [modalTitle, setModalTitle] = useState("");
  const [modalIndex, setModalIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [imgLoading, setImgLoading] = useState(false);

  const openModal = (images: string[], title: string) => {
    setModalImages(images);
    setModalTitle(title);
    setModalIndex(0);
    setImgLoading(true);
    setIsOpen(true);
  };

  const closeModal = () => setIsOpen(false);

  const nextImg = () => {
    setImgLoading(true);
    setModalIndex((p) => (p + 1) % modalImages.length);
  };
  const prevImg = () => {
    setImgLoading(true);
    setModalIndex((p) => (p - 1 + modalImages.length) % modalImages.length);
  };

  return (
    <section
      id="services"
      className="py-20 sm:py-28 md:py-40 px-4 sm:px-8 md:px-12 bg-white border-t border-[#E9E3D8]"
      aria-label="Our Services"
    >
      <div className="max-w-[90rem] mx-auto">

        {/* ── Trust Line Header ── */}
        <div className="mb-12 sm:mb-20">
          <p className="text-[10px] uppercase tracking-[0.4em] text-[#C8A96A] font-bold mb-3"
             style={{ fontFamily: "'Poppins', sans-serif" }}>
            What We Do
          </p>
          <h2 className="cinema-heading mb-4">Our<br />Services</h2>
          <div className="cinema-accent-line" />
          <p className="text-[#666] mt-6 font-light text-sm sm:text-base max-w-2xl leading-relaxed">
            Everything You Need to Create Your Dream Home —<br className="hidden sm:block" />
            Designed and Executed Under One Roof.
          </p>
        </div>

        {/* ── Categorised service groups ── */}
        <div className="space-y-16 sm:space-y-20">
          {serviceCategories.map((group) => (
            <div key={group.category}>
              {/* Category label */}
              <div className="flex items-center gap-4 mb-8">
                <span className="text-[9px] font-black uppercase tracking-[0.35em] text-[#C8A96A]"
                      style={{ fontFamily: "'Poppins', sans-serif" }}>
                  {group.category}
                </span>
                <div className="flex-1 h-px bg-gradient-to-r from-[#E9E3D8] to-transparent" />
              </div>

              {/* Service cards grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
                {group.services.map((service, idx) => (
                  <div
                    key={idx}
                    onClick={() => openModal(service.images, service.title)}
                    className="service-card group relative rounded-2xl overflow-hidden cursor-pointer bg-white border border-[#E9E3D8] flex flex-col h-full"
                  >
                    {/* Image with zoom on hover */}
                    <div className="h-48 overflow-hidden bg-[#F8F5F0] shrink-0">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="service-card-img w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-5 flex flex-col flex-grow">
                      {/* Icon chip */}
                      <div className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-[#F8F5F0] border border-[#E9E3D8] text-[#C8A96A] mb-3 group-hover:bg-[#C8A96A] group-hover:text-white group-hover:border-[#C8A96A] transition-all duration-300 shrink-0">
                        {service.icon}
                      </div>
                      <h3
                        className="text-sm font-black uppercase tracking-tight text-[#2B2B2B] mb-2 leading-snug group-hover:text-[#C8A96A] transition-colors duration-300 shrink-0"
                        style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                      >
                        {service.title}
                      </h3>
                      <p className="text-[#999] text-xs font-light leading-relaxed mb-4 flex-grow">
                        {service.desc}
                      </p>

                      {/* Animated CTA */}
                      <span className="service-cta mt-auto inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#C8A96A] shrink-0">
                        View Gallery <ChevronRight size={12} className="service-cta-arrow" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Image Modal ── */}
      {isOpen && (
        <div
          className="modal-backdrop fixed inset-0 z-[200] flex items-center justify-center bg-black/85 p-4 sm:p-8 backdrop-blur-md"
          onClick={closeModal}
        >
          <div
            className="modal-panel max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4 px-1">
              <h3
                className="text-lg sm:text-2xl font-black uppercase tracking-tight text-white"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                {modalTitle}
              </h3>
              <button onClick={closeModal} className="btn-icon-round w-10 h-10">
                <X size={18} />
              </button>
            </div>

            {/* Image frame */}
            <div className="relative rounded-2xl overflow-hidden bg-[#111] aspect-video">

              {/* Shimmer skeleton shown while image loads */}
              {imgLoading && (
                <div className="absolute inset-0 z-10 modal-img-shimmer" />
              )}

              {/* Spinner centred over skeleton */}
              {imgLoading && (
                <div className="absolute inset-0 z-20 flex items-center justify-center">
                  <div className="modal-spinner" />
                </div>
              )}

              <img
                key={modalIndex}
                src={modalImages[modalIndex]}
                alt={`${modalTitle} ${modalIndex + 1}`}
                className="modal-img w-full h-full object-contain"
                style={{ opacity: imgLoading ? 0 : 1 }}
                onLoad={() => setImgLoading(false)}
              />

              {modalImages.length > 1 && (
                <>
                  <button
                    onClick={prevImg}
                    className="btn-icon-round absolute left-3 top-1/2 -translate-y-1/2 z-30"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    onClick={nextImg}
                    className="btn-icon-round absolute right-3 top-1/2 -translate-y-1/2 z-30"
                  >
                    <ChevronRight size={18} />
                  </button>
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-30">
                    {modalImages.map((_, i) => (
                      <div
                        key={i}
                        className="h-1.5 rounded-full transition-all duration-300"
                        style={{
                          width: i === modalIndex ? "16px" : "6px",
                          background: i === modalIndex ? "#C8A96A" : "rgba(255,255,255,0.3)",
                        }}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
