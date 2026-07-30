import { ArrowLeft, ArrowRight, BookOpen, ListMusic } from "lucide-react";
import type { CSSProperties } from "react";
import type { ProgramItem } from "../types/program";
import FontSizeControls from "./FontSizeControls";

type ReaderProps = {
  item: ProgramItem;
  currentIndex: number;
  total: number;
  fontSize: number;
  fontLabel: string;
  canDecreaseFont: boolean;
  canIncreaseFont: boolean;
  previousItem?: ProgramItem;
  nextItem?: ProgramItem;
  onSelect: (item: ProgramItem) => void;
  onBackToList: () => void;
  onDecreaseFont: () => void;
  onResetFont: () => void;
  onIncreaseFont: () => void;
};

export default function Reader({
  item,
  currentIndex,
  total,
  fontSize,
  fontLabel,
  canDecreaseFont,
  canIncreaseFont,
  previousItem,
  nextItem,
  onSelect,
  onBackToList,
  onDecreaseFont,
  onResetFont,
  onIncreaseFont,
}: ReaderProps) {
  const hasContent = Boolean(item.content?.trim());
  const emptyText =
    item.type === "reading"
      ? "A leitura bíblica será disponibilizada em breve."
      : "A letra desta música será disponibilizada em breve.";
  const navigationControls = (
    <div className="reader-navigation" aria-label="Navegação entre itens">
      <button
        type="button"
        className="secondary-action compact"
        disabled={!previousItem}
        onClick={() => previousItem && onSelect(previousItem)}
      >
        <ArrowLeft size={20} aria-hidden="true" />
        Anterior
      </button>
      <button
        type="button"
        className="secondary-action compact"
        disabled={!nextItem}
        onClick={() => nextItem && onSelect(nextItem)}
      >
        Próxima
        <ArrowRight size={20} aria-hidden="true" />
      </button>
    </div>
  );

  return (
    <article className="reader" aria-labelledby="reader-title">
      <div className="reader-topbar">
        <button type="button" className="text-action mobile-only" onClick={onBackToList}>
          <ListMusic size={20} aria-hidden="true" />
          Voltar à lista
        </button>
        <span className="position-pill">{currentIndex + 1} de {total}</span>
      </div>

      <div className="reader-header">
        <span className="reader-order">{item.order}</span>
        <div>
          <h2 id="reader-title">{item.title}</h2>
          <p>{item.artist || item.reference || "Programação da comemoração"}</p>
        </div>
      </div>

      {navigationControls}

      <div
        className={`reading-content ${hasContent ? "" : "is-empty"}`}
        style={{ "--reader-font-size": `${fontSize}px` } as CSSProperties}
      >
        {hasContent ? (
          <p>{item.content}</p>
        ) : (
          <div className="empty-state">
            <BookOpen size={42} aria-hidden="true" />
            <p>{emptyText}</p>
          </div>
        )}
      </div>

      <div className="reader-bottom-controls">
        <FontSizeControls
          label={fontLabel}
          canDecrease={canDecreaseFont}
          canIncrease={canIncreaseFont}
          onDecrease={onDecreaseFont}
          onReset={onResetFont}
          onIncrease={onIncreaseFont}
        />

        {navigationControls}
      </div>
    </article>
  );
}
