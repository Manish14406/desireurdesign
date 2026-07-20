import React, {
  createContext,
  useContext,
  useRef,
  useState,
  useMemo,
} from "react";

/** Key used in sessionStorage so the loader only shows on the first page load per session. */
export const LOADER_SESSION_KEY = "dud_loader_shown";

interface LoadingContextType {
  /** True while the intro loader is active and covering the screen. */
  isLoading: boolean;
  /** Call this once the loader animation is fully finished. */
  setLoadingComplete: () => void;
  /** Attach this ref to the <img> element inside the nav bar. */
  navLogoRef: React.RefObject<HTMLImageElement | null>;
}

const LoadingContext = createContext<LoadingContextType>({
  isLoading: false,
  setLoadingComplete: () => {},
  navLogoRef: { current: null },
});

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  // Determine on first render whether the loader was already shown this session.
  const hasShownBefore =
    typeof sessionStorage !== "undefined" &&
    sessionStorage.getItem(LOADER_SESSION_KEY) === "1";

  const [isLoading, setIsLoading] = useState(!hasShownBefore);
  const navLogoRef = useRef<HTMLImageElement>(null);

  const value = useMemo<LoadingContextType>(
    () => ({
      isLoading,
      setLoadingComplete: () => setIsLoading(false),
      navLogoRef,
    }),
    [isLoading],
  );

  return (
    <LoadingContext.Provider value={value}>{children}</LoadingContext.Provider>
  );
}

export function useLoading() {
  return useContext(LoadingContext);
}
