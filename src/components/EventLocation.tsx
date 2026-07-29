import { Check, Clipboard, ExternalLink, MapPinned } from "lucide-react";
import { useState } from "react";
import { eventInfo } from "../data/event";

const isConfigured = (value: string) =>
  Boolean(value.trim()) && !value.toLowerCase().startsWith("inserir");

export default function EventLocation() {
  const [copyStatus, setCopyStatus] = useState("");
  const hasMap = isConfigured(eventInfo.mapEmbedUrl);
  const hasMapsUrl = isConfigured(eventInfo.mapsUrl);

  async function copyText(value: string) {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(value);
      return;
    }

    const input = document.createElement("textarea");
    input.value = value;
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

  async function copyAddress() {
    try {
      await copyText(eventInfo.address);
      setCopyStatus("Endereço copiado!");
    } catch {
      setCopyStatus("Não foi possível copiar.");
    } finally {
      window.setTimeout(() => setCopyStatus(""), 2400);
    }
  }

  return (
    <section id="local" className="section location-section" aria-labelledby="local-title">
      <div className="section-heading">
        <MapPinned size={28} aria-hidden="true" />
        <h2 id="local-title">Local da comemoração</h2>
      </div>

      <div className="location-layout">
        <div className="location-details">
          <h3>{eventInfo.venue}</h3>
          <dl className="event-facts">
            <div>
              <dt>Data</dt>
              <dd>{eventInfo.date}</dd>
            </div>
            <div>
              <dt>Horário</dt>
              <dd>{eventInfo.time}</dd>
            </div>
            <div>
              <dt>Endereço</dt>
              <dd>{eventInfo.address}</dd>
            </div>
            {eventInfo.reference ? (
              <div>
                <dt>Referência</dt>
                <dd>{eventInfo.reference}</dd>
              </div>
            ) : null}
          </dl>

          <div className="location-actions">
            <a
              className={`primary-action ${hasMapsUrl ? "" : "is-disabled"}`}
              href={hasMapsUrl ? eventInfo.mapsUrl : undefined}
              target="_blank"
              rel="noreferrer"
              aria-disabled={!hasMapsUrl}
            >
              <ExternalLink size={22} aria-hidden="true" />
              Abrir no Google Maps
            </a>
            <button type="button" className="secondary-action" onClick={copyAddress}>
              {copyStatus === "Endereço copiado!" ? (
                <Check size={22} aria-hidden="true" />
              ) : (
                <Clipboard size={22} aria-hidden="true" />
              )}
              {copyStatus || "Copiar endereço"}
            </button>
          </div>
        </div>

        <div className="map-shell">
          {hasMap ? (
            <iframe
              title="Mapa do local da comemoração"
              src={eventInfo.mapEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          ) : (
            <div className="map-placeholder" role="img" aria-label="Mapa ainda não configurado">
              <MapPinned size={46} aria-hidden="true" />
              <p>Mapa será exibido aqui quando a URL de incorporação for preenchida.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
