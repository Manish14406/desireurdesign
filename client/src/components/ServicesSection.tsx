import { useState } from "react";
import { ChevronRight, ChevronLeft, X } from "lucide-react";

const services = [
  {
    num: "01",
    title: "Residential Interior Design",
    desc: "Complete home interior solutions tailored to your lifestyle and aspirations.",
    image: "/images/complete_home_interior.webp",
    images: ["/images/complete_home_interior.webp", "/images/luxury_living_room.webp", "/images/luxury_bedroom.webp"],
  },
  {
    num: "02",
    title: "Modular Kitchen",
    desc: "Smart, beautiful kitchens with premium finishes, branded hardware & smart storage.",
    image: "/images/Modular_kitchen1.webp",
    images: ["/images/Modular_kitchen1.webp", "/images/luxury_kitchen.webp", "/images/island_kitchen.webp", "/images/parallel_kitchen.webp"],
  },
  {
    num: "03",
    title: "Wardrobes & Storage",
    desc: "Floor-to-ceiling custom wardrobes with intelligent organisation and premium finishes.",
    image: "/images/wardrobes2.webp",
    images: ["/images/wardrobes2.webp", "/images/wardrobes1.webp", "/images/wardrobesnew4.webp", "/images/luxury_wardrobe.webp"],
  },
  {
    num: "04",
    title: "Living Room Design",
    desc: "Elegant, functional living spaces designed for comfort, style and conversation.",
    image: "/images/luxury_living_room.webp",
    images: ["/images/luxury_living_room.webp", "/images/living_room_contemporary.webp", "/images/living_room_open_plan.webp"],
  },
  {
    num: "05",
    title: "TV Unit Design",
    desc: "Designer TV panels and entertainment units that anchor your living space beautifully.",
    image: "/images/TVunit.webp",
    images: ["/images/TVunit.webp", "/images/TVunits1.webp", "/images/Tvunits2.webp", "/images/TVunits3.webp"],
  },
  {
    num: "06",
    title: "Pooja & Crockery Units",
    desc: "Thoughtfully crafted Pooja rooms and crockery units with a devotional, elegant touch.",
    image: "/images/crockeryunit4.webp",
    images: ["/images/crockeryunit4.webp", "/images/crockeryunit1.webp", "/images/crockeryuntnew2.webp"],
  },
  {
    num: "07",
    title: "Space Planning",
    desc: "Optimising every square foot for flow, function and timeless aesthetic balance.",
    image: "/images/luxury_wall_panels.webp",
    images: ["/images/luxury_wall_panels.webp", "/images/falseceiling1.webp"],
  },
  {
    num: "08",
    title: "Vastu Consultation",
    desc: "Ancient Vastu Shastra principles blended with modern design for harmony and prosperity.",
    image: "/images/blog_vastu.png",
    images: ["/images/blog_vastu.png", "/images/complete_home_interior.webp"],
  },
  {
    num: "09",
    title: "False Ceiling & Lighting",
    desc: "Stunning ceiling designs with integrated ambient, task and accent lighting systems.",
    image: "/images/falseceiling1.webp",
    images: ["/images/falseceiling1.webp", "/images/luxury_false_ceiling.webp", "/images/falseceiling2.webp", "/images/falseceiling3.webp"],
  },
  {
    num: "10",
    title: "Renovation & Makeovers",
    desc: "Complete home makeovers that breathe new life and luxury into existing spaces.",
    image: "/images/hero_luxury_kitchen.webp",
    images: ["/images/hero_luxury_kitchen.webp", "/images/open_kitchen.webp", "/images/l_shaped_kitchen.webp"],
  },
];

export default function ServicesSection() {
  const [modalImages, setModalImages] = useState<string[]>([]);
  const [modalTitle, setModalTitle] = useState("");
  const [modalIndex, setModalIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const openModal = (images: string[], title: string) => {
    setModalImages(images);
    setModalTitle(title);
    setModalIndex(0);
    setIsOpen(true);
  };

  const closeModal = () => setIsOpen(false);
  const nextImg = () => setModalIndex((p) => (p + 1) % modalImages.length);
  const prevImg = () => setModalIndex((p) => (p - 1 + modalImages.length) % modalImages.length);

  return (
    <section
      id="services"
      className="py-20 sm:py-28 md:py-40 px-4 sm:px-8 md:px-12 bg-white border-t border-[#E9E3D8]"
      aria-label="Our Services"
    >
      <div className="max-w-[90rem] mx-auto">
        {/* Header */}
        <div className="mb-12 sm:mb-16">
          <p className="text-[10px] uppercase tracking-[0.4em] text-[#C8A96A] font-bold mb-3"
             style={{ fontFamily: "'Poppins', sans-serif" }}>
            What We Do
          </p>
          <h2 className="cinema-heading mb-4">Our<br />Services</h2>
          <div className="cinema-accent-line" />
          <p className="text-[#666] mt-6 font-light text-sm sm:text-base max-w-xl">
            End-to-end interior design solutions crafted for luxury, comfort, and long-lasting beauty.
          </p>
        </div>

        {/* Service grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 sm:gap-6">
          {services.map((service, idx) => (
            <div
              key={idx}
              onClick={() => openModal(service.images, service.title)}
              className="group relative rounded-2xl overflow-hidden cursor-pointer bg-white border border-[#E9E3D8] shadow-[0_2px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_40px_rgba(200,169,106,0.18)] hover:border-[#C8A96A]/40 transition-all duration-500"
              style={{ gridColumn: idx >= 8 ? "span 1" : undefined }}
            >
              {/* Image */}
              <div className="h-44 overflow-hidden bg-[#F8F5F0]">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                  loading="lazy"
                />
              </div>

              {/* Content */}
              <div className="p-5">
                <p className="text-[9px] font-black uppercase tracking-[0.3em] text-[#C8A96A]/70 mb-2">
                  {service.num}
                </p>
                <h3
                  className="text-sm font-black uppercase tracking-tight text-[#2B2B2B] mb-2 leading-snug group-hover:text-[#C8A96A] transition-colors"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  {service.title}
                </h3>
                <p className="text-[#999] text-xs font-light leading-relaxed mb-4">
                  {service.desc}
                </p>
                <span className="btn-card-link text-xs">
                  View Gallery <ChevronRight size={12} />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Image Modal ── */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/85 p-4 sm:p-8 backdrop-blur-md"
          onClick={closeModal}
        >
          <div
            className="max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4 px-1">
              <h3
                className="text-lg sm:text-2xl font-black uppercase tracking-tight text-white"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                {modalTitle}
              </h3>
              <button
                onClick={closeModal}
                className="btn-icon-round w-10 h-10"
              >
                <X size={18} />
              </button>
            </div>

            <div className="relative rounded-2xl overflow-hidden bg-[#111] aspect-video">
              <img
                src={modalImages[modalIndex]}
                alt={`${modalTitle} ${modalIndex + 1}`}
                className="w-full h-full object-contain"
              />
              {modalImages.length > 1 && (
                <>
                  <button
                    onClick={prevImg}
                    className="btn-icon-round absolute left-3 top-1/2 -translate-y-1/2"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    onClick={nextImg}
                    className="btn-icon-round absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    <ChevronRight size={18} />
                  </button>
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                    {modalImages.map((_, i) => (
                      <div
                        key={i}
                        className="h-1.5 rounded-full transition-all"
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
