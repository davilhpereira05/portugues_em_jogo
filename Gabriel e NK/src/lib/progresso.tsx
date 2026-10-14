import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { playSound, type SoundName } from "./sound";

export type Area = "verbal" | "nominal" | "especiais";
export type Modo = "aprendizagem" | "prova";

export type RespostaRegistrada = {
  id: string;
  area: Area;
  correta: boolean;
  resposta: string;
};

export type EstadoProgresso = {
  xp: number;
  acertos: number;
  erros: number;
  respondidas: number;
  combo: number;
  melhorCombo: number;
  missoes: string[];
  errosPorId: Record<string, number>;
  atividadesFeitas: string[];
  modo: Modo;
  ultimoQuiz: {
    concluidoEm: string;
    modo: Modo;
    respostas: RespostaRegistrada[];
  } | null;
};

export const NIVEIS = [
  { nivel: 1, nome: "Aprendiz", xpMin: 0, xpMax: 500 },
  { nivel: 2, nome: "Observador", xpMin: 500, xpMax: 1000 },
  { nivel: 3, nome: "Caçador de Erros", xpMin: 1000, xpMax: 2000 },
  { nivel: 4, nome: "Especialista", xpMin: 2000, xpMax: 3500 },
  { nivel: 5, nome: "Mestre da Concordância", xpMin: 3500, xpMax: 5000 },
] as const;

export const XP = {
  acerto: 100,
  correcao: 50,
  missao: 200,
  desafioFinal: 500,
} as const;

const STORAGE_KEY = "concorda:progresso";
const SOM_KEY = "concorda:som";

const estadoInicial: EstadoProgresso = {
  xp: 0,
  acertos: 0,
  erros: 0,
  respondidas: 0,
  combo: 0,
  melhorCombo: 0,
  missoes: [],
  errosPorId: {},
  atividadesFeitas: [],
  modo: "aprendizagem",
  ultimoQuiz: null,
};

export function nivelDoXp(xp: number) {
  const faixa = [...NIVEIS].reverse().find((n) => xp >= n.xpMin) ?? NIVEIS[0];
  const progressoNivel = Math.min(
    100,
    Math.round(((xp - faixa.xpMin) / (faixa.xpMax - faixa.xpMin)) * 100),
  );
  return { ...faixa, progressoNivel };
}

type Ctx = {
  estado: EstadoProgresso;
  som: boolean;
  alternarSom: () => void;
  tocar: (nome: SoundName) => void;
  nivel: ReturnType<typeof nivelDoXp>;
  precisao: number;
  conhecimento: number;
  registrarResposta: (dados: {
    id: string;
    area: Area;
    correta: boolean;
    resposta?: string | undefined;
    xp?: number | undefined;
    silencioso?: boolean | undefined;
  }) => void;
  concluirMissao: (id: string) => boolean;
  salvarQuiz: (respostas: RespostaRegistrada[], modo: Modo) => void;
  definirModo: (modo: Modo) => void;
  reiniciar: () => void;
  ultimoGanho: { valor: number; chave: number } | null;
};

const ProgressoContext = createContext<Ctx | null>(null);

