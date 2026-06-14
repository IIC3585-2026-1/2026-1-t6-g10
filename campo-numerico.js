class CampoNumerico extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: "open" });

    shadow.innerHTML = `
      <style>
        .campo {
          display: flex;
          align-items: center;
          gap: 12px;
          font-family: var(--font-family, sans-serif);
          color: var(--ink, #10223d);
          font-weight: 500;
        }

        input {
          width: 64px;
          padding: 8px;
          text-align: center;
          border: 2px solid var(--line, #ccc);
          border-radius: 8px;
          font-size: 1rem;
          font-family: inherit;
          color: inherit;
          background: var(--paper-strong, #fff);
          transition: border-color 0.2s;
        }

        input:focus {
          outline: none;
          border-color: var(--fifa-blue, #0033a0);
        }

        button {
          width: 34px;
          height: 34px;
          cursor: pointer;
          border: none;
          border-radius: 8px;
          background: var(--fifa-blue, #0033a0);
          color: white;
          font-size: 1.2rem;
          font-weight: bold;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s, transform 0.1s;
        }

        button:hover {
          background: var(--fifa-red, #d71920);
        }

        button:active {
          transform: scale(0.95);
        }
      </style>

      <div class="campo">
        <label><slot>Número:</slot></label>
        <input type="number" min="0">
        <button id="menos">-</button>
        <button id="mas">+</button>
      </div>
    `;

    this.input = shadow.querySelector("input");
    this.botonMenos = shadow.querySelector("#menos");
    this.botonMas = shadow.querySelector("#mas");
  }

  connectedCallback() {
    this.input.value = this.getAttribute("value") || 0;

    this.botonMas.addEventListener("click", () => {
      this.input.value = Number(this.input.value) + 1;
    });

    this.botonMenos.addEventListener("click", () => {
      if (Number(this.input.value) > 0) {
        this.input.value = Number(this.input.value) - 1;
      }
    });
  }
}

customElements.define("campo-numerico", CampoNumerico);