import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { MEDALS, QUESTIONS, XP_PER_QUESTION, rankFor } from "./quiz-data";

export type AnswerRecord = { choice: number; correct: boolean };

type ProgressState = {
  answers: Record<number, AnswerRecord>;
  huntSolved: number[];
  finalDone: boolean;
  startedAt: number | null;
  finishedAt: number | null;
};

const EMPTY: ProgressState = {
  answers: {},
  huntSolved: [],
  finalDone: false,
  startedAt: null,
  finishedAt: null,
};

const STORAGE_KEY = "missao-crase-progress-v1";

type Ctx = {
  state: ProgressState;
  xp: number;
  correctCount: number;
  wrongCount: number;
  answeredCount: number;
  percent: number;
  accuracy: number;
  rank: ReturnType<typeof rankFor>;
  medals: { id: string; icon: string; name: string; hint: string; unlocked: boolean }[];
  elapsedLabel: string;
  answerQuestion: (id: number, choice: number, correct: boolean) => void;
  solveHunt: (id: number) => void;
  completeFinal: () => void;
  startMission: () => void;
  reset: () => void;
};

const ProgressContext = createContext<Ctx | null>(null);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ProgressState>(EMPTY);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setState({ ...EMPTY, ...JSON.parse(raw) });
    } catch {
      /* ignore corrupted storage */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* storage unavailable */
    }
  }, [state, hydrated]);

  const answerQuestion = useCallback((id: number, choice: number, correct: boolean) => {
    setState((s) => {
      if (s.answers[id]) return s;
      return {
        ...s,
        startedAt: s.startedAt ?? Date.now(),
        answers: { ...s.answers, [id]: { choice, correct } },
      };
    });
  }, []);

  const solveHunt = useCallback((id: number) => {
    setState((s) =>
      s.huntSolved.includes(id) ? s : { ...s, huntSolved: [...s.huntSolved, id] },
    );
  }, []);

  const completeFinal = useCallback(() => {
    setState((s) => ({ ...s, finalDone: true, finishedAt: s.finishedAt ?? Date.now() }));
  }, []);

  const startMission = useCallback(() => {
    setState((s) => (s.startedAt ? s : { ...s, startedAt: Date.now() }));
  }, []);

  const reset = useCallback(() => setState(EMPTY), []);

  const value = useMemo<Ctx>(() => {
    const records = Object.values(state.answers);
    const correctCount = records.filter((r) => r.correct).length;
    const wrongCount = records.length - correctCount;
    const xp = correctCount * XP_PER_QUESTION;
    const total = QUESTIONS.length * XP_PER_QUESTION;
    const accuracy = records.length ? Math.round((correctCount / records.length) * 100) : 0;
    const ms =
      state.startedAt && (state.finishedAt ?? Date.now()) > state.startedAt
        ? (state.finishedAt ?? Date.now()) - state.startedAt
        : 0;
    const mins = Math.floor(ms / 60000);
    const secs = Math.floor((ms % 60000) / 1000);

    return {
      state,
      xp,
      correctCount,
      wrongCount,
      answeredCount: records.length,
      percent: Math.round((xp / total) * 100),
      accuracy,
      rank: rankFor(xp),
      medals: MEDALS.map((m) => ({ ...m, unlocked: xp >= m.requirement })),
      elapsedLabel: state.startedAt ? `${mins}min ${secs}s` : "—",
      answerQuestion,
      solveHunt,
      completeFinal,
      startMission,
      reset,
    };
  }, [state, answerQuestion, solveHunt, completeFinal, startMission, reset]);

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error("useProgress deve ser usado dentro de ProgressProvider");
  return ctx;
}
