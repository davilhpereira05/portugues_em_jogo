import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { toast } from "sonner";

export type Mode = "estudante" | "infantil";
export type AchievementId = "primeiro" | "conectivos" | "pronomes" | "coerencia" | "quiz" | "mestre";

export const ACHIEVEMENTS: Record<AchievementId, { title: string; desc: string; emoji: string }> = {
  primeiro: { title: "Primeiro Passo", desc: "Completou a primeira atividade.", emoji: "👣" },
  conectivos: { title: "Mestre dos Conectivos", desc: "Completou as atividades de conectivos.", emoji: "🌉" },
  pronomes: { title: "Detetive dos Pronomes", desc: "Completou as atividades de pronomes.", emoji: "🔍" },
  coerencia: { title: "Guardião da Coerência", desc: "Completou as atividades de coerência.", emoji: "🛡️" },
  quiz: { title: "Campeão do Quiz", desc: "Terminou o quiz principal.", emoji: "🏆" },
  mestre: { title: "Mestre dos Textos", desc: "Concluiu o desafio final.", emoji: "👑" },
};

interface State {
  xp: number;
  phases: number[]; // completed phases 1..5
  achievements: AchievementId[];
  bestScore: number;
  quizDone: boolean;
  finalDone: boolean;
  mode: Mode;
}

const initial: State = { xp: 0, phases: [], achievements: [], bestScore: 0, quizDone: false, finalDone: false, mode: "estudante" };
const KEY = "portugues-em-jogo-g03";

interface Ctx extends State {
  progress: number;
  addXp: (n: number, label?: string) => void;
  completePhase: (n: number) => void;
  unlock: (a: AchievementId) => void;
  finishQuiz: (score: number) => void;
  finishFinal: () => void;
  setMode: (m: Mode) => void;
  reset: () => void;
  isUnlocked: (phase: number) => boolean;
  confetti: () => void;
  confettiKey: number;
}

const GameCtx = createContext<Ctx | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
  const [s, setS] = useState<State>(initial);
  const [loaded, setLoaded] = useState(false);
  const [confettiKey, setConfettiKey] = useState(0);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setS({ ...initial, ...JSON.parse(raw) });
    } catch {}
    setLoaded(true);
  }, []);
  useEffect(() => {
    if (loaded) localStorage.setItem(KEY, JSON.stringify(s));
    document.documentElement.classList.toggle("kid", s.mode === "infantil");
  }, [s, loaded]);

  const confetti = useCallback(() => setConfettiKey((k) => k + 1), []);

  const addXp = useCallback((n: number, label?: string) => {
    setS((p) => ({ ...p, xp: p.xp + n }));
    toast(`+${n} XP`, { description: label, icon: "⭐", duration: 1600 });
  }, []);

  const unlock = useCallback((a: AchievementId) => {
    setS((p) => {
      if (p.achievements.includes(a)) return p;
      const A = ACHIEVEMENTS[a];
      setTimeout(() => {
        toast.success(`Conquista desbloqueada: ${A.title}`, { description: A.desc, icon: A.emoji, duration: 4000 });
        setConfettiKey((k) => k + 1);
      }, 0);
      return { ...p, achievements: [...p.achievements, a] };
    });
  }, []);

  const completePhase = useCallback((n: number) => {
    setS((p) => {
      if (p.phases.includes(n)) return p;
      setTimeout(() => {
        toast(`Fase ${n} concluída! +20 XP`, { icon: "🔓", description: n < 5 ? `Fase ${n + 1} desbloqueada!` : "Desafio Final desbloqueado!" });
      }, 0);
      return { ...p, xp: p.xp + 20, phases: [...p.phases, n] };
    });
    unlock("primeiro");
    if (n === 2) unlock("conectivos");
    if (n === 3) unlock("pronomes");
    if (n === 4) unlock("coerencia");
  }, [unlock]);

  const finishQuiz = useCallback((score: number) => {
    setS((p) => {
      const first = !p.quizDone;
      if (first) setTimeout(() => toast("Quiz concluído! +50 XP", { icon: "🎉" }), 0);
      return { ...p, quizDone: true, bestScore: Math.max(p.bestScore, score), xp: p.xp + (first ? 50 : 0) };
    });
    unlock("primeiro");
    unlock("quiz");
  }, [unlock]);

  const finishFinal = useCallback(() => {
    setS((p) => {
      const first = !p.finalDone;
      return { ...p, finalDone: true, xp: p.xp + (first ? 100 : 0) };
    });
    unlock("mestre");
  }, [unlock]);

  const value = useMemo<Ctx>(() => {
    const done = s.phases.length + (s.quizDone ? 1 : 0) + (s.finalDone ? 1 : 0);
    return {
      ...s,
      progress: Math.round((done / 7) * 100),
      addXp, completePhase, unlock, finishQuiz, finishFinal, confetti, confettiKey,
      setMode: (m) => setS((p) => ({ ...p, mode: m })),
      reset: () => { setS({ ...initial, mode: s.mode }); toast("Aventura reiniciada.", { icon: "🔄" }); },
      isUnlocked: (phase) => phase === 1 || s.phases.includes(phase - 1),
    };
  }, [s, addXp, completePhase, unlock, finishQuiz, finishFinal, confetti, confettiKey]);

  return <GameCtx.Provider value={value}>{children}</GameCtx.Provider>;
}

export function useGame() {
  const c = useContext(GameCtx);
  if (!c) throw new Error("useGame outside provider");
  return c;
}

/** Pick text based on mode */
export function useT() {
  const { mode } = useGame();
  return (student: ReactNode, kid: ReactNode) => (mode === "infantil" ? kid : student);
}
