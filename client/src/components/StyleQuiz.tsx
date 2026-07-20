import { useState, useId, useRef, useEffect } from "react";
import { ArrowRight, RefreshCcw, User, Phone, AlertCircle, Loader2 } from "lucide-react";
import { useCalculator } from "@/contexts/CalculatorContext";

// ─────────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────────

const WHATSAPP_NUMBER = "919739570009";

type Question = {
  id: string;
  title: string;
  options: { label: string; value: string }[];
};

const questions: Question[] = [
  {
    id: "vibe",
    title: "How do you want your home to feel?",
    options: [
      { label: "Calm & Serene", value: "minimal" },
      { label: "Rich & Opulent", value: "luxury" },
      { label: "Sleek & Uncluttered", value: "modern" },
      { label: "Warm & Traditional", value: "classic" },
    ],
  },
  {
    id: "colors",
    title: "Which color palette draws you in?",
    options: [
      { label: "Neutrals (Whites, Beiges, Greys)", value: "minimal" },
      { label: "Bold & Dark (Charcoal, Deep Blue, Gold)", value: "luxury" },
      { label: "Monochrome (Black, White, High Contrast)", value: "modern" },
      { label: "Warm Earth Tones (Browns, Terracotta)", value: "classic" },
    ],
  },
  {
    id: "materials",
    title: "What materials do you prefer?",
    options: [
      { label: "Light Wood, Linen, Matte Finishes", value: "minimal" },
      { label: "Marble, Brass, Velvet, High Gloss", value: "luxury" },
      { label: "Glass, Steel, Concrete, Leather", value: "modern" },
      { label: "Dark Wood, Silk, Antique Metals", value: "classic" },
    ],
  },
  {
    id: "priority",
    title: "What is your priority for the space?",
    options: [
      { label: "Airy, open, and easy to maintain", value: "minimal" },
      { label: "A space that makes a statement", value: "luxury" },
      { label: "Functional with smart storage", value: "modern" },
      { label: "Timeless elegance that never ages", value: "classic" },
    ],
  },
];

const results = {
  minimal: {
    title: "Minimalist Elegance",
    desc: "You prefer clean lines, uncluttered spaces, and a serene, calming environment. Your ideal home is airy, functional, and relies on subtle textures rather than loud patterns.",
    image: "/images/bedroom_minimal.webp",
  },
  luxury: {
    title: "Premium Luxury",
    desc: "You have an eye for the finer things. Your space should feel opulent and rich, featuring premium materials like marble, metallic accents, and plush fabrics.",
    image: "/images/luxury_living_room.webp",
  },
  modern: {
    title: "Sleek Modern",
    desc: "You value functionality and a sleek aesthetic. Your home favors monochromatic palettes, strong geometric forms, and innovative materials.",
    image: "/images/living_room_contemporary.webp",
  },
  classic: {
    title: "Timeless Classic",
    desc: "You appreciate tradition and warmth. Your style incorporates rich woods, symmetrical layouts, and elegant details that have stood the test of time.",
    image: "/images/bedroom_royal.webp",
  },
};

// ─────────────────────────────────────────────────────────────
// VALIDATION HELPERS
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

interface FormErrors {
  name?: string;
  phone?: string;
}

// ─────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────

