import type { ProgramItem } from "../types/program";
import ProgramCard from "./ProgramCard";

type ProgramListProps = {
  items: ProgramItem[];
  selectedItem: ProgramItem;
  onSelect: (item: ProgramItem) => void;
};

export default function ProgramList({ items, selectedItem, onSelect }: ProgramListProps) {
  return (
    <aside className="program-list-panel" aria-labelledby="program-list-title">
      <h3 id="program-list-title">Ordem da programação</h3>
      <ol className="program-list">
        {items.map((item) => (
          <ProgramCard
            key={item.id}
            item={item}
            isActive={selectedItem.id === item.id}
            onSelect={onSelect}
          />
        ))}
      </ol>
    </aside>
  );
}
