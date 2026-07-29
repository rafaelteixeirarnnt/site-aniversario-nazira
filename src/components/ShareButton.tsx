import { ReactNode, useState } from "react";

type ShareButtonProps = {
  children: ReactNode;
  className?: string;
};

export default function ShareButton({ children, className = "" }: ShareButtonProps) {
  const [status, setStatus] = useState("");

  async function copyCurrentUrl() {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(window.location.href);
      return;
    }

    const input = document.createElement("textarea");
    input.value = window.location.href;
    input.setAttribute("readonly", "");
    input.style.position = "fixed";
    input.style.top = "0";
    input.style.left = "-9999px";
    document.body.appendChild(input);
    input.select();
    input.setSelectionRange(0, input.value.length);

    const didCopy = document.execCommand("copy");
    document.body.removeChild(input);

    if (!didCopy) {
      throw new Error("Copy command failed");
    }
  }

  async function handleShare() {
    try {
      await copyCurrentUrl();
      setStatus("Link copiado!");
    } catch {
      setStatus("Não foi possível copiar o link.");
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
