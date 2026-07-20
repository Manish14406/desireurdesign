import { useState, useRef, useId, useEffect } from "react";
import {
  Calendar as CalendarIcon,
  Clock,
  User,
  Phone,
  Mail,
  MessageSquare,
  ChevronDown,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Home,
  Wrench,
  Ruler,
  IndianRupee,
  X,
  ArrowRight,
} from "lucide-react";
import { useCalculator } from "@/contexts/CalculatorContext";

// ─────────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────────

const WHATSAPP_NUMBER = "919739570009";

const TIME_SLOTS = [
  "10:00 AM",
  "11:30 AM",
  "01:00 PM",
  "03:00 PM",
  "04:30 PM",
  "06:00 PM",
];

const SERVICES = [
  "Residential Interiors",
  "Modular Kitchen",
  "Space Planning & Layout",
  "Vastu Consultation",
  "Renovation & Remodelling",
  "Full Home Interior",
];

const MESSAGE_MAX = 500;

// ─────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────

interface FormData {
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
  service?: string;
  message?: string;
  date?: string;
  time?: string;
}

// ─────────────────────────────────────────────────────────────
// PURE VALIDATION FUNCTIONS
// ─────────────────────────────────────────────────────────────

function validateName(v: string): string | undefined {
  const t = v.trim();
  if (!t) return "Full name is required.";
  if (t.length < 2) return "Name must be at least 2 characters.";
  if (!/^[a-zA-Z\s'\-]+$/.test(t)) return "Name may only contain letters, spaces, apostrophes, or hyphens.";
}

function validatePhone(v: string): string | undefined {
  if (!v.trim()) return "Phone number is required.";
  const stripped = v.trim().replace(/^(\+91|91|0)/, "").replace(/\s+/g, "");
  if (!/^[6-9]\d{9}$/.test(stripped))
    return "Enter a valid 10-digit Indian mobile number (e.g. +91 9739570009).";
}

function validateEmail(v: string): string | undefined {
  if (!v.trim()) return undefined;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()))
    return "Enter a valid email address.";
}

function validateService(v: string): string | undefined {
  if (!v) return "Please select a service.";
}

function validateMessage(v: string): string | undefined {
  if (v.trim().length > MESSAGE_MAX)
    return `Message must not exceed ${MESSAGE_MAX} characters.`;
}

function validateDate(d: number | null): string | undefined {
  if (d === null) return "Please select a preferred date.";
}

function validateTime(t: string | null): string | undefined {
  if (!t) return "Please select a preferred time slot.";
}
function formatLakhs(n: number) {
  return (n / 100_000).toFixed(1);
}

function buildWhatsAppURL(
  data: FormData,
  dateLabel: string,
  time: string,
  calc: {
    propertyType: string;
    bhk: string;
    area: number;
    packageLabel: string;
    minCost: number;
    maxCost: number;
    calcMessage: string;
  }
): string {
  const hasCalcData = calc.minCost > 0 && calc.maxCost > 0;
  const lines = [
    "INTERIOR DESIGN CONSULTATION REQUEST",
    "",
    "Client Details",
    `• Name: ${data.name.trim()}`,
    `• Phone: ${data.phone.trim()}`,
    `• Email: ${data.email.trim() || "Not provided"}`,
    "",
    "Project Details",
    `• Property Type: ${hasCalcData ? `${calc.bhk} BHK ${calc.propertyType.charAt(0).toUpperCase() + calc.propertyType.slice(1)}` : "Not specified"}`,
    `• Service Required: ${data.service} (Preferred Slot: ${dateLabel} @ ${time})`,
    `• Area: ${hasCalcData ? `${calc.area.toLocaleString()} sq ft` : "Not specified"}`,
    `• Estimated Budget: ${hasCalcData ? `Rs. ${formatLakhs(calc.minCost)}L - Rs. ${formatLakhs(calc.maxCost)}L` : "Not calculated"}`,
    "",
    "Additional Requirements:",
    `• ${data.message.trim() || calc.calcMessage.trim() || "None specified"}`,
    "",
    "Thank you. I would like to book a consultation regarding my interior project. Please contact me at your convenience."
  ];
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
}

