import { CalendarHeart, MapPin, Music2, Share2 } from "lucide-react";
import { eventInfo } from "../data/event";
import ShareButton from "./ShareButton";

type HeaderProps = {
  onBackToTop: () => void;
};

export default function Header({ onBackToTop }: HeaderProps) {
  return (
    <header className="site-header" id="topo">
      <div className="ornament ornament-left" aria-hidden="true" />
      <div className="ornament ornament-right" aria-hidden="true" />

      <div className="header-inner">
        <div className="brand-button">
          <button className="header-home-button" onClick={onBackToTop} aria-label="Voltar ao início">
            <span className="anniversary-mark">{eventInfo.age}</span>
          </button>
          <div>
            <h1 className="brand-title">{eventInfo.celebrant} {eventInfo.age} anos</h1>
            <p className="brand-subtitle">Uma vida de fé, amor e gratidão</p>
          </div>
        </div>

        <nav className="header-nav" aria-label="Navegação principal">
          <a href="#local" className="nav-link">
            <MapPin size={20} aria-hidden="true" />
            Local da festa
          </a>
          <a href="#programacao" className="nav-link">
            <Music2 size={20} aria-hidden="true" />
            Programação
          </a>
          <ShareButton className="nav-link nav-button">
            <Share2 size={20} aria-hidden="true" />
            Compartilhar site
          </ShareButton>
        </nav>

        <div className="header-date">
          <CalendarHeart size={20} aria-hidden="true" />
          <span>{eventInfo.date}</span>
        </div>
      </div>
    </header>
  );
}
