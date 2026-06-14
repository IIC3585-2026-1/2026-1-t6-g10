class MiAccordion extends HTMLElement {
  connectedCallback() {
    this.style.display = "block";
    this.style.fontFamily = "Arial, sans-serif";
  }
}

class MiAccordionItem extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: "open" });

    shadow.innerHTML = `
      <style>
        :host {
          display: block;
          font-family: var(--font-family, sans-serif);
        }

        .item {
          border: 1px solid var(--line, #ccc);
          margin-bottom: 8px;
          border-radius: 12px;
          overflow: hidden;
          background: var(--paper-strong, #fff);
          transition: border-color 0.2s, box-shadow 0.2s;
        }

        .item:focus-within {
          border-color: var(--fifa-blue, #0033a0);
          box-shadow: 0 4px 12px rgba(0, 51, 160, 0.1);
        }

        .heading {
          background: transparent;
          padding: 14px 18px;
          cursor: pointer;
          font-weight: 600;
          color: var(--ink, #10223d);
          display: flex;
          justify-content: space-between;
          align-items: center;
          transition: background 0.2s;
        }

        .heading:hover {
          background: rgba(0, 51, 160, 0.04);
        }

        .icon {
          transition: transform 0.3s ease;
          color: var(--fifa-red, #d71920);
          font-size: 0.8rem;
        }

        .abierto .icon {
          transform: rotate(180deg);
        }

        .contenido {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows 0.3s ease;
          background: transparent;
        }

        .abierto + .contenido {
          grid-template-rows: 1fr;
        }

        .contenido-inner {
          overflow: hidden;
          padding: 0 18px;
          opacity: 0;
          transition: opacity 0.3s ease, padding 0.3s ease;
        }

        .abierto + .contenido .contenido-inner {
          opacity: 1;
          padding: 4px 18px 18px;
        }
      </style>

      <div class="item">
        <div class="heading" role="button" tabindex="0" aria-expanded="false">
          <slot name="heading">País</slot>
          <span class="icon">▼</span>
        </div>

        <div class="contenido">
          <div class="contenido-inner">
            <slot></slot>
          </div>
        </div>
      </div>
    `;

    this.heading = shadow.querySelector(".heading");
    this.contenido = shadow.querySelector(".contenido");
  }

  connectedCallback() {
    const toggle = () => {
      const isExpanded = this.heading.getAttribute("aria-expanded") === "true";
      this.heading.setAttribute("aria-expanded", !isExpanded);
      this.heading.classList.toggle("abierto");
    };

    this.heading.addEventListener("click", toggle);
    this.heading.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggle();
      }
    });
  }
}

customElements.define("mi-accordion", MiAccordion);
customElements.define("mi-accordion-item", MiAccordionItem);