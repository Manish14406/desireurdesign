import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
} from "react";

// ─────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────

export type PropertyType = "apartment" | "villa" | "penthouse" | "commercial";
export type BHK = "1" | "2" | "3" | "4+";
export type Package = "essential" | "premium" | "luxury";

export interface CalculatorSnapshot {
  /** Calculator inputs */
  propertyType: PropertyType;
  bhk: BHK;
  area: number;
  pkg: Package;
  /** Derived cost range */
  minCost: number;
  maxCost: number;
  /** Package label */
  packageLabel: string;
  /** Personal details filled inside the calculator */
  calcName: string;
  calcPhone: string;
  calcEmail: string;
  calcMessage: string;
  /** Human-readable selected options for summary display */
  selectedOptions: string[];
}

interface CalculatorContextType {
  snapshot: CalculatorSnapshot;
  setSnapshot: (snap: Partial<CalculatorSnapshot>) => void;
  /** Set true when "Book Free Consultation" is clicked from the calculator */
  triggerConsultation: boolean;
  setTriggerConsultation: (v: boolean) => void;
}

// ─────────────────────────────────────────────────────────────
// SHARED LOOKUP TABLES — exported for use in components
// ─────────────────────────────────────────────────────────────

export const PRICE_PER_SQFT: Record<Package, { min: number; max: number }> = {
  essential: { min: 800,  max: 1200 },
  premium:   { min: 1200, max: 1800 },
  luxury:    { min: 1800, max: 2800 },
};

export const PACKAGE_LABELS: Record<Package, string> = {
  essential: "Essential",
  premium:   "Premium",
  luxury:    "Luxury",
};

export const PACKAGE_DESC: Record<Package, string> = {
  essential: "Quality materials, clean finishes",
  premium:   "Branded hardware, elegant design",
  luxury:    "Ultra-premium, bespoke craftsmanship",
};

// ─────────────────────────────────────────────────────────────
// DEFAULT SNAPSHOT
// ─────────────────────────────────────────────────────────────

function buildDefault(): CalculatorSnapshot {
  const propertyType: PropertyType = "apartment";
  const bhk: BHK = "2";
  const area = 1000;
  const pkg: Package = "premium";
  const range = PRICE_PER_SQFT[pkg];
  return {
    propertyType,
    bhk,
    area,
    pkg,
    minCost: area * range.min,
    maxCost: area * range.max,
    packageLabel: PACKAGE_LABELS[pkg],
    calcName: "",
    calcPhone: "",
    calcEmail: "",
    calcMessage: "",
    selectedOptions: [
      `${bhk} BHK ${propertyType.charAt(0).toUpperCase() + propertyType.slice(1)}`,
      `${PACKAGE_LABELS[pkg]} Package`,
      `${area.toLocaleString()} sq ft`,
    ],
  };
}

// ─────────────────────────────────────────────────────────────
// CONTEXT
// ─────────────────────────────────────────────────────────────

const CalculatorContext = createContext<CalculatorContextType>({
  snapshot: buildDefault(),
  setSnapshot: () => {},
  triggerConsultation: false,
  setTriggerConsultation: () => {},
});

export function CalculatorProvider({ children }: { children: React.ReactNode }) {
  const [snapshot, _setSnapshot] = useState<CalculatorSnapshot>(buildDefault());
  const [triggerConsultation, setTriggerConsultation] = useState(false);

  const setSnapshot = useCallback((partial: Partial<CalculatorSnapshot>) => {
    _setSnapshot((prev) => ({ ...prev, ...partial }));
  }, []);

  const value = useMemo<CalculatorContextType>(
    () => ({ snapshot, setSnapshot, triggerConsultation, setTriggerConsultation }),
    [snapshot, setSnapshot, triggerConsultation]
  );

  return (
    <CalculatorContext.Provider value={value}>
      {children}
    </CalculatorContext.Provider>
  );
}

export function useCalculator() {
  return useContext(CalculatorContext);
}
