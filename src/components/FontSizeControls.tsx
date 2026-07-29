import { RotateCcw } from "lucide-react";

type FontSizeControlsProps = {
  label: string;
  canDecrease: boolean;
  canIncrease: boolean;
  onDecrease: () => void;
  onReset: () => void;
  onIncrease: () => void;
};

export default function FontSizeControls({
  label,
  canDecrease,
  canIncrease,
  onDecrease,
  onReset,
  onIncrease,
}: FontSizeControlsProps) {
  return (
    <div className="font-controls" aria-label="Controle do tamanho da letra">
      <span className="font-size-label">Tamanho: {label}</span>
      <div className="font-buttons">
        <button
          type="button"
          onClick={onDecrease}
          disabled={!canDecrease}
          aria-label="Diminuir tamanho da letra"
        >
          A−
        </button>
        <button type="button" onClick={onReset} aria-label="Voltar ao tamanho padrão">
          <RotateCcw size={18} aria-hidden="true" />
          A
        </button>
        <button
          type="button"
          onClick={onIncrease}
          disabled={!canIncrease}
          aria-label="Aumentar tamanho da letra"
        >
          A+
        </button>
      </div>
    </div>
  );
}
