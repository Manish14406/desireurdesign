import { ChevronRight, Phone, MessageCircle, MapPin, Clock, X, Menu, Instagram, Facebook, Youtube } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useLoading } from "@/contexts/LoadingContext";

// New Components
import HeroSlideshow from "@/components/HeroSlideshow";
import FounderSection from "@/components/FounderSection";
import ServicesSection from "@/components/ServicesSection";
import PortfolioSection from "@/components/PortfolioSection";
import GallerySection from "@/components/GallerySection";
import TestimonialsSection from "@/components/TestimonialsSection";
import BlogSection from "@/components/BlogSection";
import CostCalculator from "@/components/CostCalculator";
import StyleQuiz from "@/components/StyleQuiz";
import AppointmentBooking from "@/components/AppointmentBooking";

export default function Home() {
  const { isLoading, navLogoRef } = useLoading();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = () => setMobileMenuOpen(false);

  const navLinks = [
    { href: "#about",        label: "About" },
    { href: "#services",     label: "Services" },
    { href: "#portfolio",    label: "Portfolio" },
    { href: "#process",      label: "Process" },
    { href: "#blog",         label: "Blog" },
    { href: "#contact",      label: "Contact" },
  ];

  return (
    <div className="min-h-screen bg-white text-[#2B2B2B] overflow-x-hidden" style={{ fontFamily: "'Poppins', sans-serif" }}>

      {/* ── NAVIGATION ── */}
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 px-4 sm:px-6 md:px-8 lg:px-12 ${scrolled ? "py-2 sm:py-3 bg-white/97 backdrop-blur-md shadow-[0_2px_24px_rgba(0,0,0,0.09)] border-b border-[#E9E3D8]" : "py-3 sm:py-4 bg-gradient-to-b from-[#F8F5F0]/95 to-transparent backdrop-blur-sm"}`}>
        <div className="flex items-center justify-between gap-4 max-w-[1440px] mx-auto">
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-2.5 sm:gap-3 lg:gap-4 min-w-0 flex-shrink-1">
            <img
              ref={navLogoRef}
              src="/images/dudd.png"
              alt="Design Ur Desire Logo"
              className="h-14 sm:h-[4.5rem] lg:h-20 w-auto object-contain flex-shrink-0"
              style={{
                opacity: isLoading ? 0 : 1,
                transition: isLoading ? 'none' : 'opacity 0.5s ease-out',
                filter: 'brightness(1.2) contrast(1.1)',
                dropShadow: '0 1px 2px rgba(0,0,0,0.1)',
              }}
            />
            <div className="w-px h-8 sm:h-10 lg:h-11 bg-[#E9E3D8] flex-shrink-0 hidden sm:block" />
            <div className="leading-tight min-w-0">
              <span className="text-sm sm:text-base md:text-lg lg:text-xl font-black tracking-tight uppercase text-[#2B2B2B] block" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Design Ur Desire</span>
              <span className="text-[8px] sm:text-[9px] lg:text-[11px] text-[#C8A96A] uppercase tracking-wider font-semibold block" style={{ fontFamily: "'Poppins', sans-serif" }}>Premium Interiors · Bengaluru</span>
            </div>
          </a>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-5 xl:gap-8 flex-shrink-0">
            {navLinks.map((link, i) => (
              <a key={i} href={link.href} className="text-[11px] font-bold uppercase tracking-widest text-[#555] hover:text-[#C8A96A] transition-colors whitespace-nowrap">
                {link.label}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden btn-icon-round w-10 h-10 sm:w-11 sm:h-11 flex-shrink-0 ml-auto"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden transition-all duration-300 overflow-hidden ${mobileMenuOpen ? "max-h-[28rem] opacity-100 mt-3 sm:mt-4" : "max-h-0 opacity-0"}`}>
          <div className="bg-white/98 backdrop-blur-md border border-[#E9E3D8] rounded-2xl p-4 sm:p-5 space-y-1 shadow-[0_8px_32px_rgba(0,0,0,0.10)]">
            {navLinks.map((link, i) => (
              <a
                key={i}
                href={link.href}
                onClick={handleNavClick}
                className="flex items-center justify-between px-3 sm:px-4 py-3 sm:py-3.5 rounded-xl text-sm font-bold uppercase tracking-widest text-[#555] hover:text-[#C8A96A] hover:bg-[#F8F5F0] transition-all"
              >
                {link.label}
                <ChevronRight size={14} className="text-[#C8A96A]/50" />
              </a>
            ))}
          </div>
        </div>
      </nav>

      <HeroSlideshow />

      {/* ── STATISTICS BANNER ── */}
      <section className="py-10 sm:py-14 px-4 sm:px-6 md:px-12 bg-white border-t border-[#E9E3D8] border-b border-[#E9E3D8]">
        <div className="max-w-[80rem] mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-x-0 md:divide-x md:divide-[#E9E3D8]">
          {[
            { v: "200+", l: "Completed Projects" },
            { v: "6+", l: "Years Experience" },
            { v: "3-Year", l: "Workmanship Warranty" },
            { v: "100%", l: "Client Satisfaction" },
          ].map((stat, i) => (
            <div key={i} className="text-center px-4">
              <p className="text-3xl sm:text-4xl md:text-5xl font-black text-[#C8A96A] mb-2" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>{stat.v}</p>
              <p className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#2B2B2B]">{stat.l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── ABOUT SECTION ── */}
      <section id="about" className="py-20 sm:py-28 md:py-40 px-4 sm:px-8 md:px-12 bg-[#F8F5F0] relative overflow-hidden">
        <div className="max-w-[90rem] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="order-2 lg:order-1 relative h-[400px] sm:h-[500px] lg:h-[700px] rounded-3xl overflow-hidden shadow-2xl">
            <img src="/images/luxury_living_room.webp" alt="Luxury Interior About Design Ur Desire" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-6 sm:bottom-10 left-6 sm:left-10 bg-white/90 backdrop-blur-md px-6 py-4 rounded-2xl max-w-[280px]">
              <p className="text-[#C8A96A] font-black text-2xl" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Precision.</p>
              <p className="text-[#2B2B2B] font-bold text-xs uppercase tracking-widest mt-1">In every detail.</p>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <p className="text-[10px] uppercase tracking-[0.4em] text-[#C8A96A] font-bold mb-3">About The Studio</p>
            <h2 className="cinema-heading mb-6">Designing<br />Lifestyles</h2>
            <div className="cinema-accent-line mb-8" />
            <div className="text-[#666] font-light text-base sm:text-lg leading-relaxed space-y-5 mb-10">
              <p>Design Ur Desire is a premium residential interior design firm based in Bengaluru. We specialize in creating bespoke, luxury living spaces that seamlessly blend contemporary aesthetics with deeply personal functionality.</p>
              <p>Our approach is holistic. From conceptual space planning and 3D visualization to material selection and flawless execution, we manage every detail. We integrate ancient Vastu Shastra principles to ensure your home is not just visually stunning, but also a sanctuary of positive energy.</p>
            </div>
            
            <div className="grid grid-cols-2 gap-y-6 gap-x-4 mb-10">
              {['Customized Designs', 'Premium Materials', 'Transparent Pricing', 'End-to-End Execution', 'Vastu Compliant', 'On-Time Delivery'].map((val, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-white border border-[#E9E3D8] flex items-center justify-center shadow-sm text-[#C8A96A]">✔</span>
                  <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#2B2B2B]">{val}</span>
                </div>
              ))}
            </div>

            <button onClick={() => { const el = document.getElementById('consultation'); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }} className="btn-dud btn-primary-gold">
              Get to Know Us Better
            </button>
          </div>
        </div>
      </section>

      <FounderSection />
      
      <ServicesSection />
      
      <PortfolioSection />

      <GallerySection />

      {/* ── DESIGN PROCESS ── */}
      <section id="process" className="py-20 sm:py-28 md:py-40 px-4 sm:px-8 md:px-12 bg-white border-t border-[#E9E3D8]">
        <div className="max-w-[90rem] mx-auto">
          <div className="text-center mb-16 sm:mb-24">
            <p className="text-[10px] uppercase tracking-[0.4em] text-[#C8A96A] font-bold mb-3">Our Approach</p>
            <h2 className="cinema-heading mb-4">The Premium Process</h2>
            <div className="cinema-accent-line mx-auto mb-6" />
            <p className="text-[#666] font-light max-w-2xl mx-auto">A seamless, transparent, and refined journey from the first meeting to the day you step into your new home.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12 sm:gap-y-16">
            {[
              { title: "Consultation", desc: "Understanding your vision, lifestyle, and Vastu preferences." },
              { title: "Concept Design", desc: "Initial layouts, mood boards, and aesthetic direction." },
              { title: "Space Planning", desc: "Optimizing flow and function for every room." },
              { title: "3D Visualization", desc: "Photorealistic renders of your future home." },
              { title: "Material Selection", desc: "Curating premium finishes, fabrics, and hardware." },
              { title: "Execution", desc: "Precision crafting by our expert installation teams." },
              { title: "Quality Inspection", desc: "Rigorous checks against our luxury standards." },
              { title: "Final Handover", desc: "Welcome to your beautifully finished new home." },
            ].map((step, i) => (
              <div key={i} className="relative p-6 rounded-3xl bg-[#F8F5F0] border border-[#E9E3D8] hover:border-[#C8A96A]/40 transition-colors group">
                <div className="absolute -top-6 -left-4 w-12 h-12 bg-white rounded-full border-2 border-[#C8A96A] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <span className="text-[#C8A96A] font-black text-lg" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>{i + 1}</span>
                </div>
                <h3 className="text-sm font-black uppercase tracking-widest text-[#2B2B2B] mt-4 mb-3">{step.title}</h3>
                <p className="text-[#666] text-sm font-light leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TestimonialsSection />
      
      <BlogSection />
      
      <CostCalculator />
      
      <StyleQuiz />


      <AppointmentBooking />

      {/* ── CONTACT & FOOTER ── */}
      <section id="contact" className="py-16 sm:py-20 bg-white relative">
        <div className="h-[500px] sm:h-[500px] w-full relative">
          <div className="relative z-10 p-5 sm:p-8 bg-white/95 backdrop-blur-md shadow-2xl rounded-2xl sm:rounded-3xl border border-[#E9E3D8] mx-4 sm:mx-0 sm:absolute sm:top-10 sm:left-10 max-w-sm">
            <h3 className="text-xl font-black uppercase tracking-tight text-[#2B2B2B] mb-6" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Visit Our Studio</h3>
            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-[#C8A96A] flex-shrink-0 mt-0.5" />
                <p className="text-[#666] leading-relaxed">Design Ur Desire,<br/>Bagalur Main Rd, Dwarka Nagar, Kattigenahalli,<br/>Bengaluru, Karnataka 560064</p>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={18} className="text-[#C8A96A] flex-shrink-0" />
                <a href="tel:+919739570009" className="text-[#666] font-bold hover:text-[#C8A96A] transition-colors">+91 97395 70009</a>
              </div>
              <div className="flex items-center gap-3">
                <Clock size={18} className="text-[#C8A96A] flex-shrink-0" />
                <p className="text-[#666]">Mon–Sat: 10:00 AM – 7:00 PM</p>
              </div>
            </div>
            <a
              href="https://www.google.com/maps/dir//Design+Ur+Desire,+Bagalur+Main+Rd,+Dwarka+Nagar,+Kattigenahalli,+Bengaluru,+Karnataka+560064/@13.1160908,77.622814,2821m/data=!3m1!1e3!4m8!4m7!1m0!1m5!1m1!1s0x3bae198dc315e9f3:0xc03dd78a3b2f396!2m2!1d77.6196703!2d13.1215115"
              target="_blank" rel="noopener noreferrer"
              className="mt-6 block text-center text-xs font-bold uppercase tracking-widest text-[#C8A96A] border-b-2 border-[#C8A96A] pb-1 hover:text-[#2B2B2B] hover:border-[#2B2B2B] transition-colors"
            >
              Get Directions
            </a>
          </div>
          <iframe
            src="https://maps.google.com/maps?q=13.1215115,77.6196703&t=&z=16&ie=UTF8&iwloc=&output=embed"
            width="100%" height="100%"
            style={{ border: 0 }}
            allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
            title="Design Ur Desire Location"
          />
        </div>
      </section>

      <footer className="pt-20 pb-10 px-4 sm:px-8 md:px-12 bg-[#110d07] border-t border-[#332B1E]">
        <div className="max-w-[90rem] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-16">
            
            {/* Brand */}
            <div className="lg:col-span-1">
              <img src="/images/dudd.png" alt="Logo" className="h-20 w-auto mb-6 brightness-0 invert opacity-90" />
              <p className="text-[#999] text-sm font-light leading-relaxed mb-6">
                Premium luxury interior design and Vastu consultation studio based in Bengaluru. Crafting timeless spaces.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:bg-[#C8A96A] hover:text-white hover:border-[#C8A96A] transition-all"><Instagram size={18} /></a>
                <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:bg-[#C8A96A] hover:text-white hover:border-[#C8A96A] transition-all"><Facebook size={18} /></a>
                <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:bg-[#C8A96A] hover:text-white hover:border-[#C8A96A] transition-all"><Youtube size={18} /></a>
              </div>
            </div>

            {/* Links */}
            <div>
              <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6">Quick Links</h4>
              <ul className="space-y-4">
                {navLinks.map((l, i) => (
                  <li key={i}><a href={l.href} className="text-[#999] text-sm hover:text-[#C8A96A] transition-colors">{l.label}</a></li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6">Our Services</h4>
              <ul className="space-y-4">
                {['Residential Interiors', 'Modular Kitchens', 'Space Planning', 'Vastu Consultation', 'Renovation'].map((s, i) => (
                  <li key={i}><a href="#services" className="text-[#999] text-sm hover:text-[#C8A96A] transition-colors">{s}</a></li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6">Contact</h4>
              <ul className="space-y-4">
                <li><a href="tel:+919739570009" className="text-[#999] text-sm hover:text-[#C8A96A] transition-colors flex items-center gap-3"><Phone size={14} /> +91 97395 70009</a></li>
                <li><a href="https://wa.me/919739570009" className="text-[#999] text-sm hover:text-[#C8A96A] transition-colors flex items-center gap-3"><MessageCircle size={14} /> WhatsApp Us</a></li>
                <li className="flex items-start gap-3 text-[#999] text-sm leading-relaxed"><MapPin size={14} className="mt-1 flex-shrink-0" /> Bagalur Main Rd, Bengaluru</li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 border-t border-white/10 text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">
            <p>© {new Date().getFullYear()} Design Ur Desire. All Rights Reserved.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white/60">Privacy Policy</a>
              <a href="#" className="hover:text-white/60">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-5 sm:bottom-8 right-4 sm:right-8 flex flex-col gap-2.5 sm:gap-3 z-40">
        <a href="https://wa.me/919739570009" target="_blank" rel="noopener noreferrer"
          className="btn-fab bg-[#25D366] text-white"
          style={{ boxShadow: "0 4px 20px rgba(37,211,102,0.40)" }}>
          <MessageCircle size={20} />
        </a>
        <a href="tel:+919739570009"
          className="btn-fab text-white"
          style={{ background: "linear-gradient(135deg,#C8A96A 0%,#A8874A 100%)", boxShadow: "0 4px 20px rgba(200,169,106,0.40)" }}>
          <Phone size={20} />
        </a>
      </div>

    </div>
  );
}
