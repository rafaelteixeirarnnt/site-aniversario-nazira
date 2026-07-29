import { BookOpen, ChevronRight, Music2 } from "lucide-react";
import type { ProgramItem } from "../types/program";

type ProgramCardProps = {
  item: ProgramItem;
  isActive: boolean;
  onSelect: (item: ProgramItem) => void;
};

export default function ProgramCard({ item, isActive, onSelect }: ProgramCardProps) {
  const Icon = item.type === "reading" ? BookOpen : Music2;

  return (
    <li>
      <button
        type="button"
        className={`program-card ${isActive ? "is-active" : ""}`}
        onClick={() => onSelect(item)}
        aria-current={isActive ? "true" : undefined}
      >
        <span className="program-number">{item.order}</span>
        <span className="program-card-copy">
          <span className="program-title">{item.title}</span>
          <span className="program-meta">{item.artist || item.reference || "Momento preparado"}</span>
        </span>
        <span className="program-card-action">
          <Icon size={20} aria-hidden="true" />
          <span>Ver letra</span>
        </span>
        <ChevronRight className="program-chevron" size={20} aria-hidden="true" />
      </button>
    </li>
  );
}
