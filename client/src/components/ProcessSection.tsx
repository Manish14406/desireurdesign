import { ReactNode } from "react";

/* ─── Step data ─────────────────────────────────────────────── */
interface Step {
  num: string;
  title: string;
  time: string;
  icon: ReactNode;
  label: string;
  items: string[];
}

const STEPS: Step[] = [
  {
    num: "01", title: "Consultation", time: "1–2 Days",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        <path d="M8 10h8M8 13h5"/>
      </svg>
    ),
    label: "You'll Receive",
    items: ["Site Visit", "Requirement Analysis", "Budget Discussion", "Vastu Assessment"],
  },
  {
    num: "02", title: "Concept Design", time: "5–7 Days",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M9 18h6M10 22h4M12 2a7 7 0 0 1 7 7c0 2.6-1.4 4.9-3.5 6.2L15 18H9l-.5-2.8A7 7 0 0 1 12 2z"/>
      </svg>
    ),
    label: "You'll Receive",
    items: ["Space Planning", "Furniture Layout", "Mood Board", "Color Palette"],
  },
  {
    num: "03", title: "3D Visualization", time: "7–10 Days",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <rect x="2" y="4" width="20" height="14" rx="2"/>
        <path d="M8 20h8M12 18v2"/>
        <path d="M9 8l3 4 3-4"/>
      </svg>
    ),
    label: "You'll Receive",
    items: ["2–3 Photorealistic Views", "Room-wise Walkthrough", "One Revision Round", "Furniture Placement"],
  },
  {
    num: "04", title: "Material Selection", time: "3–5 Days",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <polygon points="12,2 15.5,8.5 22,9.3 17,14.1 18.2,21 12,17.8 5.8,21 7,14.1 2,9.3 8.5,8.5"/>
      </svg>
    ),
    label: "You'll Receive",
    items: ["Material Selection Guidance", "Finish Selection", "Lighting Suggestions", "Cost Optimization"],
  },
  {
    num: "05", title: "Execution", time: "45–90 Days",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
      </svg>
    ),
    label: "Quality Assurance",
    items: ["Dedicated Project Manager", "Premium Branded Materials", "Weekly Progress Updates", "Strict Quality Inspections", "Timely Project Delivery"],
  },
  {
    num: "06", title: "Final Handover & Support", time: "1 Day",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M12 2L4 6v6c0 5.1 3.4 9.8 8 11 4.6-1.2 8-5.9 8-11V6l-8-4z"/>
        <polyline points="8,12 11,15 16,10"/>
      </svg>
    ),
    label: "You'll Receive",
    items: ["Deep Cleaning Before Handover", "Final Quality Inspection", "Warranty Guidance", "Maintenance Tips", "Post-Completion Support"],
  },
];

const TRUST = [
  {
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M12 2L4 6v6c0 5.1 3.4 9.8 8 11 4.6-1.2 8-5.9 8-11V6l-8-4z"/><polyline points="8,12 11,15 16,10"/></svg>,
    label: "Transparent Pricing",
  },
  {
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><polygon points="12,2 15.5,8.5 22,9.3 17,14.1 18.2,21 12,17.8 5.8,21 7,14.1 2,9.3 8.5,8.5"/></svg>,
    label: "Premium Materials",
  },
  {
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/></svg>,
    label: "On-Time Delivery",
  },
  {
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
    label: "Dedicated Project Manager",
  },
  {
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9,22 9,12 15,12 15,22"/></svg>,
    label: "Vastu Expertise",
  },
];

const WARRANTY = [
  {
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-4 0v2M8 21v-4a4 4 0 0 1 8 0v4"/></svg>,
    title: "Product Warranty",
    desc: "All manufacturer warranties on products and hardware are passed directly to you.",
  },
  {
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>,
    title: "Installation Warranty",
    desc: "Our workmanship warranty covers all installations for post-handover defects.",
  },
  {
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>,
    title: "Maintenance Guidance",
    desc: "Detailed care guides provided for all materials, surfaces, and finishes.",
  },
  {
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
    title: "Dedicated Support",
    desc: "A dedicated support contact for all post-completion queries and assistance.",
  },
];

/* ─── Clock icon (inline) ──────────────────────────────────── */
const ClockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-3 h-3">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12,6 12,12 16,14"/>
  </svg>
);

