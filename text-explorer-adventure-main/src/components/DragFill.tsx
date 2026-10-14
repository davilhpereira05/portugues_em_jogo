import { useState, type DragEvent } from "react";

/**
 * Drag-and-drop fill-in. Works with mouse drag (HTML5) and with touch/keyboard:
 * tap an option to select it, then tap the blank (or tap the option twice).
 */
export function DragFill({
  before, after, options, correct, onAnswer, disabled, tone = "tangerine",
}: {
  before: string; after: string; options: string[]; correct: string;
  onAnswer: (value: string, ok: boolean) => void; disabled?: boolean; tone?: "tangerine" | "sky" | "grape";
}) {
  const [placed, setPlaced] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [over, setOver] = useState(false);

  const place = (v: string) => {
    if (disabled) return;
    setPlaced(v);
    setSelected(null);
    onAnswer(v, v === correct);
  };
  const chip = { tangerine: "bg-tangerine", sky: "bg-sky", grape: "bg-grape" }[tone];

  return (
    <div>
      <p className="text-xl font-semibold leading-relaxed md:text-2xl">
        {before}{" "}
        <button
          type="button"
          aria-label={placed ? `Lacuna preenchida com ${placed}` : "Lacuna vazia: solte ou toque para colocar a palavra"}
          onClick={() => selected && place(selected)}
          onDragOver={(e) => { e.preventDefault(); setOver(true); }}
          onDragLeave={() => setOver(false)}
          onDrop={(e: DragEvent) => { e.preventDefault(); setOver(false); place(e.dataTransfer.getData("text/plain")); }}
          className={`mx-1 inline-flex min-h-12 min-w-32 items-center justify-center rounded-xl border-4 border-dashed px-3 align-middle font-display transition-all ${
            placed ? (placed === correct ? "border-leaf bg-leaf-soft text-leaf-deep" : "border-tangerine bg-tangerine-soft text-tangerine-deep") : over || selected ? "border-sky bg-sky-soft scale-105" : "border-border bg-muted"
          }`}
        >
          {placed ?? "______"}
        </button>{" "}
        {after}
      </p>
      <div className="mt-5 flex flex-wrap gap-3" role="group" aria-label="Opções para arrastar">
        {options.map((o) => (
          <button
            key={o}
            type="button"
            draggable={!disabled}
            disabled={disabled}
            onDragStart={(e) => e.dataTransfer.setData("text/plain", o)}
            onClick={() => (selected === o ? place(o) : setSelected(o))}
            className={`btn-game ${chip} text-primary-foreground ${selected === o ? "ring-4 ring-ink ring-offset-2" : ""} cursor-grab select-none`}
          >
            {o}
          </button>
        ))}
      </div>
      <p className="mt-2 text-sm text-muted-foreground">Arraste a palavra até a lacuna — ou toque nela e depois toque na lacuna.</p>
    </div>
  );
}
