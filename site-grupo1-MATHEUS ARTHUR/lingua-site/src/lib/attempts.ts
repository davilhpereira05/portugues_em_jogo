import { useEffect, useState } from "react";
import type { Student } from "./student";

export const MAX_TENTATIVAS = 3;

function key(s: Student) {
  return `lingua-tentativas:${s.nome.toLowerCase()}|${s.sala.toLowerCase()}`;
}

export function readAttempts(s: Student): number[] {
  try {
    const raw = localStorage.getItem(key(s));
    const arr = raw ? (JSON.parse(raw) as number[]) : [];
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

export function addAttempt(s: Student, score: number) {
  const arr = readAttempts(s);
  if (arr.length >= MAX_TENTATIVAS) return arr;
  const next = [...arr, score];
  localStorage.setItem(key(s), JSON.stringify(next));
  return next;
}

export function useAttempts(student: Student | null | undefined) {
  const [attempts, setAttempts] = useState<number[] | undefined>(undefined);
  useEffect(() => {
    if (student) setAttempts(readAttempts(student));
  }, [student]);
  return [attempts, setAttempts] as const;
}
