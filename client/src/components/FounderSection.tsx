import { MessageCircle } from "lucide-react";

const highlights = [
  { icon: "✦", label: "Vastu Expertise" },
  { icon: "✦", label: "Premium Materials" },
  { icon: "✦", label: "Client-First Approach" },
  { icon: "✦", label: "Timeless Designs" },
];

export default function FounderSection() {
  return (
    <section
      id="founder"
      className="py-20 sm:py-28 md:py-40 px-4 sm:px-8 md:px-12 bg-white border-t border-[#E9E3D8] overflow-hidden"
      aria-label="Meet the Founder"
    >
      <div className="max-w-[50rem] mx-auto text-center">
        <p
          className="text-[10px] uppercase tracking-[0.4em] text-[#C8A96A] font-bold mb-3"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          Meet the Founder
        </p>

        <h2
          className="text-5xl sm:text-6xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] text-[#2B2B2B] mb-3"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          Pallavi
        </h2>

        <p
          className="text-lg sm:text-xl text-[#C8A96A] italic mb-6"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        >
          Principal Designer &amp; Vastu Consultant
        </p>

        <div className="cinema-accent-line mx-auto mb-8" />

        <blockquote
          className="text-xl sm:text-2xl font-medium text-[#2B2B2B] leading-snug mb-8 italic"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        >
          "I started Design Ur Desire with one belief — every home deserves
          to feel like a sanctuary."
        </blockquote>

        <div className="space-y-4 text-[#666666] font-light leading-relaxed text-[15px] text-left sm:text-center">
          <p>
            With over 6 years of experience in luxury residential interiors,
            Pallavi has transformed more than{" "}
            <strong className="text-[#2B2B2B] font-semibold">
              200 homes across Bengaluru
            </strong>{" "}
            — blending modern aesthetics with Vastu principles to create
            spaces that are as functional as they are beautiful.
          </p>
          <p>
            Her design philosophy is rooted in deeply understanding each
            client's lifestyle, aspirations, and cultural values. Every
            project begins with listening, and ends with a home that truly
            feels like theirs.
          </p>
          <p>
            A certified Vastu consultant, Pallavi integrates ancient spatial
            wisdom with contemporary design thinking — creating homes that
            support well-being, prosperity, and harmony for generations.
          </p>
        </div>

        {/* Philosophy points */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-10">
          {highlights.map((item, i) => (
            <div
              key={i}
              className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl bg-[#F8F5F0] border border-[#E9E3D8]"
            >
              <span className="text-[#C8A96A] text-lg">{item.icon}</span>
              <span
                className="text-[#2B2B2B] text-[10px] font-bold uppercase tracking-widest text-center"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-12">
          <a
            href="https://wa.me/919739570009?text=Hi%20Pallavi%2C%20I%20would%20love%20to%20discuss%20my%20interior%20project%20with%20you."
            target="_blank"
            rel="noopener noreferrer"
            className="btn-dud btn-whatsapp"
          >
            <MessageCircle size={16} />
            Chat with Pallavi
          </a>
          <a
            href="#consultation"
            className="btn-dud btn-ghost-gold"
            onClick={(e) => {
              e.preventDefault();
              document
                .getElementById("consultation")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Book Consultation
          </a>
        </div>
      </div>
    </section>
  );
}
