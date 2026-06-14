class MiSwitch extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: "open" });

    shadow.innerHTML = `
      <style>
        .switch {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          font-family: var(--font-family, sans-serif);
          color: var(--ink, #10223d);
          cursor: pointer;
          user-select: none;
        }

        .track {
          position: relative;
          width: 48px;
          height: 26px;
          background: var(--line, #ccc);
          border-radius: 999px;
          transition: background 0.3s;
          display: flex;
          align-items: center;
          padding: 2px;
          box-sizing: border-box;
        }

        .thumb {
          width: 22px;
          height: 22px;
          background: white;
          border-radius: 50%;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
          transition: transform 0.3s cubic-bezier(0.4, 0.0, 0.2, 1);
        }

        .activo .track {
          background: var(--fifa-blue, #0033a0);
        }

        .activo .thumb {
          transform: translateX(22px);
        }

        .switch:focus-visible .track {
          outline: 2px solid var(--fifa-blue, #0033a0);
          outline-offset: 2px;
        }
      </style>

      <div class="switch" role="switch" aria-checked="false" tabindex="0">
        <div class="track"><div class="thumb"></div></div>
        <span><slot>Opción:</slot></span>
      </div>
    `;

    this.container = shadow.querySelector(".switch");
    this.activo = false;
  }

  connectedCallback() {
    const toggle = () => {
      this.activo = !this.activo;
      this.container.setAttribute("aria-checked", this.activo);
      if (this.activo) {
        this.container.classList.add("activo");
      } else {
        this.container.classList.remove("activo");
      }
    };

    this.container.addEventListener("click", toggle);
    this.container.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggle();
      }
    });
  }
}

customElements.define("mi-switch", MiSwitch);