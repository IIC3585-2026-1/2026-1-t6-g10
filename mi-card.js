class MiCard extends HTMLElement {
  static observedAttributes = ["player", "country"];

  constructor() {
    super();

    const shadow = this.attachShadow({ mode: "open" });

    const template = document.createElement("template");
    template.innerHTML = `
      <style>
        :host {
          display: inline-block;
          flex: 0 0 var(--card-width, 140px);
          width: var(--card-width, 140px);
          min-width: var(--card-width, 140px);
          max-width: var(--card-width, 140px);
          height: var(--card-height, 90px);
          box-sizing: border-box;
          color: #ffffff;
          font-family: Arial, sans-serif;
          outline: none;
        }

        .card {
          position: relative;
          width: 100%;
          height: 100%;
          overflow: hidden;
          border-radius: 18px;
          border: 2px solid rgba(255, 255, 255, 0.78);
          background:
            radial-gradient(circle at top, rgba(255, 255, 255, 0.34), transparent 42%),
            linear-gradient(145deg, #0033a0 0%, #0033a0 34%, #d71920 66%, #ffffff 100%);
          box-shadow:
            0 16px 28px rgba(0, 0, 0, 0.22),
            inset 0 1px 0 rgba(255, 255, 255, 0.28);
          padding: 14px 12px;
          box-sizing: border-box;
          transition: transform 180ms ease, box-shadow 180ms ease;
        }

        .card::before {
          content: "";
          position: absolute;
          inset: 10px;
          border-radius: 14px;
          border: 1px solid rgba(255, 255, 255, 0.18);
          background: repeating-linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.12) 0,
            rgba(255, 255, 255, 0.12) 12px,
            rgba(255, 255, 255, 0.02) 12px,
            rgba(255, 255, 255, 0.02) 24px
          );
          pointer-events: none;
        }

        .card::after {
          content: "";
          position: absolute;
          inset: auto 0 0 0;
          height: 34%;
          background: linear-gradient(180deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.28));
          pointer-events: none;
        }

        .code {
          position: relative;
          z-index: 1;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
          font-size: 1.35rem;
          font-weight: 800;
          letter-spacing: 0.06em;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          font-variant-numeric: tabular-nums;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.35);
          transition: transform 180ms ease, opacity 180ms ease;
        }

        .details {
          position: absolute;
          left: 12px;
          right: 12px;
          bottom: 12px;
          z-index: 2;
          min-height: 54px;
          padding: 9px 10px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.88);
          color: #0033a0;
          box-shadow: 0 10px 18px rgba(0, 0, 0, 0.12);
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 2px;
          opacity: 0;
          transform: translateY(10px);
          transition: opacity 180ms ease, transform 180ms ease;
          pointer-events: none;
        }

        .details strong,
        .details span {
          display: block;
          line-height: 1.15;
        }

        .details strong {
          margin-bottom: 4px;
          font-size: 0.82rem;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: #d71920;
        }

        .details span {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          font-size: 0.78rem;
          font-weight: 700;
        }

        :host([rare="true"]) .card {
          border-color: #ffd700;
          box-shadow:
            0 16px 28px rgba(0, 0, 0, 0.22),
            0 0 16px rgba(255, 215, 0, 0.5),
            inset 0 1px 0 rgba(255, 255, 255, 0.28);
        }

        .holographic {
          position: absolute;
          inset: 0;
          z-index: 10;
          background: linear-gradient(
            115deg,
            transparent 10%,
            rgba(255, 255, 255, 0.6) 20%,
            rgba(255, 215, 0, 0.5) 25%,
            transparent 30%,
            transparent 45%,
            rgba(255, 0, 128, 0.4) 50%,
            rgba(0, 255, 255, 0.4) 55%,
            transparent 60%
          );
          background-size: 300% 300%;
          mix-blend-mode: color-dodge;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        :host([rare="true"]) .holographic {
          opacity: 1;
          animation: holo-shimmer 6s infinite linear;
        }

        @keyframes holo-shimmer {
          0% { background-position: 100% 100%; }
          100% { background-position: 0% 0%; }
        }

        :host(:hover) .card,
        :host(:focus-visible) .card {
          transform: translateY(-4px);
          box-shadow:
            0 20px 34px rgba(0, 0, 0, 0.26),
            inset 0 1px 0 rgba(255, 255, 255, 0.34);
        }

        :host([rare="true"]:hover) .card,
        :host([rare="true"]:focus-visible) .card {
          box-shadow:
            0 20px 34px rgba(0, 0, 0, 0.26),
            0 0 24px rgba(255, 215, 0, 0.7),
            inset 0 1px 0 rgba(255, 255, 255, 0.34);
        }

        :host(:hover) .code,
        :host(:focus-visible) .code {
          transform: translateY(-22px);
          opacity: 0.94;
        }

        :host(:hover) .details,
        :host(:focus-visible) .details {
          opacity: 1;
          transform: translateY(0);
        }
      </style>

      <div class="card" part="card">
        <div class="holographic"></div>
        <div class="code" part="code">
          <slot>Lámina</slot>
        </div>

        <div class="details" part="details" aria-hidden="true">
          <span class="player"></span>
          <span class="country"></span>
        </div>
      </div>
    `;

    shadow.appendChild(template.content.cloneNode(true));
    this._playerElement = shadow.querySelector(".player");
    this._countryElement = shadow.querySelector(".country");
  }

  connectedCallback() {
    if (!this.hasAttribute("tabindex")) {
      this.setAttribute("tabindex", "0");
    }

    if (!this.hasAttribute("role")) {
      this.setAttribute("role", "img");
    }

    this._render();
  }

  attributeChangedCallback() {
    this._render();
  }

  _render() {
    if (!this._playerElement || !this._countryElement) {
      return;
    }

    const player = this.getAttribute("player")?.trim() || "Jugador no definido";
    const country = this.getAttribute("country")?.trim() || "País no definido";

    this._playerElement.textContent = player;
    this._countryElement.textContent = country;
    this.setAttribute("aria-label", `${this.textContent.trim()} - ${player} - ${country}`);
  }
}

customElements.define("mi-card", MiCard);