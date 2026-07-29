import { useMemo, useRef, useState } from "react";
import EventLocation from "./components/EventLocation";
import Footer from "./components/Footer";
import Header from "./components/Header";
import ProgramList from "./components/ProgramList";
import Reader from "./components/Reader";
import { program } from "./data/program";
import { usePersistentFontSize } from "./hooks/usePersistentFontSize";
import type { ProgramItem } from "./types/program";

export default function App() {
  const [selectedId, setSelectedId] = useState(program[0].id);
  const programSectionRef = useRef<HTMLElement | null>(null);
  const fontSize = usePersistentFontSize();

  const selectedIndex = useMemo(
    () => Math.max(0, program.findIndex((item) => item.id === selectedId)),
    [selectedId],
  );
  const selectedItem = program[selectedIndex];

  function selectItem(item: ProgramItem) {
    setSelectedId(item.id);
    window.setTimeout(() => {
      const reader = document.querySelector(".reader");
      const target =
        window.matchMedia("(max-width: 779px)").matches && reader
          ? reader
          : programSectionRef.current;

      target?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 0);
  }

  function backToList() {
    document.getElementById("program-list-title")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  function backToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <>
      <Header onBackToTop={backToTop} />
      <main>
        <EventLocation />

        <section
          className="section program-section"
          id="programacao"
          aria-labelledby="programacao-title"
          ref={programSectionRef}
        >
          <div className="section-heading">
            <h2 id="programacao-title">Programação</h2>
          </div>
          <div className="program-shell">
            <ProgramList items={program} selectedItem={selectedItem} onSelect={selectItem} />
            <Reader
              item={selectedItem}
              currentIndex={selectedIndex}
              total={program.length}
              fontSize={fontSize.current.value}
              fontLabel={fontSize.current.label}
              canDecreaseFont={fontSize.canDecrease}
              canIncreaseFont={fontSize.canIncrease}
              previousItem={program[selectedIndex - 1]}
              nextItem={program[selectedIndex + 1]}
              onSelect={selectItem}
              onBackToList={backToList}
              onDecreaseFont={fontSize.decrease}
              onResetFont={fontSize.reset}
              onIncreaseFont={fontSize.increase}
            />
          </div>
        </section>
      </main>
      <button type="button" className="back-to-top" onClick={backToTop}>
        Voltar ao início
      </button>
      <Footer />
    </>
  );
}
