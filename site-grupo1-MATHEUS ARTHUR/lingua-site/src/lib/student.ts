import { useEffect, useState } from "react";

export type Student = { nome: string; sala: string };

const KEY = "lingua-aluno";

export function saveStudent(student: Student) {
  localStorage.setItem(KEY, JSON.stringify(student));
}

export function clearStudent() {
  localStorage.removeItem(KEY);
}

export function readStudent(): Student | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Student;
    if (!parsed?.nome) return null;
    return parsed;
  } catch {
    return null;
  }
}

/** Returns undefined while hydrating, null when there is no student. */
export function useStudent(): Student | null | undefined {
  const [student, setStudent] = useState<Student | null | undefined>(undefined);

  useEffect(() => {
    setStudent(readStudent());
  }, []);

  return student;
}
