import { Star, ExternalLink } from "lucide-react";

const testimonials = [
  {
    name: "Vachan Peter",
    location: "5 months ago",
    project: "4BHK Interior Design",
    rating: 5,
    text: "We recently got our 4BHK interior designed by Design Ur Desire, and the entire experience has been absolutely wonderful! From concept to execution, every detail was thoughtfully planned and beautifully implemented. The design perfectly balances elegance and functionality, making each room feel spacious, warm, and luxurious. The color palettes, lighting, furniture selection, and customized elements all come together seamlessly to create a truly stunning home. What impressed us the most was that the entire interior project was completed within the promised timeline without compromising on quality. The team maintained excellent coordination and ensured everything was delivered as committed. A very special thanks to Ashish and Pallavi for their dedication, creativity, and constant support throughout the project. Their professionalism, patience, and eye for detail made the entire process smooth and stress-free. They truly understood our vision and transformed it into something even better than we imagined. Highly recommend Design Ur Desire to anyone looking to create a beautiful and sophisticated living space!",
    image: "/gallery/client.png",
    initials: "VP",
    avatarBg: "#C8A96A",
  },
  {
    name: "Amitabh Sinha",
    location: "5 months ago",
    project: "2 BHK Interior",
    rating: 5,
    text: "A house becomes special when it starts feeling like home — and that’s exactly what Design Ur Desire did for us. Our 2 BHK was just a simple flat, but today it feels warm, premium, and thoughtfully designed in every corner. Ashish and Pallavi didn’t just focus on looks — they truly understood our needs, respected Vastu, and even created a beautiful pooja space we never thought was possible. The colors, finishes, and detailing reflect careful planning and genuine dedication. We were working with a tight budget, but they completely understood our situation and delivered beyond expectations. At no point did we feel like we were compromising on quality or design. What sets them apart is that they don’t just run a business — they genuinely serve with heart and integrity. Grateful for the beautiful transformation and highly recommend them to anyone building their dream home.",
    image: "/gallery/client2.png",
    initials: "AS",
    avatarBg: "#A8874A",
  },
  {
    name: "Binod kumar",
    location: "5 months ago",
    project: "3BHK Interiors",
    rating: 5,
    text: "We had a fantastic experience with Design Ur Desire for our 3BHK interiors. Ashish and Pallavi transformed our simple flat into a premium, luxurious home with smart space utilization and perfect Vastu compliance. The pooja room design, color combinations, and overall finish were thoughtfully executed. Highly professional, creative, and reliable — strongly recommended!",
    initials: "BK",
    avatarBg: "#2B2B2B",
  }
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
          <a
            href="https://www.google.com/search?rlz=1C1VDKB_enIN1143IN1143&sca_esv=5999353cb99206ac&sxsrf=APpeQnsZmaH83nF0h1fVXJOs-Fxst1sInA:1784536788319&si=APenkKm7iecQ4G6P-TsbSMFKIQtv3EFIqRAFw-i8uEbk55Z-_zy9v7WyQLZdmQhDXKGqntMpAdtVsgvUIKXAYUxTU8_FLUM5Xo0N9MrbVbDUstTU8HqYrLPM2lSLlitMnNe4DBwpRb7bCsIe0X6kSl5DB6tM5U4oTw%3D%3D&q=Design+Ur+Desire+Reviews&sa=X&ved=2ahUKEwiauOzK7eCVAxWYzDgGHXAOD9YQ0bkNegQIKhAF&biw=1280&bih=607&dpr=1.5"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full border border-[#E9E3D8] bg-[#F8F5F0] shadow-sm hover:border-[#C8A96A]/50 transition-colors"
          >
            <span className="text-xs font-bold text-[#2B2B2B]">★★★★★</span>
            <span className="text-[10px] uppercase tracking-widest text-[#666] font-semibold">4.9 / 5 on Google Reviews</span>
          </a>
        </div>

        {/* Testimonial cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="group rounded-3xl border border-[#E9E3D8] bg-[#F8F5F0] hover:border-[#C8A96A]/30 hover:shadow-[0_12px_40px_rgba(200,169,106,0.12)] transition-all duration-500 overflow-hidden shadow-[0_2px_16px_rgba(0,0,0,0.05)]"
            >
              {/* Project image thumbnail */}
              {t.image && (
                <div className="h-64 bg-[#F8F5F0] overflow-hidden flex items-center justify-center">
                  <img
                    src={t.image}
                    alt={t.project}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                </div>
              )}

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
            href="https://www.google.com/search?rlz=1C1VDKB_enIN1143IN1143&sca_esv=5999353cb99206ac&sxsrf=APpeQnsZmaH83nF0h1fVXJOs-Fxst1sInA:1784536788319&si=APenkKm7iecQ4G6P-TsbSMFKIQtv3EFIqRAFw-i8uEbk55Z-_zy9v7WyQLZdmQhDXKGqntMpAdtVsgvUIKXAYUxTU8_FLUM5Xo0N9MrbVbDUstTU8HqYrLPM2lSLlitMnNe4DBwpRb7bCsIe0X6kSl5DB6tM5U4oTw%3D%3D&q=Design+Ur+Desire+Reviews&sa=X&ved=2ahUKEwiauOzK7eCVAxWYzDgGHXAOD9YQ0bkNegQIKhAF&biw=1280&bih=607&dpr=1.5"
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

