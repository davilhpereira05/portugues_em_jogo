import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

type Tema = "claro" | "escuro";

const STORAGE_KEY = "concorda:tema";

type ThemeContextValue = {
  tema: Tema;
  alternarTema: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [tema, setTema] = useState<Tema>("escuro");

  useEffect(() => {
    const salvo = window.localStorage.getItem(STORAGE_KEY);
    if (salvo === "claro" || salvo === "escuro") {
      setTema(salvo);
      return;
    }
    const prefereClaro = window.matchMedia("(prefers-color-scheme: light)").matches;
    setTema(prefereClaro ? "claro" : "escuro");
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", tema === "escuro");
    document.documentElement.style.colorScheme = tema === "escuro" ? "dark" : "light";
    window.localStorage.setItem(STORAGE_KEY, tema);
  }, [tema]);

  const alternarTema = useCallback(() => {
    setTema((atual) => (atual === "escuro" ? "claro" : "escuro"));
  }, []);

  return <ThemeContext.Provider value={{ tema, alternarTema }}>{children}</ThemeContext.Provider>;
}

export function useTema() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTema deve ser usado dentro de ThemeProvider");
  return ctx;
}
