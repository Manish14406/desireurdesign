import { useState, useId, useEffect, useRef } from "react";
import { User, Phone, Mail, MessageSquare, AlertCircle, Loader2, X, ArrowRight } from "lucide-react";
import {
  useCalculator,
  PRICE_PER_SQFT,
  PACKAGE_LABELS,
  PACKAGE_DESC,
  type PropertyType,
  type BHK,
  type Package,
} from "@/contexts/CalculatorContext";

// ─────────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────────

const WHATSAPP_NUMBER = "919739570009";

// ─────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────

function fmt(n: number) {
  return (n / 100_000).toFixed(1);
}

function capitalise(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function buildSelectedOptions(bhk: BHK, pt: PropertyType, pkg: Package, area: number) {
  return [
    `${bhk} BHK ${capitalise(pt)}`,
    `${PACKAGE_LABELS[pkg]} Package`,
    `${area.toLocaleString()} sq ft Carpet Area`,
  ];
}

// ─────────────────────────────────────────────────────────────
// VALIDATION
// ─────────────────────────────────────────────────────────────

function validateName(v: string): string | undefined {
  const t = v.trim();
  if (!t) return "Full name is required.";
  if (t.length < 2) return "Name must be at least 2 characters.";
  if (!/^[a-zA-Z\s'\-]+$/.test(t))
    return "Name may only contain letters, spaces, apostrophes, or hyphens.";
}

function validatePhone(v: string): string | undefined {
  if (!v.trim()) return "Phone number is required.";
  const stripped = v.trim().replace(/^(\+91|91|0)/, "").replace(/\s+/g, "");
  if (!/^[6-9]\d{9}$/.test(stripped))
    return "Enter a valid 10-digit Indian mobile number.";
}

function validateEmail(v: string): string | undefined {
  if (!v.trim()) return undefined;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()))
    return "Enter a valid email address.";
}

interface CalcErrors {
  name?: string;
  phone?: string;
  email?: string;
}

function buildWhatsAppMessage(
  name: string,
  phone: string,
  email: string,
  bhk: BHK,
  propertyType: PropertyType,
  area: number,
  packageLabel: string,
  minCost: number,
  maxCost: number,
  notes: string
): string {
  const lines = [
    "*INTERIOR DESIGN CONSULTATION REQUEST*",
    "",
    "Client Details",
    `• Name: ${name.trim()}`,
    `• Phone: ${phone.trim()}`,
    `• Email: ${email.trim() || "Not provided"}`,
    "",
    "Project Details",
    `• Property Type: ${bhk} BHK ${capitalise(propertyType)}`,
    `• Area (Sq. Ft.): ${area.toLocaleString()}`,
    `• Services Required: ${packageLabel} Package`,
    `• Estimated Interior Cost: Rs. ${fmt(minCost)}L - Rs. ${fmt(maxCost)}L`,
    "",
    "Additional Requirements",
    `• ${notes.trim() || "None specified"}`,
    "",
    "Please review my requirements. I will attach my 2D floor plan in this WhatsApp conversation so you can provide a detailed quotation and consultation.",
    "",
    "Thank you."
  ];
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
}

interface ReadyModalProps {
  isLoading: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

function ReadyModal({ isLoading, onConfirm, onCancel }: ReadyModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    modalRef.current?.focus();
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape" && !isLoading) onCancel();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onCancel, isLoading]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="ready-modal-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={!isLoading ? onCancel : undefined}
        aria-hidden="true"
      />

      {/* Card */}
      <div
        ref={modalRef}
        tabIndex={-1}
        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl outline-none overflow-hidden"
      >
        {/* Gold top bar */}
        <div className="h-1 w-full bg-gradient-to-r from-[#C8A96A] via-[#F0DEB8] to-[#C8A96A]" />

        <div className="p-8 sm:p-10">
          {/* Icon */}
          <div className="w-16 h-16 rounded-2xl bg-[#FBF8F3] border border-[#E9E3D8] flex items-center justify-center mx-auto mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-[#C8A96A]" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </div>

          {/* Title */}
          <h2
            id="ready-modal-title"
            className="text-2xl sm:text-3xl font-black text-[#2B2B2B] text-center mb-3 leading-tight"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Ready to Connect?
          </h2>

          {/* Body */}
          <p className="text-[#666] text-sm leading-relaxed text-center mb-8">
            To provide the most accurate quotation and design consultation, please keep
            your <strong className="text-[#2B2B2B]">2D floor plan (PDF or Image)</strong> ready.
            After WhatsApp opens, simply <strong className="text-[#2B2B2B]">attach your floor plan</strong> in
            the chat before sending your enquiry.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={onCancel}
              disabled={isLoading}
              className="flex-1 py-3.5 rounded-xl border-2 border-[#E9E3D8] bg-white text-[#666] text-xs font-bold uppercase tracking-widest hover:border-[#2B2B2B] hover:text-[#2B2B2B] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={onConfirm}
              disabled={isLoading}
              className="flex-[2] py-3.5 rounded-xl btn-submit flex items-center justify-center gap-2.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? (
                <>
                  <Loader2 size={16} className="animate-spin" aria-hidden="true" />
                  <span>Opening WhatsApp…</span>
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Continue to WhatsApp
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// CONSULTATION SUMMARY CARD
// ─────────────────────────────────────────────────────────────

interface SummaryCardProps {
  name: string;
  phone: string;
  email: string;
  bhk: BHK;
  propertyType: PropertyType;
  area: number;
  packageLabel: string;
  minCost: number;
  maxCost: number;
  notes: string;
}

function SummaryCard({
  name, phone, email, bhk, propertyType, area, packageLabel, minCost, maxCost, notes,
}: SummaryCardProps) {
  const hasAnyDetail = name.trim() || phone.trim() || email.trim();

  return (
    <div className="rounded-2xl border border-[#E9E3D8] bg-[#FAFAF8] overflow-hidden">
      {/* Card header */}
      <div className="px-5 py-4 border-b border-[#F0EBE3] flex items-center gap-2">
        <div className="w-1.5 h-1.5 rounded-full bg-[#C8A96A]" aria-hidden="true" />
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#C8A96A]">
          Consultation Summary
        </p>
      </div>

      <div className="divide-y divide-[#F0EBE3]">

        {/* Client Details */}
        <div className="px-5 py-4">
          <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#B0A898] mb-3">
            👤 Client Details
          </p>
          <div className="space-y-2">
            <SummaryLine label="Name" value={name.trim() || "—"} empty={!name.trim()} />
            <SummaryLine label="Phone" value={phone.trim() || "—"} empty={!phone.trim()} />
            <SummaryLine label="Email" value={email.trim() || "Not provided"} empty={!email.trim()} />
          </div>
        </div>

        {/* Project Details */}
        <div className="px-5 py-4">
          <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#B0A898] mb-3">
            🏠 Project Details
          </p>
          <div className="space-y-2">
            <SummaryLine label="Property Type" value={`${bhk} BHK ${capitalise(propertyType)}`} />
            <SummaryLine label="Area" value={`${area.toLocaleString()} sq ft`} />
            <SummaryLine label="Services Required" value={`${packageLabel} Package`} />
            <div className="flex items-center justify-between gap-3 py-1.5 px-3 rounded-xl bg-gradient-to-r from-[#FBF8F3] to-[#FDF9F4] border border-[#C8A96A]/20 mt-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#999]">
                Est. Interior Cost
              </span>
              <span className="text-sm font-black text-[#C8A96A]" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                ₹{fmt(minCost)}L – ₹{fmt(maxCost)}L
              </span>
            </div>
          </div>
        </div>

        {/* Additional Notes */}
        <div className="px-5 py-4">
          <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#B0A898] mb-2">
            📝 Additional Requirements
          </p>
          <p className={`text-xs leading-relaxed ${notes.trim() ? "text-[#2B2B2B] font-medium" : "text-[#C0B8B0] italic"}`}>
            {notes.trim() || "None specified"}
          </p>
        </div>
      </div>

      {/* Indicative note */}
      {hasAnyDetail && (
        <div className="px-5 py-3 bg-amber-50 border-t border-amber-100">
          <p className="text-[10px] text-amber-700 leading-relaxed">
            ⚠ Estimated cost is indicative. Our team will provide an accurate quote after reviewing your space.
          </p>
        </div>
      )}
    </div>
  );
}

function SummaryLine({ label, value, empty }: { label: string; value: string; empty?: boolean }) {
  return (
    <div className="flex items-start justify-between gap-3">
      <span className="text-[10px] font-bold uppercase tracking-wider text-[#B0A898] flex-shrink-0 pt-px">
        {label}
      </span>
      <span className={`text-xs font-semibold text-right ${empty ? "text-[#C0B8B0]" : "text-[#2B2B2B]"}`}>
        {value}
      </span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────

export default function CostCalculator() {
  const uid = useId();
  const { snapshot, setSnapshot } = useCalculator();
  const {
    propertyType, bhk, area, pkg,
    minCost, maxCost, packageLabel,
    calcName, calcPhone, calcEmail, calcMessage,
  } = snapshot;

  // ── Local state ──────────────────────────────────────────
  const [errors, setErrors] = useState<CalcErrors>({});
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // ── Sync derived calc fields ─────────────────────────────
  function updateCalc(partial: { propertyType?: PropertyType; bhk?: BHK; area?: number; pkg?: Package }) {
    const next = { ...snapshot, ...partial };
    const range = PRICE_PER_SQFT[next.pkg];
    setSnapshot({
      ...partial,
      minCost: next.area * range.min,
      maxCost: next.area * range.max,
      packageLabel: PACKAGE_LABELS[next.pkg],
      selectedOptions: buildSelectedOptions(next.bhk, next.propertyType, next.pkg, next.area),
    });
  }

  // ── Field change with live error clear ───────────────────
  function handleField(key: "calcName" | "calcPhone" | "calcEmail", value: string) {
    setSnapshot({ [key]: value });
    if (errors[key.replace("calc", "").toLowerCase() as keyof CalcErrors]) {
      let err: string | undefined;
      if (key === "calcName")  err = validateName(value);
      if (key === "calcPhone") err = validatePhone(value);
      if (key === "calcEmail") err = validateEmail(value);
      setErrors((p) => ({ ...p, [key.replace("calc", "").toLowerCase()]: err }));
    }
  }

  // ── Validate and open modal ──────────────────────────────
  function handleBookClick() {
    if (showModal || isLoading) return;

    const newErrors: CalcErrors = {
      name:  validateName(calcName),
      phone: validatePhone(calcPhone),
      email: validateEmail(calcEmail),
    };
    const hasErrors = Object.values(newErrors).some(Boolean);
    if (hasErrors) {
      setErrors(newErrors);
      // Focus first error field
      setTimeout(() => {
        const el = document.querySelector<HTMLElement>(`[id^="${uid}-calc"][aria-invalid="true"]`);
        el?.focus();
        el?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 50);
      return;
    }

    setErrors({});
    setShowModal(true);
  }

  // ── Confirm → open WhatsApp ──────────────────────────────
  function handleConfirm() {
    if (isLoading) return;
    setIsLoading(true);

    const url = buildWhatsAppMessage(
      calcName, calcPhone, calcEmail,
      bhk, propertyType, area, packageLabel,
      minCost, maxCost, calcMessage
    );

    setTimeout(() => {
      try {
        window.open(url, "_blank", "noopener,noreferrer");
      } catch {
        window.location.href = url;
      } finally {
        setIsLoading(false);
        setShowModal(false);
      }
    }, 800);
  }

  // ── Input class helper ───────────────────────────────────
  function inputCls(field: keyof CalcErrors) {
    const base = "w-full pl-10 pr-4 py-3.5 rounded-xl border bg-[#F8F5F0] focus:bg-white outline-none transition-all duration-200 text-sm font-medium text-[#2B2B2B] placeholder:text-[#B0A898]";
    if (errors[field]) return `${base} border-red-400 ring-1 ring-red-200 focus:border-red-400 focus:ring-red-200`;
    return `${base} border-[#E9E3D8] focus:border-[#C8A96A] focus:ring-1 focus:ring-[#C8A96A]/30`;
  }

  // ─────────────────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────────────────
  return (
    <>
      {showModal && (
        <ReadyModal
          isLoading={isLoading}
          onConfirm={handleConfirm}
          onCancel={() => !isLoading && setShowModal(false)}
        />
      )}

      <section
        id="calculator"
        className="py-20 sm:py-28 md:py-40 px-4 sm:px-8 md:px-12 bg-white border-t border-[#E9E3D8]"
        aria-label="Interior Cost Calculator"
      >
        <div className="max-w-[90rem] mx-auto">

          {/* ── Section header ─────────────────────────────── */}
          <div className="mb-14 sm:mb-20">
            <p className="text-[10px] uppercase tracking-[0.4em] text-[#C8A96A] font-bold mb-3" style={{ fontFamily: "'Poppins', sans-serif" }}>
              Budget Planning Tool
            </p>
            <h2 className="cinema-heading mb-4">Interior Cost Calculator</h2>
            <div className="cinema-accent-line mb-6" />
            <p className="text-[#666] font-light leading-relaxed max-w-2xl">
              Get an instant ballpark estimate for your home interior project. Adjust the options below, fill in your details, and click <strong className="text-[#2B2B2B]">Book Free Consultation</strong> to connect with our team on WhatsApp.
            </p>
          </div>

          {/* ── Main two-column grid ───────────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

            {/* ══ LEFT: Calculator Controls ════════════════════ */}
            <div className="space-y-8">

              {/* Property Type */}
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-[#2B2B2B] block mb-3">
                  Property Type
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {(["apartment", "villa", "penthouse", "commercial"] as PropertyType[]).map((type) => (
                    <button
                      key={type}
                      type="button"
                      aria-pressed={propertyType === type}
                      onClick={() => updateCalc({ propertyType: type })}
                      className={`py-3 rounded-xl text-xs font-bold uppercase tracking-wider border-2 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-[#C8A96A] focus-visible:outline-offset-2 ${
                        propertyType === type
                          ? "bg-[#C8A96A] text-white border-[#C8A96A] shadow-[0_4px_16px_rgba(200,169,106,0.35)]"
                          : "bg-white text-[#666] border-[#E9E3D8] hover:border-[#C8A96A]/50 hover:text-[#C8A96A]"
                      }`}
                    >
                      {capitalise(type)}
                    </button>
                  ))}
                </div>
              </div>

              {/* BHK */}
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-[#2B2B2B] block mb-3">
                  BHK Configuration
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {(["1", "2", "3", "4+"] as BHK[]).map((b) => (
                    <button
                      key={b}
                      type="button"
                      aria-pressed={bhk === b}
                      onClick={() => updateCalc({ bhk: b })}
                      className={`py-3 rounded-xl text-sm font-black border-2 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-[#C8A96A] focus-visible:outline-offset-2 ${
                        bhk === b
                          ? "bg-[#2B2B2B] text-white border-[#2B2B2B] shadow-lg"
                          : "bg-white text-[#666] border-[#E9E3D8] hover:border-[#2B2B2B]/30 hover:text-[#2B2B2B]"
                      }`}
                    >
                      {b} BHK
                    </button>
                  ))}
                </div>
              </div>

              {/* Area */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="text-xs font-bold uppercase tracking-widest text-[#2B2B2B]">
                    Carpet Area
                  </label>
                  <span className="text-lg font-black text-[#C8A96A]" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                    {area.toLocaleString()} sq ft
                  </span>
                </div>
                <input
                  type="range"
                  min={400}
                  max={5000}
                  step={100}
                  value={area}
                  onChange={(e) => updateCalc({ area: Number(e.target.value) })}
                  aria-label={`Carpet area: ${area} square feet`}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #C8A96A 0%, #C8A96A ${((area - 400) / 4600) * 100}%, #E9E3D8 ${((area - 400) / 4600) * 100}%, #E9E3D8 100%)`,
                  }}
                />
                <div className="flex justify-between text-[10px] text-[#999] mt-2 font-medium">
                  <span>400 sq ft</span>
                  <span>5,000 sq ft</span>
                </div>
              </div>

              {/* Package */}
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-[#2B2B2B] block mb-3">
                  Interior Package
                </label>
                <div className="space-y-2.5">
                  {(["essential", "premium", "luxury"] as Package[]).map((p) => (
                    <button
                      key={p}
                      type="button"
                      aria-pressed={pkg === p}
                      onClick={() => updateCalc({ pkg: p })}
                      className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-[#C8A96A] focus-visible:outline-offset-2 ${
                        pkg === p
                          ? "border-[#C8A96A] bg-[#FBF8F3] shadow-[0_2px_16px_rgba(200,169,106,0.18)]"
                          : "border-[#E9E3D8] bg-white hover:border-[#C8A96A]/40 hover:bg-[#FDFCFA]"
                      }`}
                    >
                      <div className="text-left">
                        <p className={`text-sm font-black uppercase tracking-wide ${pkg === p ? "text-[#C8A96A]" : "text-[#2B2B2B]"}`}>
                          {PACKAGE_LABELS[p]}
                        </p>
                        <p className="text-xs text-[#999] mt-0.5">{PACKAGE_DESC[p]}</p>
                      </div>
                      <div className="text-right ml-4 flex-shrink-0">
                        <p className="text-xs font-bold text-[#999] whitespace-nowrap">
                          ₹{PRICE_PER_SQFT[p].min.toLocaleString()}–{PRICE_PER_SQFT[p].max.toLocaleString()}
                        </p>
                        <p className="text-[10px] text-[#B0A898]">/sqft</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Live Cost Display */}
              <div className="p-5 rounded-2xl border-2 border-[#C8A96A]/25 bg-gradient-to-br from-[#FBF8F3] to-[#F8F5F0]">
                <p className="text-[9px] uppercase tracking-[0.35em] text-[#C8A96A] font-bold mb-1">
                  Estimated Cost Range
                </p>
                <p className="text-3xl sm:text-4xl font-black text-[#2B2B2B] leading-none" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                  ₹{fmt(minCost)}L – ₹{fmt(maxCost)}L
                </p>
                <p className="text-[#999] text-xs mt-2">
                  {area.toLocaleString()} sq ft · {bhk} BHK {capitalise(propertyType)} · {PACKAGE_LABELS[pkg]}
                </p>
                <div className="mt-3 flex items-start gap-2">
                  <span className="text-amber-500 text-xs mt-0.5">ⓘ</span>
                  <p className="text-[10px] text-[#B0A898] leading-relaxed">
                    Estimate includes design, materials, labour &amp; hardware. Final quote after site visit.
                  </p>
                </div>
              </div>
            </div>

            {/* ══ RIGHT: Your Details + Summary + CTA ══════════ */}
            <div className="space-y-6">

              {/* ── Your Details heading ──────────────────────── */}
              <div>
                <p className="text-[10px] uppercase tracking-[0.35em] text-[#C8A96A] font-bold mb-0.5">
                  Your Details
                </p>
                <h3 className="text-xl font-black text-[#2B2B2B]" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                  Get Your Free Consultation
                </h3>
                <p className="text-[#999] text-xs mt-1.5 leading-relaxed">
                  Fill in your details below. Your consultation summary will update in real-time.
                </p>
              </div>

              {/* ── Personal fields ───────────────────────────── */}
              <div className="space-y-3.5">

                {/* Name */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor={`${uid}-calc-name`} className="text-xs font-bold uppercase tracking-widest text-[#2B2B2B] flex items-center gap-1">
                    Full Name <span className="text-[#C8A96A]" aria-hidden="true">*</span>
                  </label>
                  <div className="relative">
                    <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#B0A898] pointer-events-none" aria-hidden="true" />
                    <input
                      id={`${uid}-calc-name`}
                      type="text"
                      autoComplete="name"
                      placeholder="e.g. Rahul Sharma"
                      value={calcName}
                      onChange={(e) => handleField("calcName", e.target.value)}
                      aria-required="true"
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? `${uid}-calc-name-err` : undefined}
                      className={inputCls("name")}
                    />
                  </div>
                  {errors.name && (
                    <p id={`${uid}-calc-name-err`} role="alert" aria-live="polite" className="flex items-center gap-1.5 text-[11px] text-red-500 font-medium animate-slide-up">
                      <AlertCircle size={11} className="flex-shrink-0" />{errors.name}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor={`${uid}-calc-phone`} className="text-xs font-bold uppercase tracking-widest text-[#2B2B2B] flex items-center gap-1">
                    Phone Number <span className="text-[#C8A96A]" aria-hidden="true">*</span>
                  </label>
                  <div className="relative">
                    <Phone size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#B0A898] pointer-events-none" aria-hidden="true" />
                    <input
                      id={`${uid}-calc-phone`}
                      type="tel"
                      autoComplete="tel"
                      placeholder="e.g. +91 97395 70009"
                      value={calcPhone}
                      onChange={(e) => handleField("calcPhone", e.target.value)}
                      aria-required="true"
                      aria-invalid={!!errors.phone}
                      aria-describedby={errors.phone ? `${uid}-calc-phone-err` : undefined}
                      className={inputCls("phone")}
                    />
                  </div>
                  {errors.phone && (
                    <p id={`${uid}-calc-phone-err`} role="alert" aria-live="polite" className="flex items-center gap-1.5 text-[11px] text-red-500 font-medium animate-slide-up">
                      <AlertCircle size={11} className="flex-shrink-0" />{errors.phone}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor={`${uid}-calc-email`} className="text-xs font-bold uppercase tracking-widest text-[#2B2B2B]">
                    Email Address
                    <span className="text-[#B0A898] font-normal normal-case tracking-normal ml-1.5">(optional)</span>
                  </label>
                  <div className="relative">
                    <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#B0A898] pointer-events-none" aria-hidden="true" />
                    <input
                      id={`${uid}-calc-email`}
                      type="email"
                      autoComplete="email"
                      placeholder="you@email.com"
                      value={calcEmail}
                      onChange={(e) => handleField("calcEmail", e.target.value)}
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? `${uid}-calc-email-err` : undefined}
                      className={inputCls("email")}
                    />
                  </div>
                  {errors.email && (
                    <p id={`${uid}-calc-email-err`} role="alert" aria-live="polite" className="flex items-center gap-1.5 text-[11px] text-red-500 font-medium animate-slide-up">
                      <AlertCircle size={11} className="flex-shrink-0" />{errors.email}
                    </p>
                  )}
                </div>

                {/* Notes */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor={`${uid}-calc-notes`} className="text-xs font-bold uppercase tracking-widest text-[#2B2B2B]">
                    Additional Notes
                    <span className="text-[#B0A898] font-normal normal-case tracking-normal ml-1.5">(optional)</span>
                  </label>
                  <div className="relative">
                    <MessageSquare size={15} className="absolute left-3.5 top-4 text-[#B0A898] pointer-events-none" aria-hidden="true" />
                    <textarea
                      id={`${uid}-calc-notes`}
                      placeholder="Any specific requirements, preferred style, special areas to focus on…"
                      rows={3}
                      value={calcMessage}
                      onChange={(e) => setSnapshot({ calcMessage: e.target.value })}
                      className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-[#E9E3D8] bg-[#F8F5F0] focus:bg-white outline-none focus:border-[#C8A96A] focus:ring-1 focus:ring-[#C8A96A]/30 transition-all duration-200 text-sm font-medium text-[#2B2B2B] placeholder:text-[#B0A898] resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* ── Consultation Summary (live preview) ──────── */}
              <SummaryCard
                name={calcName}
                phone={calcPhone}
                email={calcEmail}
                bhk={bhk}
                propertyType={propertyType}
                area={area}
                packageLabel={packageLabel}
                minCost={minCost}
                maxCost={maxCost}
                notes={calcMessage}
              />

              {/* ── Book Free Consultation CTA ────────────────── */}
              <div>
                <button
                  type="button"
                  onClick={handleBookClick}
                  disabled={isLoading}
                  className="btn-submit w-full flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px] flex-shrink-0" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Book Free Consultation <ArrowRight size={15} />
                </button>
                <p className="text-center text-[11px] text-[#B0A898] mt-3">
                  🔒 Your details are private. You'll confirm before WhatsApp opens.
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  );
}
