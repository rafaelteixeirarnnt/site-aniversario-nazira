import { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "nazira-reader-font-size";

export const fontSizeOptions = [
  { label: "Pequeno", value: 18 },
  { label: "Padrão", value: 22 },
  { label: "Grande", value: 26 },
  { label: "Muito grande", value: 30 },
  { label: "Extra grande", value: 34 },
] as const;

const defaultIndex = 1;

function readInitialIndex() {
  if (typeof window === "undefined") {
    return defaultIndex;
  }

  const storedValue = Number(window.localStorage.getItem(STORAGE_KEY));
  const storedIndex = fontSizeOptions.findIndex((option) => option.value === storedValue);

  return storedIndex >= 0 ? storedIndex : defaultIndex;
}

export function usePersistentFontSize() {
  const [fontIndex, setFontIndex] = useState(readInitialIndex);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, String(fontSizeOptions[fontIndex].value));
  }, [fontIndex]);

  return useMemo(
    () => ({
      current: fontSizeOptions[fontIndex],
      canDecrease: fontIndex > 0,
      canIncrease: fontIndex < fontSizeOptions.length - 1,
      decrease: () => setFontIndex((index) => Math.max(0, index - 1)),
      reset: () => setFontIndex(defaultIndex),
      increase: () =>
        setFontIndex((index) => Math.min(fontSizeOptions.length - 1, index + 1)),
    }),
    [fontIndex],
  );
}