export default function StyleQuiz() {
  const uid = useId();
  const { snapshot, setSnapshot } = useCalculator();

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [isFinished, setIsFinished] = useState(false);

  // Name & Phone input values
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  // Sync inputs from calculator snapshot if they are already populated
  useEffect(() => {
    if (snapshot.calcName) setName(snapshot.calcName);
    if (snapshot.calcPhone) setPhone(snapshot.calcPhone);
  }, [snapshot.calcName, snapshot.calcPhone]);

  const handleSelect = (value: string) => {
    const newAnswers = [...answers, value];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setIsFinished(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setIsFinished(false);
    setErrors({});
    setIsLoading(false);
  };

  const getResultKey = (): keyof typeof results => {
    const counts = answers.reduce((acc, val) => {
      acc[val] = (acc[val] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    let maxKey = "minimal";
    let maxVal = 0;
    for (const key in counts) {
      if (counts[key] > maxVal) {
        maxVal = counts[key];
        maxKey = key;
      }
    }
    return maxKey as keyof typeof results;
  };

  const handleFieldChange = (key: "name" | "phone", value: string) => {
    if (key === "name") {
      setName(value);
      setSnapshot({ calcName: value });
    } else {
      setPhone(value);
      setSnapshot({ calcPhone: value });
    }

    if (errors[key]) {
      const err = key === "name" ? validateName(value) : validatePhone(value);
      setErrors((prev) => ({ ...prev, [key]: err }));
    }
  };

  const handleDiscuss = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;

    const newErrors = {
      name: validateName(name),
      phone: validatePhone(phone),
    };

    const hasErrors = Object.values(newErrors).some(Boolean);
    if (hasErrors) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsLoading(true);

    const styleTitle = results[getResultKey()].title;
    const lines = [
      "*INTERIOR DESIGN STYLE QUIZ RESULT*",
      "",
      "Client Details",
      `• Name: ${name.trim()}`,
      `• Phone: ${phone.trim()}`,
      "",
      "Style Details",
      `• Recommended Style: ${styleTitle}`,
      "",
      "I have completed the Interior Style Quiz and would like to discuss my design recommendations.",
      "",
      "Thank you.",
    ];

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;

    setTimeout(() => {
      try {
        window.open(url, "_blank", "noopener,noreferrer");
      } catch {
        window.location.href = url;
      } finally {
        setIsLoading(false);
      }
    }, 800);
  };

  const activeResult = results[isFinished ? getResultKey() : "minimal"];

  return (
    <section
      id="quiz"
      className="py-20 sm:py-28 md:py-40 px-4 sm:px-8 md:px-12 bg-[#F8F5F0] border-t border-[#E9E3D8] overflow-hidden"
      aria-label="Interior Style Quiz"
    >
      <div className="max-w-[54rem] mx-auto text-center">
        {/* Header */}
        {!isFinished && (
          <div className="mb-12">
            <p
              className="text-[10px] uppercase tracking-[0.4em] text-[#C8A96A] font-bold mb-3"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Find Your Style
            </p>
            <h2 className="cinema-heading mb-4">Interior Style Quiz</h2>
            <div className="cinema-accent-line mx-auto" />
            <p className="text-[#666] mt-6 font-light text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
              Not sure where to start? Take our quick quiz to discover the interior style that perfectly matches your personality.
            </p>
          </div>
        )}

        {/* Quiz Box */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 md:p-14 shadow-[0_8px_32px_rgba(0,0,0,0.04)] border border-[#E9E3D8] transition-all duration-500">
          {!isFinished ? (
            <div className="animate-fade-in">
              {/* Progress Indicator */}
              <div className="flex justify-center gap-2 mb-10">
                {questions.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-1 rounded-full transition-all duration-500 ${
                      idx <= currentQuestion ? "w-8 sm:w-12 bg-[#C8A96A]" : "w-4 bg-[#E9E3D8]"
                    }`}
                  />
                ))}
              </div>

              {/* Question text */}
              <h3
                className="text-2xl sm:text-3xl font-black text-[#2B2B2B] mb-10 leading-tight"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                {questions[currentQuestion].title}
              </h3>

              {/* Options list */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {questions[currentQuestion].options.map((opt, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelect(opt.value)}
                    className="p-5 rounded-2xl border-2 border-[#E9E3D8] bg-white hover:border-[#C8A96A] hover:bg-[#FBF8F3] hover:shadow-[0_4px_20px_rgba(200,169,106,0.1)] transition-all duration-300 group text-left flex items-center justify-between outline-none"
                  >
                    <span className="font-semibold text-[#2B2B2B] text-sm sm:text-base group-hover:text-[#C8A96A] transition-colors leading-snug">
                      {opt.label}
                    </span>
                    <div className="w-5 h-5 rounded-full border-2 border-[#E9E3D8] group-hover:border-[#C8A96A] flex items-center justify-center flex-shrink-0 transition-colors">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#C8A96A] opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* Results Screen */
            <div className="animate-fade-in text-center max-w-2xl mx-auto">
              <p className="text-[10px] uppercase tracking-[0.3em] text-[#C8A96A] font-bold mb-3">
                Your Design Style Is
              </p>
              <h3
                className="text-3xl sm:text-4xl md:text-5xl font-black text-[#2B2B2B] mb-6 leading-tight"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                {activeResult.title}
              </h3>

              {/* Image Preview */}
              <div className="rounded-2xl overflow-hidden aspect-[16/10] mb-6 shadow-md border border-[#E9E3D8] bg-[#F8F5F0]">
                <img
                  src={activeResult.image}
                  alt={activeResult.title}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  loading="eager"
                />
              </div>

              {/* Description */}
              <p className="text-[#666] font-light leading-relaxed text-sm sm:text-base mb-8">
                {activeResult.desc}
              </p>

              {/* User Details Form right before action */}
              <form onSubmit={handleDiscuss} className="border-t border-[#E9E3D8] pt-8 mb-8 text-left space-y-4">
                <p className="text-[10px] uppercase tracking-[0.25em] text-[#C8A96A] font-bold mb-2 text-center">
                  Consultation Details
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name Input */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor={`${uid}-name`} className="text-[10px] font-bold uppercase tracking-wider text-[#2B2B2B]">
                      Full Name
                    </label>
                    <div className="relative">
                      <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#B0A898]" />
                      <input
                        id={`${uid}-name`}
                        type="text"
                        placeholder="e.g. Rahul Sharma"
                        value={name}
                        onChange={(e) => handleFieldChange("name", e.target.value)}
                        className={`w-full pl-9 pr-4 py-3 rounded-xl border text-xs font-semibold text-[#2B2B2B] bg-[#F8F5F0] focus:bg-white outline-none transition-all ${
                          errors.name
                            ? "border-red-400 ring-1 ring-red-200"
                            : "border-[#E9E3D8] focus:border-[#C8A96A]"
                        }`}
                      />
                    </div>
                    {errors.name && (
                      <p className="flex items-center gap-1 text-[10px] text-red-500 font-semibold mt-0.5 animate-slide-up">
                        <AlertCircle size={10} /> {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Phone Input */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor={`${uid}-phone`} className="text-[10px] font-bold uppercase tracking-wider text-[#2B2B2B]">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#B0A898]" />
                      <input
                        id={`${uid}-phone`}
                        type="tel"
                        placeholder="e.g. +91 97395 70009"
                        value={phone}
                        onChange={(e) => handleFieldChange("phone", e.target.value)}
                        className={`w-full pl-9 pr-4 py-3 rounded-xl border text-xs font-semibold text-[#2B2B2B] bg-[#F8F5F0] focus:bg-white outline-none transition-all ${
                          errors.phone
                            ? "border-red-400 ring-1 ring-red-200"
                            : "border-[#E9E3D8] focus:border-[#C8A96A]"
                        }`}
                      />
                    </div>
                    {errors.phone && (
                      <p className="flex items-center gap-1 text-[10px] text-red-500 font-semibold mt-0.5 animate-slide-up">
                        <AlertCircle size={10} /> {errors.phone}
                      </p>
                    )}
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="btn-submit w-full flex items-center justify-center gap-2.5 disabled:opacity-75 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        <span>Opening WhatsApp…</span>
                      </>
                    ) : (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                        <span>Discuss Your Project</span>
                      </>
                    )}
                  </button>
                </div>
              </form>

              <button
                type="button"
                onClick={resetQuiz}
                disabled={isLoading}
                className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-[#E9E3D8] bg-white text-[#666] text-xs font-bold uppercase tracking-widest hover:border-[#2B2B2B] hover:text-[#2B2B2B] transition-all duration-200 outline-none disabled:opacity-50"
              >
                <RefreshCcw size={13} /> Retake Quiz
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
