import { Star, ExternalLink } from "lucide-react";

const testimonials = [
  {
    name: "Priya Venkatesh",
    location: "Whitefield, Bengaluru",
    project: "3BHK Full Home Interior",
    rating: 5,
    text: "Design Ur Desire transformed our 3BHK into something out of a magazine. The attention to detail in our living room and false ceiling design is extraordinary. They delivered on time and within budget — absolutely no surprises. Pallavi understood our family's vision perfectly.",
    image: "/images/luxury_living_room.webp",
    initials: "PV",
    avatarBg: "#C8A96A",
  },
  {
    name: "Arjun & Deepa Shetty",
    location: "Jayanagar, Bengaluru",
    project: "Complete Home + Modular Kitchen",
    rating: 5,
    text: "We chose Design Ur Desire for our complete home interior and it was the best decision we ever made. The modular kitchen is stunning, the bedroom feels like a boutique hotel, and the team's professionalism was top-notch throughout. The Vastu consultation was an added bonus.",
    image: "/images/Modular_kitchen1.webp",
    initials: "AS",
    avatarBg: "#A8874A",
  },
  {
    name: "Suresh Ramachandran",
    location: "Koramangala, Bengaluru",
    project: "Wardrobes & Wall Panels",
    rating: 5,
    text: "Outstanding craftsmanship and design sensibility. Our wall panels and wardrobes are exactly as we envisioned — and better. The 3-year warranty gives us complete confidence. Highly recommend Design Ur Desire for anyone looking for luxury interior solutions in Bengaluru.",
    image: "/images/luxury_wall_panels.webp",
    initials: "SR",
    avatarBg: "#2B2B2B",
  },
];

export default function TestimonialsSection() {
  return (
    <section
      className="py-20 sm:py-28 md:py-40 px-4 sm:px-8 md:px-12 bg-white border-t border-[#E9E3D8]"
      aria-label="Client Testimonials"
    >
      <div className="max-w-[90rem] mx-auto">
        {/* Header */}
        <div className="mb-12 sm:mb-16">
          <p className="text-[10px] uppercase tracking-[0.4em] text-[#C8A96A] font-bold mb-3"
             style={{ fontFamily: "'Poppins', sans-serif" }}>
            What Clients Say
          </p>
          <h2 className="cinema-heading mb-4">Client<br />Stories</h2>
          <div className="cinema-accent-line" />

          {/* Google badge */}
          <div className="mt-6 inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full border border-[#E9E3D8] bg-[#F8F5F0] shadow-sm">
            <span className="text-xs font-bold text-[#2B2B2B]">★★★★★</span>
            <span className="text-[10px] uppercase tracking-widest text-[#666] font-semibold">4.9 / 5 on Google Reviews</span>
          </div>
        </div>

        {/* Testimonial cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="group rounded-3xl border border-[#E9E3D8] bg-[#F8F5F0] hover:border-[#C8A96A]/30 hover:shadow-[0_12px_40px_rgba(200,169,106,0.12)] transition-all duration-500 overflow-hidden shadow-[0_2px_16px_rgba(0,0,0,0.05)]"
            >
              {/* Project image thumbnail */}
              <div className="h-44 overflow-hidden">
                <img
                  src={t.image}
                  alt={t.project}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
              </div>

              <div className="p-6 sm:p-8">
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} size={13} className="fill-[#C8A96A] text-[#C8A96A]" />
                  ))}
                </div>

                {/* Review text */}
                <p className="text-[#555] italic font-light mb-6 leading-relaxed text-sm">
                  "{t.text}"
                </p>

                {/* Project tag */}
                <div className="mb-4 inline-block px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest text-[#C8A96A] bg-[#C8A96A]/10 border border-[#C8A96A]/20">
                  {t.project}
                </div>

                {/* Client info */}
                <div className="flex items-center gap-3 border-t border-[#E9E3D8] pt-4">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-black flex-shrink-0"
                    style={{ backgroundColor: t.avatarBg }}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <p className="font-black text-[#2B2B2B] text-xs uppercase tracking-widest"
                       style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                      {t.name}
                    </p>
                    <p className="text-[#999] text-[10px] uppercase tracking-widest mt-0.5 font-medium">
                      {t.location}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Google Reviews CTA */}
        <div className="mt-10 sm:mt-12 text-center">
          <a
            href="https://g.co/kgs/JXn2EKH"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#C8A96A] hover:text-[#A8874A] transition-colors"
          >
            Read All Google Reviews <ExternalLink size={12} />
          </a>
        </div>
      </div>
    </section>
  );
}