// ─────────────────────────────────────────────────────────────
// FIELD WRAPPER URL BUILDER
// ─────────────────────────────────────────────────────────────


// ─────────────────────────────────────────────────────────────

interface FieldProps {
  label: string;
  required?: boolean;
  error?: string;
  errorId: string;
  children: React.ReactNode;
}

function Field({ label, required, error, errorId, children }: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-bold uppercase tracking-widest text-[#2B2B2B] flex items-center gap-1">
        {label}
        {required && <span className="text-[#C8A96A]" aria-hidden="true">*</span>}
      </label>
      {children}
      {error && (
        <p
          id={errorId}
          role="alert"
          aria-live="polite"
          className="flex items-center gap-1.5 text-[11px] text-red-500 font-medium mt-0.5 animate-slide-up"
        >
          <AlertCircle size={12} className="flex-shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// SUMMARY ROW SUB-COMPONENT
// ─────────────────────────────────────────────────────────────

function SummaryRow({
  icon,
  label,
  value,
  highlight,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | React.ReactNode;
  highlight?: boolean;
}) {
  if (!value || value === "—") {
    return null;
  }
  return (
    <div className={`flex items-start gap-3 py-3 border-b border-[#F0EBE3] last:border-0 ${highlight ? "bg-[#FBF8F3] -mx-5 px-5 rounded-xl" : ""}`}>
      <div className="w-7 h-7 rounded-full bg-[#C8A96A]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[10px] font-bold uppercase tracking-widest text-[#999] mb-0.5">{label}</p>
        <div className={`text-sm font-semibold ${highlight ? "text-[#C8A96A]" : "text-[#2B2B2B]"} break-words`}>
          {value}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// CONSULTATION SUMMARY MODAL
// ─────────────────────────────────────────────────────────────

interface SummaryModalProps {
  formData: FormData;
  dateLabel: string;
  time: string;
  onConfirm: () => void;
  onEdit: () => void;
  isSubmitting: boolean;
}

function SummaryModal({ formData, dateLabel, time, onConfirm, onEdit, isSubmitting }: SummaryModalProps) {
  const { snapshot } = useCalculator();
  const {
    propertyType, bhk, area, minCost, maxCost, packageLabel, calcMessage,
  } = snapshot;

  // Trap focus within modal
  const modalRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    modalRef.current?.focus();
  }, []);

  // Close on Escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onEdit();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onEdit]);

  const hasCalcData = minCost > 0 && maxCost > 0;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label="Consultation Summary"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onEdit}
        aria-hidden="true"
      />

      {/* Modal card */}
      <div
        ref={modalRef}
        tabIndex={-1}
        className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl outline-none"
        style={{ scrollbarWidth: "thin", scrollbarColor: "#E9E3D8 transparent" }}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white rounded-t-3xl border-b border-[#F0EBE3] px-6 pt-6 pb-4 z-10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-[#C8A96A] font-bold mb-0.5">
                Review Before Sending
              </p>
              <h2
                className="text-xl sm:text-2xl font-black text-[#2B2B2B] leading-tight"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Consultation Summary
              </h2>
            </div>
            <button
              type="button"
              onClick={onEdit}
              aria-label="Close summary and edit"
              className="w-9 h-9 rounded-full border border-[#E9E3D8] flex items-center justify-center text-[#999] hover:text-[#2B2B2B] hover:border-[#2B2B2B] transition-all flex-shrink-0"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        <div className="px-6 py-5 space-y-0">

          {/* ── Section: Contact Details ─────────────────── */}
          <div className="mb-2">
            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-[#C8A96A] mb-1">
              Contact Details
            </p>
            <SummaryRow icon={<User size={13} className="text-[#C8A96A]" />} label="Full Name" value={formData.name.trim()} />
            <SummaryRow icon={<Phone size={13} className="text-[#C8A96A]" />} label="Phone Number" value={formData.phone.trim()} />
            <SummaryRow icon={<Mail size={13} className="text-[#C8A96A]" />} label="Email Address" value={formData.email.trim() || "—"} />
          </div>

          {/* ── Section: Appointment ─────────────────────── */}
          <div className="mb-2 mt-5">
            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-[#C8A96A] mb-1">
              Appointment
            </p>
            <SummaryRow icon={<Wrench size={13} className="text-[#C8A96A]" />} label="Service Required" value={formData.service} />
            <SummaryRow icon={<CalendarIcon size={13} className="text-[#C8A96A]" />} label="Preferred Date" value={dateLabel} />
            <SummaryRow icon={<Clock size={13} className="text-[#C8A96A]" />} label="Preferred Time" value={time} />
          </div>

          {/* ── Section: Interior Estimate (from calculator) ─ */}
          {hasCalcData && (
            <div className="mb-2 mt-5">
              <p className="text-[9px] font-black uppercase tracking-[0.3em] text-[#C8A96A] mb-1">
                Interior Estimate
              </p>
              <SummaryRow
                icon={<Home size={13} className="text-[#C8A96A]" />}
                label="Property Type"
                value={`${bhk} BHK ${propertyType.charAt(0).toUpperCase() + propertyType.slice(1)}`}
              />
              <SummaryRow
                icon={<Ruler size={13} className="text-[#C8A96A]" />}
                label="Area (Sq. Ft.)"
                value={`${area.toLocaleString()} sq ft`}
              />
              <SummaryRow
                icon={<IndianRupee size={13} className="text-[#C8A96A]" />}
                label="Estimated Interior Cost"
                value={`₹${formatLakhs(minCost)}L – ₹${formatLakhs(maxCost)}L`}
                highlight
              />
            </div>
          )}

          {/* ── Section: Additional Message ──────────────── */}
          {(formData.message.trim() || calcMessage.trim()) && (
            <div className="mb-2 mt-5">
              <p className="text-[9px] font-black uppercase tracking-[0.3em] text-[#C8A96A] mb-1">
                Additional Message
              </p>
              <SummaryRow
                icon={<MessageSquare size={13} className="text-[#C8A96A]" />}
                label="Project Details"
                value={formData.message.trim() || calcMessage.trim()}
              />
            </div>
          )}
        </div>

        {/* ── Disclaimer ───────────────────────────────── */}
        <div className="px-6 pb-4">
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200">
            <p className="text-amber-800 text-[11px] leading-relaxed">
              Thank you for using our Interior Cost Calculator. The estimated cost is an
              approximate value based on the information provided. Our design team will
              review your requirements and provide a more accurate quotation after
              understanding your space and discussing your preferences.
            </p>
          </div>
        </div>

        {/* ── Footer CTA ────────────────────────────────── */}
        <div className="sticky bottom-0 bg-white rounded-b-3xl border-t border-[#F0EBE3] px-6 pt-4 pb-6">
          <p className="text-center text-xs font-bold text-[#2B2B2B] uppercase tracking-widest mb-3">
            Need a more accurate estimate?
          </p>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isSubmitting}
            className="btn-submit w-full flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={18} className="animate-spin" aria-hidden="true" />
                <span>Opening WhatsApp…</span>
              </>
            ) : (
              <>
                {/* WhatsApp icon */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-[17px] h-[17px]" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Book Free Consultation <ArrowRight size={15} />
              </>
            )}
          </button>
          <button
            type="button"
            onClick={onEdit}
            className="w-full mt-2.5 text-xs font-bold text-[#999] hover:text-[#2B2B2B] transition-colors py-2"
          >
            ← Edit Details
          </button>
        </div>
      </div>
    </div>
  );
}


// ─────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────

export default function AppointmentBooking() {
  const uid = useId();
  const { snapshot, triggerConsultation, setTriggerConsultation } = useCalculator();

  // ── Date / Time UI state ─────────────────────────────────
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  // ── Form field state ──────────────────────────────────────
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    email: "",
    service: "",
    message: "",
  });

  // ── Error state ───────────────────────────────────────────
  const [errors, setErrors] = useState<FormErrors>({});

  // ── UI states ─────────────────────────────────────────────
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState("");

  // ── Pre-fill from calculator when triggered ───────────────
  useEffect(() => {
    if (!triggerConsultation) return;
    setFormData((prev) => ({
      name: snapshot.calcName.trim() || prev.name,
      phone: snapshot.calcPhone.trim() || prev.phone,
      email: snapshot.calcEmail.trim() || prev.email,
      service: prev.service,
      message: snapshot.calcMessage.trim() || prev.message,
    }));
    setTriggerConsultation(false);
  }, [triggerConsultation, snapshot, setTriggerConsultation]);

  // ── Next 7 days ───────────────────────────────────────────
  const next7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i + 1);
    return {
      dayName: d.toLocaleDateString("en-IN", { weekday: "short" }),
      dateNum: d.getDate(),
      month: d.toLocaleDateString("en-IN", { month: "short" }),
      fullLabel: d.toLocaleDateString("en-IN", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    };
  });

  // ── Field change handler ──────────────────────────────────
  function handleChange(field: keyof FormData, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      let err: string | undefined;
      switch (field) {
        case "name":    err = validateName(value);    break;
        case "phone":   err = validatePhone(value);   break;
        case "email":   err = validateEmail(value);   break;
        case "service": err = validateService(value); break;
        case "message": err = validateMessage(value); break;
      }
      setErrors((prev) => ({ ...prev, [field]: err }));
    }
  }

  function handleDateSelect(i: number) {
    setSelectedDate(i);
    if (errors.date) setErrors((prev) => ({ ...prev, date: undefined }));
  }

  function handleTimeSelect(slot: string) {
    setSelectedTime(slot);
    if (errors.time) setErrors((prev) => ({ ...prev, time: undefined }));
  }

  // ── Validate & open summary ───────────────────────────────
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (isSubmitting || showSummary) return;

    const newErrors: FormErrors = {
      name:    validateName(formData.name),
      phone:   validatePhone(formData.phone),
      email:   validateEmail(formData.email),
      service: validateService(formData.service),
      message: validateMessage(formData.message),
      date:    validateDate(selectedDate),
      time:    validateTime(selectedTime),
    };

    const filtered = Object.fromEntries(
      Object.entries(newErrors).filter(([, v]) => v !== undefined)
    ) as FormErrors;

    if (Object.keys(filtered).length > 0) {
      setErrors(filtered);
      setTimeout(() => {
        const firstInvalid = document.querySelector<HTMLElement>("[aria-invalid='true']");
        firstInvalid?.focus();
        firstInvalid?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 50);
      return;
    }

    setErrors({});
    setShowSummary(true);
  }

  // ── Confirm from summary → open WhatsApp ─────────────────
  function handleConfirm() {
    if (isSubmitting) return;
    setIsSubmitting(true);

    const dateLabel = next7Days[selectedDate!].fullLabel;
    const url = buildWhatsAppURL(formData, dateLabel, selectedTime!, {
      propertyType: snapshot.propertyType,
      bhk: snapshot.bhk,
      area: snapshot.area,
      packageLabel: snapshot.packageLabel,
      minCost: snapshot.minCost,
      maxCost: snapshot.maxCost,
      calcMessage: snapshot.calcMessage,
    });
    setWhatsappUrl(url);

    setTimeout(() => {
      try {
        window.open(url, "_blank", "noopener,noreferrer");
      } catch {
        window.location.href = url;
      } finally {
        setIsSubmitting(false);
        setShowSummary(false);
        setSubmitted(true);
      }
    }, 700);
  }

  // ── Reset ─────────────────────────────────────────────────
  function handleReset() {
    setFormData({ name: "", phone: "", email: "", service: "", message: "" });
    setSelectedDate(null);
    setSelectedTime(null);
    setErrors({});
    setSubmitted(false);
    setShowSummary(false);
    setWhatsappUrl("");
  }

  const msgLen = formData.message.trim().length;
  const msgOverLimit = msgLen > MESSAGE_MAX;

  function inputClass(field: keyof FormErrors) {
    const base = "w-full pl-11 pr-4 py-3.5 rounded-xl border bg-[#F8F5F0] focus:bg-white outline-none transition-all duration-200 text-sm font-medium text-[#2B2B2B] placeholder:text-[#B0A898]";
    if (errors[field]) return `${base} border-red-400 ring-1 ring-red-200 focus:border-red-400 focus:ring-red-200`;
    return `${base} border-[#E9E3D8] focus:border-[#C8A96A] focus:ring-1 focus:ring-[#C8A96A]/30`;
  }

  // ─────────────────────────────────────────────────────────
  // SUCCESS SCREEN
  // ─────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <section
        id="consultation"
        className="py-16 sm:py-28 md:py-40 px-4 sm:px-8 md:px-12 bg-[#110d07] border-t border-[#332B1E] relative overflow-hidden"
        aria-label="Book a Consultation"
      >
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(200,169,106,0.08)_0%,transparent_70%)] rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="max-w-[50rem] mx-auto relative z-10 text-center">
          <div className="bg-white rounded-3xl p-10 sm:p-16 shadow-2xl">
            <div className="w-20 h-20 rounded-full bg-green-50 border-2 border-green-200 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={40} className="text-green-500" />
            </div>
            <h2
              className="text-3xl sm:text-4xl font-black text-[#2B2B2B] mb-4 leading-tight"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              WhatsApp is Opening!
            </h2>
            <p className="text-[#666] text-sm sm:text-base leading-relaxed mb-2 max-w-md mx-auto">
              Your consultation request has been prepared. Complete it by sending the pre-filled message on WhatsApp.
            </p>
            <p className="text-[#999] text-xs mb-8">
              If WhatsApp didn't open,{" "}
              <button
                type="button"
                onClick={() => window.open(whatsappUrl, "_blank", "noopener,noreferrer")}
                className="text-[#C8A96A] font-bold underline hover:text-[#A8874A] transition-colors"
              >
                click here to retry
              </button>
              .
            </p>
            <button type="button" onClick={handleReset} className="btn-submit max-w-xs mx-auto block">
              Book Another Consultation
            </button>
          </div>
        </div>
      </section>
    );
  }

  // ─────────────────────────────────────────────────────────
  // MAIN RENDER
  // ─────────────────────────────────────────────────────────
  return (
    <>
      {/* ── Summary Modal ─────────────────────────────────── */}
      {showSummary && (
        <SummaryModal
          formData={formData}
          dateLabel={next7Days[selectedDate!].fullLabel}
          time={selectedTime!}
          onConfirm={handleConfirm}
          onEdit={() => setShowSummary(false)}
          isSubmitting={isSubmitting}
        />
      )}



      <section
        id="consultation"
        className="py-16 sm:py-28 md:py-40 px-4 sm:px-8 md:px-12 bg-[#110d07] border-t border-[#332B1E] relative overflow-hidden"
        aria-label="Book a Free Consultation"
      >
        {/* Ambient glow */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(200,169,106,0.08)_0%,transparent_70%)] rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none" aria-hidden="true" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(200,169,106,0.05)_0%,transparent_70%)] rounded-full translate-y-1/2 -translate-x-1/3 pointer-events-none" aria-hidden="true" />

        <div className="max-w-[80rem] mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20 items-start">

            {/* ── LEFT: Info panel ─────────────────────────── */}
            <div className="lg:col-span-2 text-white">
              <p className="text-[10px] uppercase tracking-[0.4em] text-[#C8A96A] font-bold mb-3" style={{ fontFamily: "'Poppins', sans-serif" }}>
                Take the First Step
              </p>
              <h2
                className="text-4xl sm:text-5xl md:text-6xl font-black mb-6 leading-[1.1] text-white"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Book Your Free Consultation
              </h2>
              <div className="w-16 h-1 bg-[#C8A96A] mb-8 rounded-full" />
              <p className="text-[#999] font-light leading-relaxed mb-10 text-sm sm:text-base">
                Speak with our lead designers to discuss your vision, get expert Vastu advice, and receive a preliminary estimate for your project. No commitment required.
              </p>

              <ul className="space-y-6" role="list">
                {[
                  { title: "Expert Guidance", desc: "Discuss layout options and materials with our experienced designers." },
                  { title: "Vastu Assessment", desc: "Basic alignment check based on your floor plan and compass directions." },
                  { title: "Budget Planning", desc: "Get a clear idea of costs for different luxury packages with no hidden charges." },
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#C8A96A]/20 border border-[#C8A96A]/30 flex items-center justify-center flex-shrink-0 text-[#C8A96A] font-bold text-sm" aria-hidden="true">
                      {i + 1}
                    </div>
                    <div>
                      <h3 className="text-white font-bold mb-1 text-base">{item.title}</h3>
                      <p className="text-[#999] text-sm font-light leading-snug">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>

              {/* Trust badges */}
              <div className="mt-10 pt-8 border-t border-[#332B1E] grid grid-cols-3 gap-4">
                {[
                  { label: "200+", sub: "Projects Done" },
                  { label: "6+", sub: "Years Experience" },
                  { label: "100%", sub: "Satisfaction" },
                ].map((badge, i) => (
                  <div key={i} className="text-center">
                    <p className="text-2xl font-black text-[#C8A96A]" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                      {badge.label}
                    </p>
                    <p className="text-[10px] uppercase tracking-widest text-[#666] font-bold mt-1">{badge.sub}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* ── RIGHT: Form ──────────────────────────────── */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-10 shadow-2xl">
                <form onSubmit={handleSubmit} noValidate aria-label="Consultation booking form">

                  {/* ══ 1. DATE ════════════════════════════════ */}
                  <fieldset className="mb-8">
                    <legend className="flex items-center gap-2 mb-4">
                      <CalendarIcon size={16} className="text-[#C8A96A]" aria-hidden="true" />
                      <span className="text-xs font-bold uppercase tracking-widest text-[#2B2B2B]">
                        Select Date <span className="text-[#C8A96A]" aria-hidden="true">*</span>
                      </span>
                    </legend>
                    <div
                      className="flex gap-2.5 overflow-x-auto pb-3 hide-scrollbar -mx-2 px-2 sm:mx-0 sm:px-0"
                      style={{ scrollSnapType: "x mandatory" }}
                      role="group"
                      aria-label="Available dates"
                    >
                      {next7Days.map((d, i) => {
                        const isSel = selectedDate === i;
                        return (
                          <button
                            key={i}
                            type="button"
                            id={`${uid}-date-${i}`}
                            onClick={() => handleDateSelect(i)}
                            aria-pressed={isSel}
                            aria-label={d.fullLabel}
                            style={{ scrollSnapAlign: "start" }}
                            className={`
                              flex-shrink-0 w-[72px] sm:w-20 p-2.5 sm:p-3 rounded-2xl border-2 transition-all duration-200
                              flex flex-col items-center justify-center gap-0.5
                              focus-visible:outline-2 focus-visible:outline-[#C8A96A] focus-visible:outline-offset-2
                              ${isSel
                                ? "border-[#C8A96A] bg-[#FBF8F3] shadow-[0_4px_16px_rgba(200,169,106,0.18)] scale-105"
                                : "border-[#E9E3D8] bg-white hover:border-[#C8A96A]/50 hover:bg-[#FBF8F3]/50"
                              }
                            `}
                          >
                            <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-[#999]">{d.dayName}</span>
                            <span className="text-xl sm:text-2xl font-black text-[#2B2B2B]">{d.dateNum}</span>
                            <span className="text-[9px] sm:text-[10px] font-medium uppercase text-[#666]">{d.month}</span>
                          </button>
                        );
                      })}
                    </div>
                    {errors.date && (
                      <p role="alert" aria-live="polite" className="flex items-center gap-1.5 text-[11px] text-red-500 font-medium mt-2 animate-slide-up">
                        <AlertCircle size={12} className="flex-shrink-0" />{errors.date}
                      </p>
                    )}
                  </fieldset>

                  {/* ══ 2. TIME ════════════════════════════════ */}
                  <fieldset className="mb-8">
                    <legend className="flex items-center gap-2 mb-4">
                      <Clock size={16} className="text-[#C8A96A]" aria-hidden="true" />
                      <span className="text-xs font-bold uppercase tracking-widest text-[#2B2B2B]">
                        Select Time <span className="text-[#C8A96A]" aria-hidden="true">*</span>
                      </span>
                    </legend>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5" role="group" aria-label="Available time slots">
                      {TIME_SLOTS.map((slot) => {
                        const isSel = selectedTime === slot;
                        return (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => handleTimeSelect(slot)}
                            aria-pressed={isSel}
                            aria-label={`${slot} time slot`}
                            className={`
                              py-3 rounded-xl text-xs font-bold tracking-widest border-2 transition-all duration-200
                              focus-visible:outline-2 focus-visible:outline-[#C8A96A] focus-visible:outline-offset-2
                              ${isSel
                                ? "border-[#C8A96A] bg-[#C8A96A] text-white shadow-[0_4px_12px_rgba(200,169,106,0.30)]"
                                : "border-[#E9E3D8] bg-white text-[#666] hover:border-[#C8A96A]/50 hover:text-[#C8A96A]"
                              }
                            `}
                          >
                            {slot}
                          </button>
                        );
                      })}
                    </div>
                    {errors.time && (
                      <p role="alert" aria-live="polite" className="flex items-center gap-1.5 text-[11px] text-red-500 font-medium mt-2 animate-slide-up">
                        <AlertCircle size={12} className="flex-shrink-0" />{errors.time}
                      </p>
                    )}
                  </fieldset>

                  {/* ══ 3. CONTACT DETAILS ═════════════════════ */}
                  <div className="space-y-4 mb-6">

                    {/* Name + Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Field label="Full Name" required error={errors.name} errorId={`${uid}-name-err`}>
                        <div className="relative">
                          <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#B0A898] pointer-events-none" aria-hidden="true" />
                          <input
                            id={`${uid}-name`}
                            type="text"
                            autoComplete="name"
                            placeholder="e.g. Rahul Sharma"
                            value={formData.name}
                            onChange={(e) => handleChange("name", e.target.value)}
                            aria-required="true"
                            aria-invalid={!!errors.name}
                            aria-describedby={errors.name ? `${uid}-name-err` : undefined}
                            className={inputClass("name")}
                          />
                        </div>
                      </Field>
                      <Field label="Phone Number" required error={errors.phone} errorId={`${uid}-phone-err`}>
                        <div className="relative">
                          <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#B0A898] pointer-events-none" aria-hidden="true" />
                          <input
                            id={`${uid}-phone`}
                            type="tel"
                            autoComplete="tel"
                            placeholder="e.g. +91 97395 70009"
                            value={formData.phone}
                            onChange={(e) => handleChange("phone", e.target.value)}
                            aria-required="true"
                            aria-invalid={!!errors.phone}
                            aria-describedby={errors.phone ? `${uid}-phone-err` : undefined}
                            className={inputClass("phone")}
                          />
                        </div>
                      </Field>
                    </div>

                    {/* Email + Service */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Field label="Email Address" error={errors.email} errorId={`${uid}-email-err`}>
                        <div className="relative">
                          <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#B0A898] pointer-events-none" aria-hidden="true" />
                          <input
                            id={`${uid}-email`}
                            type="email"
                            autoComplete="email"
                            placeholder="you@email.com (optional)"
                            value={formData.email}
                            onChange={(e) => handleChange("email", e.target.value)}
                            aria-invalid={!!errors.email}
                            aria-describedby={errors.email ? `${uid}-email-err` : undefined}
                            className={inputClass("email")}
                          />
                        </div>
                      </Field>
                      <Field label="Service Required" required error={errors.service} errorId={`${uid}-service-err`}>
                        <div className="relative">
                          <ChevronDown size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#B0A898] pointer-events-none" aria-hidden="true" />
                          <select
                            id={`${uid}-service`}
                            value={formData.service}
                            onChange={(e) => handleChange("service", e.target.value)}
                            aria-required="true"
                            aria-invalid={!!errors.service}
                            aria-describedby={errors.service ? `${uid}-service-err` : undefined}
                            className={`
                              ${inputClass("service").replace("pl-11", "pl-4")}
                              pr-9 appearance-none
                              ${!formData.service ? "text-[#B0A898]" : "text-[#2B2B2B]"}
                            `}
                          >
                            <option value="" disabled hidden>Select a service…</option>
                            {SERVICES.map((svc) => (
                              <option key={svc} value={svc}>{svc}</option>
                            ))}
                          </select>
                        </div>
                      </Field>
                    </div>

                    {/* Message */}
                    <Field label="Project Details" error={errors.message} errorId={`${uid}-message-err`}>
                      <div className="relative">
                        <MessageSquare size={16} className="absolute left-3.5 top-4 text-[#B0A898] pointer-events-none" aria-hidden="true" />
                        <textarea
                          id={`${uid}-message`}
                          placeholder="Tell us about your project — room dimensions, style preferences, budget range… (Optional)"
                          rows={4}
                          value={formData.message}
                          onChange={(e) => handleChange("message", e.target.value)}
                          aria-invalid={!!errors.message}
                          aria-describedby={errors.message ? `${uid}-message-err` : `${uid}-message-count`}
                          className={`
                            w-full pl-11 pr-4 py-3.5 rounded-xl border bg-[#F8F5F0] focus:bg-white outline-none
                            transition-all duration-200 text-sm font-medium text-[#2B2B2B]
                            placeholder:text-[#B0A898] resize-none focus-visible:outline-none
                            ${msgOverLimit || errors.message
                              ? "border-red-400 ring-1 ring-red-200"
                              : "border-[#E9E3D8] focus:border-[#C8A96A] focus:ring-1 focus:ring-[#C8A96A]/30"
                            }
                          `}
                        />
                      </div>
                      <p
                        id={`${uid}-message-count`}
                        className={`text-right text-[11px] font-medium ${msgOverLimit ? "text-red-500" : "text-[#B0A898]"}`}
                        aria-live="polite"
                        aria-label={`${msgLen} of ${MESSAGE_MAX} characters used`}
                      >
                        {msgLen} / {MESSAGE_MAX}
                      </p>
                    </Field>
                  </div>

                  {/* ══ PRIVACY NOTE ═══════════════════════════ */}
                  <p className="text-[11px] text-[#B0A898] leading-relaxed mb-6">
                    🔒 Your information is private and will only be used to confirm your consultation. We never share your details.
                  </p>

                  {/* ══ SUBMIT ════════════════════════════════ */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    aria-disabled={isSubmitting}
                    className="btn-submit w-full flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px] flex-shrink-0" aria-hidden="true">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    <span>Review & Confirm via WhatsApp</span>
                  </button>
                  <p className="text-center text-[11px] text-[#B0A898] mt-4">
                    A summary of your details will appear before sending.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
