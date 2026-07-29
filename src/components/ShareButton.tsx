import { ReactNode, useState } from "react";

type ShareButtonProps = {
  children: ReactNode;
  className?: string;
};

export default function ShareButton({ children, className = "" }: ShareButtonProps) {
  const [status, setStatus] = useState("");

  async function handleShare() {
    const shareData = {
      title: "Nazira 90 anos",
      text: "Programação musical da comemoração de 90 anos da Nazira.",
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        return;
      }

      await navigator.clipboard.writeText(window.location.href);
      setStatus("Link copiado!");
    } catch {
      setStatus("Não foi possível compartilhar agora.");
    } finally {
      window.setTimeout(() => setStatus(""), 2400);
    }
  }

  return (
    <span className="share-wrapper">
      <button type="button" className={className} onClick={handleShare} aria-label="Compartilhar site">
        {children}
      </button>
      {status ? (
        <span className="toast" role="status" aria-live="polite">
          {status}
        </span>
      ) : null}
    </span>
  );
}