export function ProgressoProvider({ children }: { children: ReactNode }) {
  const [estado, setEstado] = useState<EstadoProgresso>(estadoInicial);
  const [som, setSom] = useState(true);
  const [hidratado, setHidratado] = useState(false);
  const [ultimoGanho, setUltimoGanho] = useState<{ valor: number; chave: number } | null>(null);
  const nivelAnterior = useRef(1);

  useEffect(() => {
    try {
      const bruto = window.localStorage.getItem(STORAGE_KEY);
      if (bruto) setEstado({ ...estadoInicial, ...(JSON.parse(bruto) as EstadoProgresso) });
      const somSalvo = window.localStorage.getItem(SOM_KEY);
      if (somSalvo) setSom(somSalvo === "on");
    } catch {
      /* dados inválidos são ignorados */
    }
    setHidratado(true);
  }, []);

  useEffect(() => {
    if (!hidratado) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(estado));
  }, [estado, hidratado]);

  useEffect(() => {
    if (!hidratado) return;
    window.localStorage.setItem(SOM_KEY, som ? "on" : "off");
  }, [som, hidratado]);

  const tocar = useCallback(
    (nome: SoundName) => {
      if (som) playSound(nome);
    },
    [som],
  );

  const nivel = useMemo(() => nivelDoXp(estado.xp), [estado.xp]);

  useEffect(() => {
    if (!hidratado) return;
    if (nivel.nivel > nivelAnterior.current) tocar("nivel");
    nivelAnterior.current = nivel.nivel;
  }, [nivel.nivel, hidratado, tocar]);

  const registrarResposta = useCallback<Ctx["registrarResposta"]>(
    ({ id, area, correta, resposta = "", xp, silencioso }) => {
      setEstado((atual) => {
        const jaFeita = atual.atividadesFeitas.includes(id);
        const ganho = correta ? (xp ?? XP.acerto) : 0;
        const bonusCombo = correta && atual.combo >= 2 ? 25 * Math.min(atual.combo, 4) : 0;
        const comboNovo = correta ? atual.combo + 1 : 0;
        const totalGanho = jaFeita && correta ? Math.round(ganho / 2) : ganho + bonusCombo;

        if (totalGanho > 0) setUltimoGanho({ valor: totalGanho, chave: Date.now() });

        const errosPorId = { ...atual.errosPorId };
        if (correta) delete errosPorId[id];
        else errosPorId[id] = (errosPorId[id] ?? 0) + 1;

        return {
          ...atual,
          xp: atual.xp + totalGanho,
          acertos: atual.acertos + (correta ? 1 : 0),
          erros: atual.erros + (correta ? 0 : 1),
          respondidas: atual.respondidas + 1,
          combo: comboNovo,
          melhorCombo: Math.max(atual.melhorCombo, comboNovo),
          errosPorId,
          atividadesFeitas: jaFeita ? atual.atividadesFeitas : [...atual.atividadesFeitas, id],
          ultimoQuiz: atual.ultimoQuiz,
          modo: atual.modo,
        };
      });

      if (silencioso) return;
      if (correta) {
        tocar("correto");
      } else {
        tocar("erro");
      }
      void resposta;
      void area;
    },
    [tocar],
  );

  const concluirMissao = useCallback<Ctx["concluirMissao"]>(
    (id) => {
      let nova = false;
      setEstado((atual) => {
        if (atual.missoes.includes(id)) return atual;
        nova = true;
        return { ...atual, missoes: [...atual.missoes, id], xp: atual.xp + XP.missao };
      });
      if (nova) {
        setUltimoGanho({ valor: XP.missao, chave: Date.now() });
        tocar("missao");
      }
      return nova;
    },
    [tocar],
  );

  const salvarQuiz = useCallback<Ctx["salvarQuiz"]>((respostas, modo) => {
    setEstado((atual) => ({
      ...atual,
      ultimoQuiz: { concluidoEm: new Date().toISOString(), modo, respostas },
    }));
  }, []);

  const definirModo = useCallback((modo: Modo) => {
    setEstado((atual) => ({ ...atual, modo }));
  }, []);

  const reiniciar = useCallback(() => {
    setEstado(estadoInicial);
    window.localStorage.removeItem(STORAGE_KEY);
  }, []);

  const precisao = estado.respondidas ? Math.round((estado.acertos / estado.respondidas) * 100) : 0;
  const conhecimento = Math.min(
    100,
    Math.round((estado.xp / 2000) * 60 + (estado.missoes.length / 6) * 40),
  );

  const valor: Ctx = {
    estado,
    som,
    alternarSom: () => setSom((s) => !s),
    tocar,
    nivel,
    precisao,
    conhecimento,
    registrarResposta,
    concluirMissao,
    salvarQuiz,
    definirModo,
    reiniciar,
    ultimoGanho,
  };

  return <ProgressoContext.Provider value={valor}>{children}</ProgressoContext.Provider>;
}

export function useProgresso() {
  const ctx = useContext(ProgressoContext);
  if (!ctx) throw new Error("useProgresso deve ser usado dentro de ProgressoProvider");
  return ctx;
}
