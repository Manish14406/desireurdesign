import { useState, useId, useEffect } from "react";
import { ArrowRight, ArrowLeft, RefreshCcw, User, Phone, AlertCircle, Loader2 } from "lucide-react";
import { useCalculator } from "@/contexts/CalculatorContext";

// ─────────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────────

const WHATSAPP_NUMBER = "919739570009";

type Question = {
  id: string;
  title: string;
  options: string[];
};

const questions: Question[] = [
  {
    id: "atmosphere",
    title: "When you walk through your front door, what's the first feeling you want to embrace you?",
    options: [
      "A peaceful sanctuary to unwind (Calm & Cozy)",
      "An energetic, inspiring creative hub (Vibrant & Lively)",
      "A sleek, uncluttered breath of fresh air (Clean & Minimal)",
      "A warm, grand, and welcoming heritage (Classic & Rich)",
    ],
  },
  {
    id: "favoriteStyle",
    title: "How would your friends describe your personal style?",
    options: [
      "Simple & structured (The Effortless Minimalist)",
      "Bold & expressive (The Trendsetter)",
      "Warm & inviting (The Cozy Host)",
      "Detailed & artistic (The Curation Enthusiast)",
    ],
  },
  {
    id: "favoriteRoom",
    title: "Where do you envision spending your absolute favorite moments at home?",
    options: [
      "Gathered around a spacious kitchen island sharing meals",
      "Curled up with a book in a cozy reading corner",
      "Hosting movie nights or deep conversations in a lively living room",
      "Unwinding in a spa-like bedroom sanctuary",
    ],
  },
  {
    id: "inspiration",
    title: "Where do you usually find yourself gathering design ideas?",
    options: [
      "Nature, travel, and quiet outdoor landscapes",
      "High-end design magazines and boutique hotels",
      "Pinterest boards, Instagram, and modern design blogs",
      "Vintage shops, art galleries, and historic architecture",
    ],
  },
  {
    id: "lifestyle",
    title: "How does your household typically flow on a daily basis?",
    options: [
      "Busy and active—kids, pets, and lots of movement",
      "Work-from-home focus—need quiet, structured zones",
      "Social butterfly—frequent dinner parties and guests",
      "Slow living—focus on self-care, cooking, and relaxation",
    ],
  },
  {
    id: "colors",
    title: "Which color palette makes your heart sing?",
    options: [
      "Soothing neutrals (warm beiges, soft creams, greys)",
      "Deep, moody, and dramatic (charcoal, emerald, navy, black)",
      "Earthy & organic (forest greens, terracotta, warm rust)",
      "Cheerful & bright (pastels, pops of accent colors)",
    ],
  },
  {
    id: "materials",
    title: "If you could run your hands over any texture right now, which feels right?",
    options: [
      "Natural linen, light-toned raw wood, and matte stone",
      "Rich velvet, polished marble, and brushed brass details",
      "Industrial steel, smooth glass, and clean concrete",
      "Deep grain oak, woven rattan, and warm leather",
    ],
  },
  {
    id: "priority",
    title: "What is the single most important element that makes a home feel truly complete?",
    options: [
      "Abundant natural light and open, breathing space",
      "Smart, hidden organization that keeps clutter away",
      "A display of personal treasures, books, and art",
      "Plush, ultra-comfortable seating that invites you to sink in",
    ],
  },
  {
    id: "expectations",
    title: "What is your biggest expectation from our collaboration?",
    options: [
      "Bring professional expertise to maximize space and function",
      "Save me time by managing everything from design to execution",
      "Help me discover and define my own style instead of copying trends",
      "Co-create a unique masterpiece that stands out from the ordinary",
    ],
  },
  {
    id: "additionalPreference",
    title: "Is there any unique feature or special touch you've always dreamed of having?",
    options: [
      "A dedicated home library or cozy reading nook",
      "A custom coffee bar, wine station, or hidden pantry",
      "A gorgeous accent wall or custom statement lighting",
      "Smart-home automation and integrated tech spaces",
    ],
  },
];

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

  // currentStep: 0 = Welcome, 1-10 = Questions, 11 = Finished/Summary
  const [currentStep, setCurrentStep] = useState(0);
  
  // Store selections as key-value pairs
  const [selections, setSelections] = useState<Record<string, string>>({});

  // Client Details
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  // Sync inputs from shared context
  useEffect(() => {
    if (snapshot.calcName) setName(snapshot.calcName);
    if (snapshot.calcPhone) setPhone(snapshot.calcPhone);
  }, [snapshot.calcName, snapshot.calcPhone]);

  const handleSelect = (questionId: string, optionValue: string) => {
    setSelections((prev) => ({
      ...prev,
      [questionId]: optionValue,
    }));

    // Automatically advance to the next step
    setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const resetQuiz = () => {
    setCurrentStep(0);
    setSelections({});
    setErrors({});
    setIsLoading(false);
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

  const handleSubmit = (e: React.FormEvent) => {
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

    const lines = [
      "INTERIOR DESIGN DISCOVERY",
      "",
      "Client Details",
      `• Name: ${name.trim()}`,
      `• Phone: ${phone.trim()}`,
      "",
      "Customer Preferences",
      "",
      `• Home Atmosphere: ${selections.atmosphere || ""}`,
      `• Favourite Style: ${selections.favoriteStyle || ""}`,
      `• Favourite Colours: ${selections.colors || ""}`,
      `• Preferred Materials: ${selections.materials || ""}`,
      `• Favourite Room: ${selections.favoriteRoom || ""}`,
      `• Lifestyle: ${selections.lifestyle || ""}`,
      `• Design Inspiration: ${selections.inspiration || ""}`,
      `• Most Important Priority: ${selections.priority || ""}`,
      `• Expectations from Designer: ${selections.expectations || ""}`,
      `• Additional Preference: ${selections.additionalPreference || ""}`,
      "",
      "Message:",
      "",
      "Hello Design Ur Desire,",
      "",
      "I completed the Design Discovery Quiz. Below are my preferences to help you understand my vision before our consultation.",
      "",
      "Please review them before contacting me.",
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

  const summaryFields = [
    { label: "Home Atmosphere", val: selections.atmosphere },
    { label: "Favourite Style", val: selections.favoriteStyle },
    { label: "Favourite Colours", val: selections.colors },
    { label: "Preferred Materials", val: selections.materials },
    { label: "Favourite Room", val: selections.favoriteRoom },
    { label: "Lifestyle", val: selections.lifestyle },
    { label: "Design Inspiration", val: selections.inspiration },
    { label: "Most Important Priority", val: selections.priority },
    { label: "Expectations from Designer", val: selections.expectations },
    { label: "Additional Preference", val: selections.additionalPreference },
  ];

  return (
    <section
      id="quiz"
      className="py-20 sm:py-28 md:py-40 px-4 sm:px-8 md:px-12 bg-[#F8F5F0] border-t border-[#E9E3D8] overflow-hidden"
      aria-label="Design Personality Discovery"
    >
      <div className="max-w-[54rem] mx-auto text-center">
        {/* Section Header */}
        {currentStep <= 10 && (
          <div className="mb-12">
            <p
              className="text-[10px] uppercase tracking-[0.4em] text-[#C8A96A] font-bold mb-3"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Interactive Discovery
            </p>
            <h2 className="cinema-heading mb-4">Design Personality Quiz</h2>
            <div className="cinema-accent-line mx-auto" />
          </div>
        )}

        {/* Discovery container */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 md:p-14 shadow-[0_8px_32px_rgba(0,0,0,0.04)] border border-[#E9E3D8] transition-all duration-500 min-h-[380px] flex flex-col justify-center">
          {currentStep === 0 ? (
            /* Welcome / Introduction Screen */
            <div className="animate-fade-in text-center max-w-xl mx-auto py-4">
              <span className="inline-block text-4xl mb-6 animate-bounce">✨</span>
              <h3
                className="text-2xl sm:text-3xl font-black text-[#2B2B2B] mb-6 leading-tight"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Let's Play a Fun Design Quiz!
              </h3>
              <p className="text-[#666] font-light text-sm sm:text-base leading-relaxed mb-10">
                Take just 2 minutes to answer a few fun questions. This helps us understand your taste, lifestyle, and vision so our designers can have a more meaningful conversation with you.
              </p>
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="btn-submit inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-[#2B2B2B] text-white hover:bg-[#C8A96A] rounded-xl font-bold uppercase tracking-widest text-xs transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Start Quiz <ArrowRight size={16} />
              </button>
            </div>
          ) : currentStep >= 1 && currentStep <= 10 ? (
            /* Question Screen */
            <div className="animate-fade-in flex flex-col justify-between h-full">
              <div>
                {/* Progress Indicator */}
                <div className="flex justify-center gap-1.5 mb-10">
                  {questions.map((_, idx) => (
                    <div
                      key={idx}
                      className={`h-1.5 rounded-full transition-all duration-500 ${
                        idx + 1 <= currentStep ? "w-8 sm:w-12 bg-[#C8A96A]" : "w-3 bg-[#E9E3D8]"
                      }`}
                    />
                  ))}
                </div>

                {/* Question title */}
                <h3
                  className="text-xl sm:text-2xl md:text-3xl font-black text-[#2B2B2B] mb-10 leading-tight"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  {questions[currentStep - 1].title}
                </h3>

                {/* Options */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                  {questions[currentStep - 1].options.map((opt, idx) => {
                    const isSelected = selections[questions[currentStep - 1].id] === opt;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleSelect(questions[currentStep - 1].id, opt)}
                        className={`p-5 rounded-2xl border-2 text-left flex items-center justify-between outline-none transition-all duration-300 group ${
                          isSelected
                            ? "border-[#C8A96A] bg-[#FBF8F3] shadow-[0_4px_20px_rgba(200,169,106,0.15)]"
                            : "border-[#E9E3D8] bg-white hover:border-[#C8A96A] hover:bg-[#FBF8F3] hover:shadow-[0_4px_20px_rgba(200,169,106,0.1)]"
                        }`}
                      >
                        <span className={`font-semibold text-sm sm:text-base leading-snug transition-colors ${
                          isSelected ? "text-[#C8A96A]" : "text-[#2B2B2B] group-hover:text-[#C8A96A]"
                        }`}>
                          {opt}
                        </span>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                          isSelected ? "border-[#C8A96A]" : "border-[#E9E3D8] group-hover:border-[#C8A96A]"
                        }`}>
                          <div className={`w-2 h-2 rounded-full bg-[#C8A96A] transition-all ${
                            isSelected ? "scale-100 opacity-100" : "scale-50 opacity-0 group-hover:opacity-100 group-hover:scale-100"
                          }`} />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center justify-between mt-10 pt-6 border-t border-[#E9E3D8]/50">
                <button
                  type="button"
                  onClick={handleBack}
                  className="inline-flex items-center gap-1.5 py-2 px-4 rounded-xl text-xs font-bold uppercase tracking-widest text-[#666] hover:text-[#2B2B2B] hover:bg-[#F8F5F0] transition-all"
                >
                  <ArrowLeft size={14} /> Back
                </button>
                <span className="text-xs font-bold uppercase tracking-widest text-[#999]" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  Question {currentStep} of 10
                </span>
                <button
                  type="button"
                  onClick={() => setCurrentStep((prev) => prev + 1)}
                  className="inline-flex items-center gap-1.5 py-2 px-4 rounded-xl text-xs font-bold uppercase tracking-widest text-[#C8A96A] hover:text-[#2B2B2B] transition-all"
                >
                  {selections[questions[currentStep - 1].id] ? "Next" : "Skip"} <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ) : (
            /* Results / Final Step Screen */
            <div className="animate-fade-in text-center max-w-2xl mx-auto">
              <span className="inline-block text-4xl mb-4 animate-bounce">🏡</span>
              <p className="text-[10px] uppercase tracking-[0.3em] text-[#C8A96A] font-bold mb-3">
                Discovery Complete
              </p>
              <h3
                className="text-2xl sm:text-3xl font-black text-[#2B2B2B] mb-4 leading-tight"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Your Design Profile
              </h3>
              <p className="text-[#666] font-light text-sm sm:text-base max-w-xl mx-auto leading-relaxed mb-8">
                Thank you! We now have a better understanding of your design preferences. Our designers will use these insights to make your consultation more personalized.
              </p>

              {/* Selections Summary Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 text-left border border-[#E9E3D8] rounded-2xl p-5 bg-[#FDFDFD]">
                {summaryFields.map((field, idx) => (
                  <div key={idx} className="p-3 bg-[#F8F5F0] rounded-xl border border-[#E9E3D8]/60">
                    <p className="text-[8px] sm:text-[9px] uppercase tracking-widest text-[#999] font-bold">{field.label}</p>
                    <p className="text-xs font-bold text-[#2B2B2B] mt-0.5 leading-snug">{field.val || "Skipped"}</p>
                  </div>
                ))}
              </div>

              {/* Consultation Details Capture Form */}
              <form onSubmit={handleSubmit} className="border-t border-[#E9E3D8] pt-8 mb-8 text-left space-y-4">
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