export default function ProcessSection() {
  return (
    <section id="process" className="py-20 sm:py-28 md:py-40 px-4 sm:px-8 md:px-12 bg-white border-t border-[#E9E3D8]">
      <div className="max-w-[90rem] mx-auto">

        {/* ── Header ──────────────────────────────────────────── */}
        <div className="text-center mb-16 sm:mb-24">
          <p className="text-[10px] uppercase tracking-[0.4em] text-[#C8A96A] font-bold mb-3" style={{ fontFamily: "'Poppins', sans-serif" }}>
            Our Approach
          </p>
          <h2 className="cinema-heading mb-4">Our Design Process</h2>
          <div className="cinema-accent-line mx-auto mb-6" />
          <p className="text-[#666] font-light max-w-2xl mx-auto text-sm sm:text-base leading-relaxed italic">
            "I believe every home should reflect the personality and lifestyle of the family who lives in it."
          </p>
        </div>

        {/* ── Timeline Steps ──────────────────────────────────── */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical gold line — desktop only */}
          <div className="absolute left-1/2 -translate-x-px top-6 bottom-6 w-px bg-gradient-to-b from-[#C8A96A]/70 via-[#C8A96A]/30 to-transparent hidden sm:block" />

          {STEPS.map((step, i) => {
            const isRight = i % 2 === 0;
            return (
              <div
                key={i}
                className={`relative flex items-start gap-0 mb-10 sm:mb-14 ${isRight ? "sm:flex-row" : "sm:flex-row-reverse"}`}
              >


                {/* Empty half for alternating layout */}
                <div className="hidden sm:block flex-1" />

                {/* Card */}
                <div className={`flex-1 group bg-[#F8F5F0] border border-[#E9E3D8] hover:border-[#C8A96A]/50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 transition-all duration-400 hover:shadow-[0_12px_40px_rgba(200,169,106,0.12)] hover:-translate-y-0.5 relative ${isRight ? "sm:mr-8" : "sm:ml-8"}`}>

                  {/* Card header */}
                  <div className="flex items-start gap-4 mb-5">
                    {/* Icon badge — always visible */}
                    <div className="flex-shrink-0 w-11 h-11 rounded-full bg-white border-2 border-[#C8A96A] flex items-center justify-center text-[#C8A96A] shadow-md group-hover:bg-[#C8A96A] group-hover:text-white transition-all duration-300">
                      {step.icon}
                    </div>
                    <div>
                      <h3
                        className="text-base sm:text-lg font-black uppercase tracking-tight text-[#2B2B2B] mb-2"
                        style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                      >
                        {step.title}
                      </h3>
                      {/* Timeline badge */}
                      <span
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#E9E3D8] text-[10px] font-semibold text-[#C8A96A] tracking-wide"
                        style={{ fontFamily: "'Poppins', sans-serif" }}
                      >
                        <ClockIcon /> {step.time}
                      </span>
                    </div>
                  </div>

                  {/* Deliverables */}
                  <div className="pt-4 border-t border-[#E9E3D8]">
                    <p
                      className="text-[9px] uppercase tracking-[0.28em] text-[#B0A898] font-bold mb-3"
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                      {step.label}
                    </p>
                    <ul className="space-y-2">
                      {step.items.map((item, j) => (
                        <li key={j} className="flex items-center gap-2.5 text-[13px] text-[#555] font-light">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#C8A96A] flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Reassurance Statement ───────────────────────────── */}
        <div className="mt-16 sm:mt-20 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-3 mb-5">
            <div className="h-px w-12 bg-[#C8A96A]/40" />
            <span className="text-[9px] uppercase tracking-[0.35em] text-[#C8A96A] font-bold" style={{ fontFamily: "'Poppins', sans-serif" }}>Our Promise</span>
            <div className="h-px w-12 bg-[#C8A96A]/40" />
          </div>
          <p
            className="text-lg sm:text-xl font-light text-[#3A3A3A] leading-relaxed"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            No hidden costs. Dedicated project management.<br className="hidden sm:block" />
            Regular progress updates throughout your project.
          </p>
        </div>

        {/* ── Trust Highlights Strip ──────────────────────────── */}
        <div className="mt-12 sm:mt-16 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {TRUST.map((t, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center gap-3 p-5 rounded-2xl bg-[#F8F5F0] border border-[#E9E3D8] hover:border-[#C8A96A]/40 hover:shadow-[0_8px_24px_rgba(200,169,106,0.10)] transition-all duration-300 group"
            >
              <div className="w-10 h-10 rounded-xl bg-white border border-[#E9E3D8] flex items-center justify-center text-[#C8A96A] shadow-sm group-hover:bg-[#C8A96A] group-hover:text-white group-hover:border-[#C8A96A] transition-all duration-300">
                {t.icon}
              </div>
              <p
                className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#2B2B2B] leading-tight"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                {t.label}
              </p>
            </div>
          ))}
        </div>

        {/* ── Warranty & After-Sales ──────────────────────────── */}
        <div className="mt-20 sm:mt-28">
          <div className="text-center mb-10 sm:mb-14">
            <p className="text-[10px] uppercase tracking-[0.4em] text-[#C8A96A] font-bold mb-3" style={{ fontFamily: "'Poppins', sans-serif" }}>
              Peace of Mind
            </p>
            <h3
              className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#2B2B2B] mb-3"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Warranty & After-Sales Support
            </h3>
            <div className="cinema-accent-line mx-auto" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {WARRANTY.map((w, i) => (
              <div
                key={i}
                className="group flex flex-col gap-5 p-6 sm:p-7 rounded-2xl bg-[#F8F5F0] border border-[#E9E3D8] hover:border-[#C8A96A]/50 hover:shadow-[0_12px_40px_rgba(200,169,106,0.12)] hover:-translate-y-0.5 transition-all duration-400"
              >
                <div className="w-12 h-12 rounded-xl bg-white border border-[#E9E3D8] flex items-center justify-center text-[#C8A96A] shadow-sm group-hover:bg-[#C8A96A] group-hover:text-white group-hover:border-[#C8A96A] transition-all duration-300">
                  {w.icon}
                </div>
                <div>
                  <h4
                    className="text-sm font-black uppercase tracking-wide text-[#2B2B2B] mb-2"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    {w.title}
                  </h4>
                  <p className="text-[#888] text-xs font-light leading-relaxed">{w.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── CTA Block ───────────────────────────────────────── */}
        <div className="mt-20 sm:mt-28 text-center bg-gradient-to-br from-[#F8F5F0] to-[#EEE8DF] rounded-3xl border border-[#E9E3D8] px-6 sm:px-14 py-14 sm:py-18 relative overflow-hidden">
          {/* Decorative gold orbs */}
          <div className="pointer-events-none absolute -top-20 -right-20 w-56 h-56 rounded-full" style={{ background: "rgba(200,169,106,0.07)" }} />
          <div className="pointer-events-none absolute -bottom-14 -left-14 w-40 h-40 rounded-full" style={{ background: "rgba(200,169,106,0.05)" }} />

          <p
            className="text-[10px] uppercase tracking-[0.4em] text-[#C8A96A] font-bold mb-4 relative z-10"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Start Your Journey
          </p>
          <h3
            className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-[#2B2B2B] mb-3 relative z-10"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Ready to Transform<br />Your Home?
          </h3>
          <p className="text-[#777] font-light text-sm sm:text-base max-w-lg mx-auto mb-10 relative z-10 leading-relaxed">
            Let's create a space that's beautiful, functional, and uniquely yours.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
            {/* Primary CTA */}
            <a
              href="#consultation"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#C8A96A] text-white text-[11px] font-bold uppercase tracking-[0.22em] shadow-[0_8px_28px_rgba(200,169,106,0.40)] hover:shadow-[0_12px_36px_rgba(200,169,106,0.55)] hover:bg-[#B8955A] transition-all duration-300"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                <rect x="3" y="4" width="18" height="18" rx="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
              Book Free Consultation
            </a>

            {/* WhatsApp */}
            <a
              href="https://wa.me/919739570009"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-7 py-4 rounded-full bg-white border-2 border-[#E9E3D8] text-[#2B2B2B] text-[11px] font-bold uppercase tracking-[0.22em] hover:border-[#C8A96A] hover:text-[#C8A96A] transition-all duration-300"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
              </svg>
              WhatsApp Us
            </a>

            {/* Call Now */}
            <a
              href="tel:+919739570009"
              className="inline-flex items-center gap-2.5 px-7 py-4 rounded-full bg-white border-2 border-[#E9E3D8] text-[#2B2B2B] text-[11px] font-bold uppercase tracking-[0.22em] hover:border-[#C8A96A] hover:text-[#C8A96A] transition-all duration-300"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              Call Now
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
