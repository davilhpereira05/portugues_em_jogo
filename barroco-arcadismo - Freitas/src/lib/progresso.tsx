import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { totalNos } from "@/data/mapa";
import { quizQuestoes } from "@/data/content";

type Estado = {
  pontos: number;
  quizFeito: boolean;
  quizAcertos: number;
  nos: string[];
  desafios: string[];
  caminhos: string[];
  finalFeito: boolean;
  finalAcertos: number;
};

const inicial: Estado = {
  pontos: 0,
  quizFeito: false,
  quizAcertos: 0,
  nos: [],
  desafios: [],
  caminhos: [],
  finalFeito: false,
  finalAcertos: 0,
};

const CHAVE = "barroco-arcadismo-progresso-v1";

type Ctx = {
  estado: Estado;
  pronto: boolean;
  registrarQuiz: (acertos: number) => void;
  concluirNo: (id: string, comDesafio: boolean) => void;
  concluirCaminho: (id: string) => void;
  registrarFinal: (acertos: number) => void;
  reiniciar: () => void;
  progressoPercent: number;
};

const ProgressoContext = createContext<Ctx | null>(null);

export function ProgressoProvider({ children }: { children: ReactNode }) {
  const [estado, setEstado] = useState<Estado>(inicial);
  const [pronto, setPronto] = useState(false);

  useEffect(() => {
    try {
      const bruto = localStorage.getItem(CHAVE);
      if (bruto) setEstado({ ...inicial, ...JSON.parse(bruto) });
    } catch {
      /* ignora */
    }
    setPronto(true);
  }, []);

  useEffect(() => {
    if (!pronto) return;
    try {
      localStorage.setItem(CHAVE, JSON.stringify(estado));
    } catch {
      /* ignora */
    }
  }, [estado, pronto]);

  const registrarQuiz = useCallback((acertos: number) => {
    setEstado((e) => {
      const ganho = acertos * 100;
      const jaTinha = e.quizFeito ? e.quizAcertos * 100 : 0;
      return {
        ...e,
        quizFeito: true,
        quizAcertos: Math.max(e.quizAcertos, acertos),
        pontos: e.pontos - jaTinha + Math.max(jaTinha, ganho),
      };
    });
  }, []);

  const concluirNo = useCallback((id: string, comDesafio: boolean) => {
    setEstado((e) => {
      if (e.nos.includes(id)) return e;
      return {
        ...e,
        nos: [...e.nos, id],
        desafios: comDesafio ? [...e.desafios, id] : e.desafios,
        pontos: e.pontos + 25 + (comDesafio ? 100 : 0),
      };
    });
  }, []);

  const concluirCaminho = useCallback((id: string) => {
    setEstado((e) =>
      e.caminhos.includes(id)
        ? e
        : { ...e, caminhos: [...e.caminhos, id], pontos: e.pontos + 250 },
    );
  }, []);

  const registrarFinal = useCallback((acertos: number) => {
    setEstado((e) => ({
      ...e,
      finalFeito: true,
      finalAcertos: Math.max(e.finalAcertos, acertos),
      pontos: e.finalFeito ? e.pontos : e.pontos + 500,
    }));
  }, []);

  const reiniciar = useCallback(() => setEstado(inicial), []);

  const progressoPercent = useMemo(() => {
    const totalEtapas = totalNos + quizQuestoes.length + 1;
    const feitas =
      estado.nos.length +
      (estado.quizFeito ? estado.quizAcertos : 0) +
      (estado.finalFeito ? 1 : 0);
    return Math.min(100, Math.round((feitas / totalEtapas) * 100));
  }, [estado]);

  const valor = useMemo(
    () => ({
      estado,
      pronto,
      registrarQuiz,
      concluirNo,
      concluirCaminho,
      registrarFinal,
      reiniciar,
      progressoPercent,
    }),
    [
      estado,
      pronto,
      registrarQuiz,
      concluirNo,
      concluirCaminho,
      registrarFinal,
      reiniciar,
      progressoPercent,
    ],
  );

  return <ProgressoContext.Provider value={valor}>{children}</ProgressoContext.Provider>;
}

export function useProgresso() {
  const ctx = useContext(ProgressoContext);
  if (!ctx) throw new Error("useProgresso precisa estar dentro de ProgressoProvider");
  return ctx;
}
